import type { Post } from "./types";
import { ddb, POSTS_TABLE_NAME } from "./dynamo";
import { ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

/** Fallback used if DynamoDB is not configured or is empty */
const fallbackPosts: Post[] = [
  {
    slug: "welcome-to-toolstide",
    title: "Welcome to ToolsTide",
    excerpt:
      "Your daily stream of AI tools, prompts, comparisons and productivity workflows.",
    content:
      "<p>Your AWS backend is connected. Use the admin page to publish real posts into DynamoDB.</p>",
    date: "2025-11-20",
    category: "AI Tools",
  },
  {
    "slug": "10-must-use-ai-tools-in-2025-that-dramatically-boost-productivity",
    "title": "10 Must-Use AI Tools in 2025 That Dramatically Boost Productivity",
    "excerpt": "The Most Powerful AI Tools You Should Be Using in 2025  The AI industry in 2025 is moving faster than ever, and individuals who adopt the right tools now gain a major advantage in ...",
    "content": "<h2>The Most Powerful AI Tools You Should Be Using in 2025</h2> <div> <p>The AI industry in 2025 is moving faster than ever, and individuals who adopt the right tools now gain a major advantage in productivity, creativity, and automation. Over 82% of businesses have already integrated at least one AI tool into their workflow, according to IDC. Whether you're a student, creator, entrepreneur, software developer, or small business owner, understanding which tools offer real value can help you work smarter—not harder.</p> <p>Below are ten of the most impactful AI tools available today, each offering unique benefits that streamline tasks, reduce workload, and enhance output quality. These tools cover writing, design, content creation, coding, marketing, automation, and more.</p> </div>\n<h2>1. ChatGPT 5.1 – Best Overall AI Assistant</h2> <div> <p>ChatGPT remains the leading AI tool for writing, research, coding, brainstorming, automation, customer support, and problem-solving. The 2025 version includes multimodal features, improved reasoning, and the ability to generate apps, videos, designs, and full workflows from a single prompt. It is a must-have for daily productivity.</p> </div>\n<h2>2. Claude 3.5 – Best for Long-Form Writing & Complex Reasoning</h2> <div> <p>Claude is widely praised for its human-like writing tone and deep comprehension capacity. It's ideal for drafting reports, analyzing documents, creating research papers, summarizing PDFs, and generating structured outputs with exceptional accuracy.</p> </div>\n<h2>3. Midjourney v6 – Best for Image Generation</h2> <div> <p>Midjourney continues to lead in artistic creativity and photorealistic AI image generation. Designers use it for logo concepts, 3D visuals, product modeling, ad creatives, backgrounds, and full branding kits. Version 6 offers sharper details and better text rendering.</p> </div>\n<h2>4. Runway Gen-3 – Best for AI Video Production</h2> <div> <p>Runway can produce cinematic videos using only text or image prompts. It’s used by filmmakers, YouTubers, advertisers, and game creators to generate scenes, animations, and transitions without any expensive equipment or large teams.</p> </div>\n<h2>5. Notion AI – Best for Organization & Knowledge Management</h2> <div> <p>Notion AI turns your workspace into a fully smart system—summarizing notes, creating tasks, writing documentation, analyzing data, and connecting information across pages. It's perfect for project management, planning, and team collaboration.</p> </div>\n<h2>6. GitHub Copilot – Best for Coding Assistance</h2> <div> <p>Copilot accelerates development by generating functions, debugging code, writing documentation, and predicting what developers need next. Many companies report 40–50% faster engineering output after adopting Copilot.</p> </div>\n<h2>7. Jasper AI – Best for Marketing & Advertising</h2> <div> <p>Jasper specializes in high-conversion marketing content. It generates ad copy, product descriptions, email campaigns, landing pages, social posts, and SEO-optimized blogs. It's widely used by agencies and e-commerce brands.</p> </div>\n<h2>8. Perplexity AI – Best for Real-Time Research</h2> <div> <p>Perplexity is a search-powered AI tool that delivers citations, real-time data, and sourced information, making it essential for researchers, journalists, and students who need highly accurate answers backed by references.</p> </div>\n<h2>9. Zapier AI – Best for Automation Workflows</h2> <div> <p>Zapier now includes native AI agents that automatically execute tasks across hundreds of apps—such as posting content, updating spreadsheets, organizing emails, and handling customer inquiries. You can build full workflows with zero coding.</p> </div>\n<h2>10. ElevenLabs – Best for AI Voice Generation</h2> <div> <p>ElevenLabs offers ultra-realistic voice synthesis and cloning. Creators use it for voiceovers, audiobooks, podcasts, explainer videos, and character voices in games. It supports dozens of languages with near-human quality.</p> </div>\n<h2>Final Thoughts: AI Tools Are the New Productivity Superpower</h2> <div> <p>The future belongs to individuals who know how to use AI effectively. Whether you're a professional or a beginner, adopting these tools can save you hundreds of hours, boost creativity, and significantly accelerate your workflow. The key is to explore, experiment, and integrate them into your daily routine—one tool at a time.</p> </div>",
    "date": "2025-11-20",
    "category": "AI Tools"
  }
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
