import { loadPost } from '@/cms/loader/loadQuery';
import Post from '@/components/post';
import { generateStaticSlugs } from '@/cms/loader/generateStaticSlugs';

const PostPage = async (props: { params: { slug: string }}) => {
  const post = await loadPost(props.params.slug);

  return <Post data={post.data} />
};

export async function generateStaticParams() {
  const posts = generateStaticSlugs('post');

  return posts;
}

export default PostPage;