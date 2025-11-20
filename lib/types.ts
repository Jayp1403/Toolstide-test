export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  date: string;    // "YYYY-MM-DD"
  category: string;
}
