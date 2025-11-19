import type { Post } from "./types";

/**
 * Temporary in-memory posts while we stabilise the project.
 * Later we will replace this with AWS or a real database.
 */
const posts: Post[] = [

  
    {
      "slug": "10-chrome-extensions-that-save-creators-1-hour-a-day",
      "title": "10 Chrome extensions that save creators 1 hour a day",
      "excerpt": "\n\n\n    Random Number HTML\n\n\n\n    The random number will appear here.\n    \n    \n        // Function to generate a random integer between 1 and 10 (inclusive)\n        function genera...",
      "content": "\n<html>\n<head>\n    <title>Random Number HTML</title>\n</head>\n<body>\n\n    <p id=\"randomNumberDisplay\">The random number will appear here.</p>\n    \n    <script>\n        // Function to generate a random integer between 1 and 10 (inclusive)\n        function generateRandomNumber() {\n            // Math.random() gives a float between 0 (incl) and 1 (excl)\n            // Multiplying by 10 gives 0 to <10\n            // Adding 1 shifts the range to 1 to <11\n            // Math.floor() rounds down to the nearest integer\n            const min = 1;\n            const max = 10;\n            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;\n            \n            // Set the inner HTML of the p tag to the generated number\n            document.getElementById(\"randomNumberDisplay\").innerHTML = randomNumber;\n        }\n\n        // Run the function when the page loads\n        window.onload = generateRandomNumber;\n    </script>\n\n</body>\n</html>\n",
      "date": "2025-11-18",
      "category": "Productivity"
    },
  
  {
    slug: "ai-tools-gemini-vs-chatgpt-daily-work",
    title: "Gemini vs ChatGPT: Which is better for daily work?",
    excerpt:
      "A practical breakdown of when each assistant feels best for real-world tasks like writing, research, and Android workflows.",
    content: `
      <p>Gemini and ChatGPT are the two assistants most people bounce between every day. Both are powerful, but they shine in slightly different places.</p>
      <h2>When ChatGPT feels better</h2>
      <p>Writing-heavy tasks, structured workflows, and creative ideation often feel smoother in ChatGPT.</p>
      <h2>When Gemini feels better</h2>
      <p>Gemini is strong when you live in the Google ecosystem or use Android as your main device.</p>
    `,
    date: "2025-11-16",
    category: "Comparisons",
  },
  {
    slug: "how-to-set-up-gemini-on-android",
    title: "How to set up Gemini on Android in 5 minutes",
    excerpt:
      "Turn Gemini from a demo into a real assistant by wiring it into your daily Android habits with a few quick settings.",
    content: `
      <p>Gemini is slowly becoming the default assistant on Android. With a few tweaks, it can actually save you time every day.</p>
    `,
    date: "2025-11-16",
    category: "How-To",
  },
  {
    slug: "fifteen-free-ai-tools-for-creators",
    title: "15 free AI tools every creator should bookmark",
    excerpt:
      "A curated list of writing, visual, and workflow helpers you can start using today without a subscription.",
    content: `
      <p>You don't need a huge budget to ship more. These free tools cover writing, visuals, and workflow support.</p>
    `,
    date: "2025-11-16",
    category: "AI Tools",
  },
  {
    slug: "twentyfive-prompts-to-speed-up-your-day",
    title: "25 prompts to speed up your day with AI",
    excerpt:
      "Practical prompt templates for writing, planning, and idea generation you can run in any major model.",
    content: `
      <p>These prompts are designed to drop straight into ChatGPT, Claude, Gemini, or your favourite model.</p>
    `,
    date: "2025-11-16",
    category: "Prompts",
  },
  {
    slug: "productivity-stack-for-creators",
    title: "A simple AI-powered productivity stack for creators",
    excerpt:
      "Keep your tooling lean and your publishing consistent with a small, focused setup supported by AI.",
    content: `
      <p>You don't need 20 tools to be productive. A small stack, supported by AI, is usually enough.</p>
    `,
    date: "2025-11-16",
    category: "Productivity",
  },
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
