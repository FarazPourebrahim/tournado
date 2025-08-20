import { ReactElement } from "react";
import { MockComment } from "@/mocks/mockComments";
import { mockUsers } from "@/mocks/mockUsers";
import styles from "./Comment.module.css";
import Image from "next/image";

export default function Comment({
  comment,
}: {
  comment: MockComment;
}): ReactElement {
  const user = mockUsers.find((u) => u.id === comment.userId);
  return (
    <div className={styles.comment}>
      <div className={styles["comment-header"]}>
        <Image src="/avatar.svg" alt="" width={50} height={50} />
        <span className={styles.user}>
          {user ? user.name : "کاربر ناشناس"}
        </span>{" "}
        میگه:
      </div>
      <div className={styles.content}>{comment.content}</div>
    </div>
  );
}
