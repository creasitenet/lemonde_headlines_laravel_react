import { FC, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { articleService } from '@/services/articleService'
import type { ArticleFilters } from '@/types/article'
import Loading from '@/components/Loading'
import { useNavigate } from 'react-router-dom'
import useSearchStore from '@/stores/useSearchStore'

const Home: FC = () => {
  const navigate = useNavigate()
  const { searchTerm, setSearchTerm } = useSearchStore()

  const [filters, setFilters] = useState<ArticleFilters>({
    page: 1,
    search: searchTerm,
    date: '',
  })

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1,
    }))
  }, [searchTerm])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', filters],
    queryFn: () => articleService.getArticles(filters),
  })

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  if (isError) return <div>Une erreur est survenue lors du chargement des articles.</div>

  // Afficher le loading state
  if (isLoading) return (
    <div className="space-y-6 w-full">
       {/* Indicateur de recherche active si applicable pendant le loading */}
      {searchTerm && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg">
          <span>Recherche de "{searchTerm}"...</span>
          {/* Pas de bouton effacer pendant le loading, ou on le désactive */}
        </div>
      )}
      <div className="w-full p-6 flex justify-center items-center">
         <Loading />
      </div>
    </div>
  )

  // Si pas de données ou pas d'articles dans les données (recherche sans résultat)
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="space-y-6 w-full">
        {/* Indicateur de recherche active et bouton effacer */}
        {searchTerm && (
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg">
            <span>Aucun résultat trouvé pour "{searchTerm}"</span>
            <button
              onClick={handleClearSearch}
              className="ml-4 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Effacer la recherche
            </button>
          </div>
        )}
        {!searchTerm && (
           <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg">
             <span>Aucun article disponible.</span>
           </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full">
      {/* Indicateur de recherche active et bouton effacer */}
      {searchTerm && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg">
          <span>Résultats pour "{searchTerm}"</span>
          <button
            onClick={handleClearSearch}
            className="ml-4 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Effacer la recherche
          </button>
        </div>
      )}

      {/* Liste des articles */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {data.data.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.slug}`}
            className="block bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(article.published_at).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {data.meta.total > data.meta.per_page && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: data.meta.last_page }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setFilters(prev => ({ ...prev, page }))}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                page === filters.page
                  ? 'bg-primary-600 text-gray-400 border-gray-300 font-bold'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home