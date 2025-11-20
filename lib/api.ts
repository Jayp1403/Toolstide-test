import type { Post } from "./types";
import { ddb, POSTS_TABLE_NAME } from "./dynamo";
import { ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const fallbackPosts: Post[] = [
  {
    slug: "welcome-to-tools-tide",
    title: "Welcome to ToolsTide",
    excerpt:
      "Your daily stream of AI tools, prompts, comparisons, and productivity workflows.",
    content:
      "<p>Your AWS backend is connected. Use the admin page to publish real posts into DynamoDB.</p>",
    date: "2025-11-20",
    category: "AI Tools",
  },
];

async function loadAllFromDynamo(): Promise<Post[] | null> {
  try {
    const res = await ddb.send(
      new ScanCommand({ TableName: POSTS_TABLE_NAME })
    );
    const items = (res.Items || []) as any[];
    if (!items.length) return [];
    const posts: Post[] = items.map((it) => ({
      slug: it.slug,
      title: it.title,
      excerpt: it.excerpt,
      content: it.content,
      date: it.date,
      category: it.category,
    }));
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (err) {
    console.error("Dynamo load error:", err);
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  const fromDb = await loadAllFromDynamo();
  if (fromDb === null) return fallbackPosts;
  if (!fromDb.length) return fallbackPosts;
  return fromDb;
}

export async function getPostsByCategory(
  category: string
): Promise<Post[]> {
  const posts = await getPosts();
  const normalized = category.toLowerCase();
  return posts.filter(
    (p) => p.category.toLowerCase() === normalized
  );
}

export async function getPostBySlug(
  slug: string
): Promise<Post | null> {
  try {
    const res = await ddb.send(
      new GetCommand({
        TableName: POSTS_TABLE_NAME,
        Key: { slug },
      })
    );
    return (res.Item as Post) || null;
  } catch (err) {
    console.error("Dynamo single post error:", err);
    const all = await getPosts();
    return all.find((p) => p.slug === slug) ?? null;
  }
}
