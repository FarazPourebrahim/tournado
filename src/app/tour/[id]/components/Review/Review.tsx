import React, { ReactElement } from "react";
import styles from "./Review.module.css";
import Comment from "@/app/tour/[id]/components/CommentCard/Comment";

import { mockComments } from "@/mocks/mockComments";

interface ReviewProps {
  tourId: number | undefined;
}

export default function Review({ tourId }: ReviewProps): ReactElement {
  const filteredComments = mockComments.filter(
    (comment) => comment.tourId === tourId,
  );

  return (
    <div className={styles.section}>
      {filteredComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
