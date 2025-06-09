import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  darkMode: boolean
  toggleDarkMode: () => void
}

// Fonction pour appliquer le thème au DOM
const applyTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const useThemeStore = create<ThemeState>()(  
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode
        applyTheme(newDarkMode)
        return { darkMode: newDarkMode }
      }),
    }),
    {
      name: 'theme-storage', // nom pour le localStorage
      onRehydrateStorage: (state) => {
        // Appliquer le thème dès que le state est récupéré du localStorage
        return (rehydratedState) => {
          if (rehydratedState) {
            applyTheme(rehydratedState.darkMode)
          }
        }
      }
    }
  )
)

export default useThemeStore