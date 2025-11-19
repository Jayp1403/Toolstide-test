import Link from "next/link";
import type { Post } from "../lib/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400">
          {post.category}
        </span>
        <span className="text-[11px] text-slate-500">{post.date}</span>
      </div>

      <h2 className="post-card-title text-lg font-semibold leading-snug">
        <Link href={`/posts/${post.slug}`} className="hover:text-sky-300">
          {post.title}
        </Link>
      </h2>

      <p className="text-sm text-slate-300/90 line-clamp-3">{post.excerpt}</p>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200"
        >
          Read article
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </article>
  );
}
