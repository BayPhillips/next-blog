import client from '@/client';
import { postsQuery, postBySlugQuery } from '@/cms/lib/queries';
import { useQuery } from '@/cms/loader/useQuery';
import { loadPost } from '@/cms/loader/loadQuery';
import Post from '@/components/post';
import { PostPayload } from '@/types';

const PostPage = (props) => {
  const post = loadPost(props.params.slug);
  
  return <Post data={props} />
};

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery);

  console.log(`What are posts ${JSON.stringify(posts)}`);

  return posts.map((post) => ({
    slug: post.slug?.current
  }));
}

export default PostPage;