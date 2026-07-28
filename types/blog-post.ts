export interface BlogPost {
  id: string
  slug: string
  category: string
  title: string
  excerpt: string
  status: 'planned' | 'published'
  readingTime?: string
}
