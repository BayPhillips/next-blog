'use client';
import { PostPayload } from "@/types";

export default (props: { data: PostPayload }) => {
  console.log(`What is props ${JSON.stringify(props)}`);
  return (
    <article>
      Blog post: {props.slug}
    </article>
  );
};
