import PostCard from '../../components/PostCard';
import { getPostsByCategory } from '../../lib/api';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

/**
 * CategoryPage lists all posts that belong to a given category.  The
 * category slug is available via the `params.category` property.  The
 * data fetching is done on the server at build time, similar to
 * getStaticProps in pages router.  If you add dynamic content to
 * categories, you may want to switch to revalidation or on-demand ISR.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getPostsByCategory(params.category);
  return (
    <div className="wrapper py-8">
      <h1 className="text-3xl font-bold capitalize mb-6">{params.category.replace(/-/g, ' ')}</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found for this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}