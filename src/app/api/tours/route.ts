import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { ApiResponseType } from "@/types/api-response"
import { parseBody, wrapWithTryCatch, extractUserId } from "@/utils/api"
import type { CreateTourDto, TourFiltersDto } from "@/dto/tour.dto"

export async function GET(request: NextRequest): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const { searchParams } = new URL(request.url)

        const filters: TourFiltersDto = {
            type: searchParams.get("type") || undefined,
            location: searchParams.get("location") || undefined,
            minPrice: searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined,
            maxPrice: searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined,
            minDuration: searchParams.get("minDuration") ? Number.parseInt(searchParams.get("minDuration")!) : undefined,
            maxDuration: searchParams.get("maxDuration") ? Number.parseInt(searchParams.get("maxDuration")!) : undefined,
            guideAvailable: searchParams.get("guideAvailable") ? searchParams.get("guideAvailable") === "true" : undefined,
            difficulty: searchParams.get("difficulty") || undefined,
            page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1,
            limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10,
            search: searchParams.get("search") || undefined,
        }

        const where: any = {}

        if (filters.type) where.type = filters.type
        if (filters.location) where.location = { contains: filters.location, mode: "insensitive" }
        if (filters.minPrice || filters.maxPrice) {
            where.price = {}
            if (filters.minPrice) where.price.gte = filters.minPrice
            if (filters.maxPrice) where.price.lte = filters.maxPrice
        }
        if (filters.minDuration || filters.maxDuration) {
            where.duration = {}
            if (filters.minDuration) where.duration.gte = filters.minDuration
            if (filters.maxDuration) where.duration.lte = filters.maxDuration
        }
        if (filters.guideAvailable !== undefined) where.guideAvailable = filters.guideAvailable
        if (filters.difficulty) where.difficulty = filters.difficulty
        if (filters.search) {
            where.OR = [
                { title: { contains: filters.search, mode: "insensitive" } },
                { description: { contains: filters.search, mode: "insensitive" } },
                { location: { contains: filters.search, mode: "insensitive" } },
            ]
        }

        const skip = (filters.page! - 1) * filters.limit!

        const [tours, totalCount] = await Promise.all([
            prisma.tour.findMany({
                where,
                skip,
                take: filters.limit,
                orderBy: { createdAt: "desc" },
                include: {
                    _count: {
                        select: { comments: true },
                    },
                },
            }),
            prisma.tour.count({ where }),
        ])

        const totalPages = Math.ceil(totalCount / filters.limit!)

        return NextResponse.json(
            {
                data: {
                    tours,
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

        const [parseError, body] = await parseBody<CreateTourDto>(request)

        if (parseError !== null) {
            return NextResponse.json({ error: parseError }, { status: 400 })
        }

        const tour = await prisma.tour.create({
            data: {
                ...body,
                userId,
            },
            include: {
                _count: {
                    select: { comments: true },
                },
            },
        })

        return NextResponse.json({ data: tour }, { status: 201 })
    })
}
