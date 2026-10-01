import { ref } from 'vue'
import { getRouteRecommendations } from '~/controllers/routeController'
import type { RouteSuggestion } from '~/types'
import { DEFAULT_SEARCH_TERM } from '~/utils/defaultLocation'

export function useRouteSearch() {
  const searchTerm = ref(DEFAULT_SEARCH_TERM)
  const results = ref<RouteSuggestion[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasSearched = ref(false)

  const setSearchTerm = (value: string) => {
    searchTerm.value = value
  }

  const loadSuggestions = async (value?: string) => {
    const target = (value ?? searchTerm.value).trim()

    if (!target) {
      results.value = []
      error.value = null
      hasSearched.value = false
      return
    }

    hasSearched.value = true
    isLoading.value = true
    error.value = null

    try {
      const data = await getRouteRecommendations({ query: target })
      results.value = data
    } catch (caughtError) {
      error.value = 'Unable to load route suggestions right now.'
      results.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    searchTerm,
    results,
    isLoading,
    error,
    hasSearched,
    setSearchTerm,
    loadSuggestions
  }
}
