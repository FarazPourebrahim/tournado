import type { ReactElement } from "react"
import styles from "./Comment.module.css"
import Image from "next/image"

interface CommentProps {
    comment: {
        id: string
        content: string
        createdAt: string
        user: {
            name: string
            username: string
        }
    }
}

export default function Comment({ comment }: CommentProps): ReactElement {
    return (
        <div className={styles.comment}>
            <div className={styles["comment-header"]}>
                <Image src="/avatar.svg" alt="" width={50} height={50} />
                <span className={styles.user}>{comment.user.name}</span> میگه:
            </div>
            <div className={styles.content}>{comment.content}</div>
        </div>
    )
}
