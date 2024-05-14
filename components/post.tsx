import { PostPayload } from "@/types";
import { CustomPortableText } from "./shared/CustomPortableText";

export default function PostComponent(props: { data: PostPayload | null }) {
  const post = props.data;
  return (
    <article>
      <h1>{post?.title}</h1>
      {post?.body && (
        <CustomPortableText
          paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
          value={post.body}
        />
      )}
    </article>
  );
};
