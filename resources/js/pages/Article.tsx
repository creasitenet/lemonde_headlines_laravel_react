import { FC } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { articleService } from '@/services/articleService'
import Loading from '@/components/Loading'

const Article: FC = () => {
  const { slug } = useParams<{ slug: string }>()

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articleService.getArticle(slug!),
    enabled: !!slug,
  })

  if (isLoading) return <Loading />
  if (isError) return <div>Une erreur est survenue lors du chargement de l'article.</div>
  if (!article) return null

  return (
    <article className="relative isolate">
      {/* Bouton retour */}
      <Link
        to="/"
        className="inline-flex items-center gap-x-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
      >
        <span className="h-5 w-5" aria-hidden="true">←</span>
        Retour aux articles
      </Link>

      {/* En-tête de l'article */}
      <div className="mt-6">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={article.published_at} className="text-gray-500 dark:text-gray-400">
            {new Date(article.published_at).toLocaleDateString()}
          </time>
          <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
            {article.category}
          </span>
        </div>
        <div className="group relative">
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {article.excerpt}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900 dark:text-white">
              <span className="absolute inset-0" />
              {article.author}
            </p>
          </div>
        </div>
      </div>

      {/* Image de l'article */}
      {article.image_url && (
        <figure className="mt-10">
          <img
            className="aspect-video w-full rounded-2xl bg-gray-50 dark:bg-gray-800 object-cover"
            src={article.image_url}
            alt={article.title}
          />
        </figure>
      )}

      {/* Contenu de l'article */}
      <div
        className="mt-10 prose prose-lg dark:prose-invert prose-primary max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  )
}

export default Article 