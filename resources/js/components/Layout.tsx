import { FC, ReactNode, useState, FormEvent } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import useSearchStore from '@/stores/useSearchStore'
// import useThemeStore from '@/stores/useThemeStore' // Commenter ou supprimer l'import

interface LayoutProps {
  children: ReactNode
}

interface NavigationItem {
  name: string
  href: string
}

const navigation: NavigationItem[] = [
  { name: 'Accueil', href: '/' },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

const Layout: FC<LayoutProps> = ({ children }) => {
  // const { darkMode, toggleDarkMode } = useThemeStore() // Commenter ou supprimer l'utilisation
  const { setSearchTerm } = useSearchStore()
  const [localSearchTerm, setLocalSearchTerm] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    setSearchTerm(localSearchTerm)
    // setLocalSearchTerm('') // Optionnel: effacer l'input après recherche
  }

  return (
    <div className="min-h-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 min-h-[calc(100vh-8rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))]">
        <nav className="mb-6">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="text-3xl text-extralight text-gray-900 dark:text-white">
                Le Monde Articles
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    false // Désactiver le style actif pour l'instant
                      ? 'border-primary-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                  )}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Barre de recherche intégrée dans la navigation */}
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    placeholder="Rechercher..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Rechercher
                </button>
              </form>
            </div>
            
            {/* Menu mobile */}
            {/* {isMobileMenuOpen && ( // Commenter le menu mobile */}
            <div className="sm:hidden mt-2 space-y-1 pb-3 pt-2 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  //onClick={() => setIsMobileMenuOpen(false)} // Commenter l'appel si le menu mobile est commenté
                  className={classNames(
                    false // Désactiver le style actif pour l'instant
                      ? 'bg-primary-50 dark:bg-gray-700 border-primary-500 text-primary-700 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
            {/* )} */}
          </div>
        </nav>

        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout