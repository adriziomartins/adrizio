export interface BlogPostSection {
  title: string
  paragraphs: string[]
}

export interface BlogPost {
  id: string
  slug: string
  category: string
  title: string
  excerpt: string
  status: 'planned' | 'published'
  readingTime?: string
  publishedAt?: string
  updatedAt?: string
  sections?: BlogPostSection[]
}
