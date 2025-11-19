export interface Post {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

export interface Category {
  id?: number;
  slug: string;
  name: string;
}