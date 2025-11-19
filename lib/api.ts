import type { Post } from "./types";

/**
 * Temporary in-memory posts while we stabilise the project.
 * Later we will replace this with AWS or a real database.
 */
const posts: Post[] = [

/* All The posts go Between here  */

{
  "slug": "how-to-use-ai-to-automate-your-daily-life-in-2025-step-by-step-guide",
  "title": "How to Use AI to Automate Your Daily Life in 2025 (Step-by-Step Guide)",
  "excerpt": "How to Use AI to Automate Your Daily Tasks  AI automation in 2025 has reached a level where anyone—whether a business owner, student, creator, or freelancer—can easily automate rep...",
  "content": "<h2>How to Use AI to Automate Your Daily Tasks</h2> <div> <p>AI automation in 2025 has reached a level where anyone—whether a business owner, student, creator, or freelancer—can easily automate repetitive work. According to a McKinsey report, AI automation can save individuals up to 30% of their daily workload by eliminating manual tasks like organizing files, writing emails, analyzing data, and planning schedules. With tools now more accessible and user-friendly, AI is becoming an essential part of daily life.</p> <p>The first step is identifying tasks you repeat every day: sorting emails, tracking expenses, scheduling meetings, writing responses, and generating content. Tools like ChatGPT, Google Gemini, and Microsoft Copilot can now automate writing and decision-making tasks with incredible accuracy. Meanwhile, workflow automation platforms like Zapier, Make, and IFTTT allow you to create automated triggers—for example, saving every email attachment to Google Drive or converting new leads into organized spreadsheets.</p> <p>AI can also help streamline your personal life. Smart assistants can summarize your calendar, track your goals, generate shopping lists, or even remind you of important habits. When combined with voice assistants like Alexa or Google Assistant, you can manage your entire day hands-free. The key is to start small: automate two or three tasks, then build more workflows as AI becomes part of your routine.</p> </div>",
  "date": "2025-11-19",
  "category": "AI Tools"
}

/* All The posts go Between here  */

];

export async function getPosts(): Promise<Post[]> {
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostsByCategory(
  category: string
): Promise<Post[]> {
  const normalized = category.toLowerCase();
  return posts.filter(
    (p) => p.category.toLowerCase() === normalized
  );
}
