import { notFound } from 'next/navigation';
import { getPostBySlug } from '../../../lib/api';

interface PostPageProps {
  params: {
    slug: string;
  };
}

/**
 * PostPage renders the full content of a single post.  It uses
 * `dangerouslySetInnerHTML` to inject pre-rendered HTML content.
 * In a production site you would likely use a markdown renderer
 * instead.  If no post is found for the slug, the built-in
 * `notFound()` helper triggers a 404 page.
 */
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  return (
    <article className="wrapper py-8">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {post.date} · {post.category}
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}