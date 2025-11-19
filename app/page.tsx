import PostCard from '../components/PostCard';
import { getPosts } from '../lib/api';

/**
 * The home page lists the most recent posts.  It fetches data from
 * a server-side API in the `lib/api.ts` module.  Because this
 * component is async, Next.js will server render the result during
 * static generation.
 */
export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}