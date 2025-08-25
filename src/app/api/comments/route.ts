import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { ApiResponseType } from "@/types/api-response"
import { parseBody, wrapWithTryCatch, extractUserId } from "@/utils/api"
import type { CreateCommentDto, CommentFiltersDto } from "@/dto/comment.dto"

export async function GET(request: NextRequest): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const { searchParams } = new URL(request.url)

        const filters: CommentFiltersDto = {
            tourId: searchParams.get("tourId") || undefined,
            userId: searchParams.get("userId") || undefined,
            page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1,
            limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10,
        }

        const where: any = {}

        if (filters.tourId) where.tourId = filters.tourId
        if (filters.userId) where.userId = filters.userId

        const skip = (filters.page! - 1) * filters.limit!

        const [comments, totalCount] = await Promise.all([
            prisma.comment.findMany({
                where,
                skip,
                take: filters.limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            name: true,
                            username: true,
                        },
                    },
                    tour: {
                        select: {
                            title: true,
                            location: true,
                        },
                    },
                },
            }),
            prisma.comment.count({ where }),
        ])

        const totalPages = Math.ceil(totalCount / filters.limit!)

        return NextResponse.json(
            {
                data: {
                    comments,
                    pagination: {
                        page: filters.page,
                        limit: filters.limit,
                        totalCount,
                        totalPages,
                        hasNext: filters.page! < totalPages,
                        hasPrev: filters.page! > 1,
                    },
                },
            },
            { status: 200 },
        )
    })
}

export async function POST(request: NextRequest): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const [parseError, body] = await parseBody<CreateCommentDto>(request)

        if (parseError !== null) {
            return NextResponse.json({ error: parseError }, { status: 400 })
        }

        // Check if tour exists
        const tour = await prisma.tour.findUnique({
            where: { id: body.tourId },
        })

        if (!tour) {
            return NextResponse.json({ error: "تور مورد نظر پیدا نشد." }, { status: 404 })
        }

        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                tourId: body.tourId,
                userId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
                tour: {
                    select: {
                        title: true,
                        location: true,
                    },
                },
            },
        })

        return NextResponse.json({ data: comment }, { status: 201 })
    })
}
