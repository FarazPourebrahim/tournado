import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { ApiResponseType } from "@/types/api-response"
import { wrapWithTryCatch, extractUserId } from "@/utils/api"

export async function GET(request: NextRequest): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
        const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10
        const search = searchParams.get("search") || undefined

        const where: any = { userId }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { location: { contains: search, mode: "insensitive" } },
            ]
        }

        const skip = (page - 1) * limit

        const [tours, totalCount] = await Promise.all([
            prisma.tour.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    _count: {
                        select: { comments: true },
                    },
                },
            }),
            prisma.tour.count({ where }),
        ])

        const totalPages = Math.ceil(totalCount / limit)

        return NextResponse.json(
            {
                data: {
                    tours,
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
