"use client"

import { useState } from "react"
import type { Comment } from "@/types/tour.type"

interface UseComments {
    comments: Comment[]
    loading: boolean
    error: string | null
    totalPages: number
    currentPage: number
    fetchComments: (tourId: string, page?: number) => Promise<void>
    addComment: (tourId: string, content: string) => Promise<void>
}

export function useComments(): UseComments {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchComments = async (tourId: string, page = 1) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/tours/${tourId}/comments?page=${page}&limit=10`)

            if (!response.ok) {
                throw new Error("خطا در دریافت نظرات")
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            setComments(data.data.comments)
            setTotalPages(data.data.pagination.totalPages)
            setCurrentPage(data.data.pagination.page)
        } catch (err) {
            setError(err instanceof Error ? err.message : "خطای غیرمنتظره")
        } finally {
            setLoading(false)
        }
    }

    const addComment = async (tourId: string, content: string) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/tours/${tourId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            })

            if (!response.ok) {
                throw new Error("خطا در ارسال نظر")
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            // Refresh comments after adding
            await fetchComments(tourId, currentPage)
        } catch (err) {
            setError(err instanceof Error ? err.message : "خطای غیرمنتظره")
        } finally {
            setLoading(false)
        }
    }

    return {
        comments,
        loading,
        error,
        totalPages,
        currentPage,
        fetchComments,
        addComment,
    }
}
