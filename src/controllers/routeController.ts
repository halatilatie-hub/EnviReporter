import { fetchRouteSuggestions } from '~/services/routeService'
import type { SearchCriteria, RouteSuggestion } from '~/types'

export async function getRouteRecommendations(
  criteria: SearchCriteria
): Promise<RouteSuggestion[]> {
  const query = criteria.query.trim()

  if (!query) {
    return []
  }

  return fetchRouteSuggestions(query)
}
