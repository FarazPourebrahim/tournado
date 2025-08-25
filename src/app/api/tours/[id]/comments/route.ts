import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { ApiResponseType } from "@/types/api-response"
import { parseBody, wrapWithTryCatch, extractUserId } from "@/utils/api"

interface RouteParams {
    params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const { searchParams } = new URL(request.url)
        const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
        const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10

        // Check if tour exists
        const tour = await prisma.tour.findUnique({
            where: { id: params.id },
        })

        if (!tour) {
            return NextResponse.json({ error: "تور مورد نظر پیدا نشد." }, { status: 404 })
        }

        const skip = (page - 1) * limit

        const [comments, totalCount] = await Promise.all([
            prisma.comment.findMany({
                where: { tourId: params.id },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            name: true,
                            username: true,
                        },
                    },
                },
            }),
            prisma.comment.count({ where: { tourId: params.id } }),
        ])

        const totalPages = Math.ceil(totalCount / limit)

        return NextResponse.json(
            {
                data: {
                    comments,
                    pagination: {
                        page,
                        limit,
                        totalCount,
                        totalPages,
                        hasNext: page < totalPages,
                        hasPrev: page > 1,
                    },
                },
            },
            { status: 200 },
        )
    })
}

export async function POST(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const [parseError, body] = await parseBody<{ content: string }>(request)

        if (parseError !== null) {
            return NextResponse.json({ error: parseError }, { status: 400 })
        }

        // Check if tour exists
        const tour = await prisma.tour.findUnique({
            where: { id: params.id },
        })

        if (!tour) {
            return NextResponse.json({ error: "تور مورد نظر پیدا نشد." }, { status: 404 })
        }

        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                tourId: params.id,
                userId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        username: true,
                    },
                },
            },
        })

        return NextResponse.json({ data: comment }, { status: 201 })
    })
}
