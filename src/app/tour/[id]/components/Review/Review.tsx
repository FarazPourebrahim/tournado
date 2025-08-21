"use client"

import type React from "react"

import { type ReactElement, useEffect, useState } from "react"
import styles from "./Review.module.css"
import Comment from "@/app/tour/[id]/components/CommentCard/Comment"
import { Button } from "@/components/Button/Button"
import { fetchWithToast } from "@/utils/fetch"

interface ReviewProps {
  tourId: number | undefined
}

export default function Review({ tourId }: ReviewProps): ReactElement {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      if (!tourId) return

      try {
        const result = await fetchWithToast(`/api/tours/${tourId}/comments`)

        if (result.data) {
          // @ts-ignore
          setComments(result.data?.comments || [])
        }
      } catch (error) {
        // Error is already handled by fetchWithToast
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [tourId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !tourId || submitting) return

    setSubmitting(true)

    try {
      const result = await fetchWithToast(
          `/api/tours/${tourId}/comments`,
          {
            method: "POST",
            body: JSON.stringify({ content: newComment.trim() }),
          },
          "نظر شما با موفقیت ثبت شد", // Success message in Persian
      )

      if (result.data) {
        // Clear the form
        setNewComment("")

        // Refresh comments
        const refreshResult = await fetchWithToast(`/api/tours/${tourId}/comments`)
        if (refreshResult.data) {
          // @ts-ignore
          setComments(refreshResult.data?.comments || [])
        }
      }
    } catch (error) {
      // Error is already handled by fetchWithToast
      console.error("Error submitting comment:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className={styles.section}>در حال بارگذاری نظرات...</div>
  }

  return (
      <div className={styles.section}>
        <form onSubmit={handleSubmitComment} className={styles["comment-form"]}>
          <h4 className={styles["form-title"]}>نظر خود را بنویسید</h4>
          <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="نظر خود را در مورد این تور بنویسید..."
              className={styles.textarea}
              rows={4}
              disabled={submitting}
          />
          <Button
              type="submit"
              variant="primary"
              disabled={!newComment.trim() || submitting}
              className={styles["submit-button"]}
          >
            {submitting ? "در حال ارسال..." : "ارسال نظر"}
          </Button>
        </form>

        <div className={styles.separator}></div>

        <div className={styles["comments-list"]}>
          {comments.length > 0 ? (
              comments.map((comment) => <Comment key={comment.id} comment={comment} />)
          ) : (
              <div className={styles["no-comments"]}>هنوز نظری ثبت نشده است.</div>
          )}
        </div>
      </div>
  )
}
