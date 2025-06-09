import axios from 'axios'
import { Article, ArticleResponse, ArticleFilters } from '@/types/article'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export const articleService = {
  async getArticles(filters: ArticleFilters = {}): Promise<ArticleResponse> {
    const { data } = await api.get<ArticleResponse>('/articles', { params: filters })
    return data
  },

  async getArticle(slug: string): Promise<Article> {
    const { data } = await api.get<Article>(`/articles/${slug}`)
    return data
  }
} 