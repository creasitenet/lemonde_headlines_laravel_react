export interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  published_at: string
  image_url: string | null
  author: string
  category: string
}

export interface ArticleResponse {
  data: Article[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface ArticleFilters {
  page?: number
  search?: string
  date?: string
} 