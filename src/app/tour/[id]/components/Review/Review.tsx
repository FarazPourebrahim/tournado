"use client"

import { type ReactElement, useEffect, useState } from "react"
import styles from "./Review.module.css"
import Comment from "@/app/tour/[id]/components/CommentCard/Comment"

interface ReviewProps {
  tourId: number | undefined
}

export default function Review({ tourId }: ReviewProps): ReactElement {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      if (!tourId) return

      try {
        console.log("[v0] Fetching comments for tour:", tourId)
        const response = await fetch(`/api/tours/${tourId}/comments`)
        console.log("[v0] Comments API response status:", response.status)

        if (response.ok) {
          const result = await response.json()
          console.log("[v0] Comments API response data:", result)
          // API returns { data: { comments: [...] } }
          setComments(result.data?.comments || [])
        }
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [tourId])

  if (loading) {
    return <div className={styles.section}>در حال بارگذاری نظرات...</div>
  }

  return (
      <div className={styles.section}>
        {comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
        ) : (
            <div>هنوز نظری ثبت نشده است.</div>
        )}
      </div>
  )
}
