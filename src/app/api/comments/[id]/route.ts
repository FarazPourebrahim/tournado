import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { ApiResponseType } from "@/types/api-response"
import { parseBody, wrapWithTryCatch, extractUserId } from "@/utils/api"
import type { UpdateCommentDto } from "@/dto/comment.dto"

interface RouteParams {
    params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const comment = await prisma.comment.findUnique({
            where: { id: params.id },
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

        if (!comment) {
            return NextResponse.json({ error: "نظر مورد نظر پیدا نشد." }, { status: 404 })
        }

        return NextResponse.json({ data: comment }, { status: 200 })
    })
}

export async function PATCH(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<any>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const [parseError, body] = await parseBody<UpdateCommentDto>(request)

        if (parseError !== null) {
            return NextResponse.json({ error: parseError }, { status: 400 })
        }

        const existingComment = await prisma.comment.findUnique({
            where: { id: params.id },
        })

        if (!existingComment) {
            return NextResponse.json({ error: "نظر مورد نظر پیدا نشد." }, { status: 404 })
        }

        // Check if user owns the comment
        if (existingComment.userId !== userId) {
            return NextResponse.json({ error: "شما مجاز به ویرایش این نظر نیستید." }, { status: 403 })
        }

        const updatedComment = await prisma.comment.update({
            where: { id: params.id },
            data: { content: body.content },
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

        return NextResponse.json({ data: updatedComment }, { status: 200 })
    })
}

export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<ApiResponseType<null>> {
    return wrapWithTryCatch(async () => {
        const userId = await extractUserId(request)
        if (!userId) {
            return NextResponse.json({ error: "ابتدا وارد حساب کاربری خود شوید." }, { status: 401 })
        }

        const existingComment = await prisma.comment.findUnique({
            where: { id: params.id },
        })

        if (!existingComment) {
            return NextResponse.json({ error: "نظر مورد نظر پیدا نشد." }, { status: 404 })
        }

        // Check if user owns the comment
        if (existingComment.userId !== userId) {
            return NextResponse.json({ error: "شما مجاز به حذف این نظر نیستید." }, { status: 403 })
        }

        await prisma.comment.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ data: null }, { status: 200 })
    })
}
