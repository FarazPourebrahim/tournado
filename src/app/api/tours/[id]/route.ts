import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { ApiResponseType } from "@/types/api-response"
import { parseBody, wrapWithTryCatch, extractUserId } from "@/utils/api"
import type { UpdateTourDto } from "@/dto/tour.dto"

interface RouteParams {
    params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const tour = await prisma.tour.findUnique({
            where: { id: params.id },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                username: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
                _count: {
                    select: { comments: true },
                },
            },
        })

        if (!tour) {
            return NextResponse.json({ error: "تور مورد نظر پیدا نشد." }, { status: 404 })
        }

        return NextResponse.json({ data: tour }, { status: 200 })
    })
}

export async function PATCH(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const [parseError, body] = await parseBody<UpdateTourDto>(request)

        if (parseError !== null) {
            return NextResponse.json({ error: parseError }, { status: 400 })
        }

        const existingTour = await prisma.tour.findUnique({
            where: { id: params.id },
        })

        if (!existingTour) {
            return NextResponse.json({ error: "تور مورد نظر پیدا نشد." }, { status: 404 })
        }

        if (existingTour.userId !== userId) {
            return NextResponse.json({ error: "شما مجاز به ویرایش این تور نیستید." }, { status: 403 })
        }

        const updatedTour = await prisma.tour.update({
            where: { id: params.id },
            data: body,
            include: {
                _count: {
                    select: { comments: true },
                },
            },
        })

        return NextResponse.json({ data: updatedTour }, { status: 200 })
    })
}

export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<null>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const existingTour = await prisma.tour.findUnique({
            where: { id: params.id },
        })

        if (!existingTour) {
            return NextResponse.json({ error: "تور مورد نظر پیدا نشد." }, { status: 404 })
        }

        if (existingTour.userId !== userId) {
            return NextResponse.json({ error: "شما مجاز به حذف این تور نیستید." }, { status: 403 })
        }

        await prisma.tour.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ data: null }, { status: 200 })
    })
}
