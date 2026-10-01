import type { RouteSuggestion } from '~/types'
import { useRuntimeConfig } from '#app'

const normalizeRouteSuggestion = (candidate: Partial<RouteSuggestion> | null | undefined): RouteSuggestion | null => {
  if (!candidate || typeof candidate !== 'object') {
    return null
  }

  const boardingStop = candidate.boardingStop ?? candidate.boarding_stop
  const destinationStop = candidate.destinationStop ?? candidate.destination_stop

  if (!candidate.id || !candidate.routeNumber || !candidate.routeName) {
    return null
  }

  return {
    id: String(candidate.id),
    routeNumber: String(candidate.routeNumber),
    routeName: String(candidate.routeName),
    boardingStop: {
      id: String(boardingStop?.id ?? `${candidate.id}-boarding`),
      name: String(boardingStop?.name ?? 'Boarding stop'),
      location: {
        lat: Number(boardingStop?.location?.lat ?? 0),
        lng: Number(boardingStop?.location?.lng ?? 0),
        label: String(boardingStop?.location?.label ?? 'Boarding stop')
      }
    },
    destinationStop: {
      id: String(destinationStop?.id ?? `${candidate.id}-destination`),
      name: String(destinationStop?.name ?? 'Destination stop'),
      location: {
        lat: Number(destinationStop?.location?.lat ?? 0),
        lng: Number(destinationStop?.location?.lng ?? 0),
        label: String(destinationStop?.location?.label ?? 'Destination stop')
      }
    },
    walkDistanceKm: Number(candidate.walkDistanceKm ?? 0),
    frequencyMinutes: Number(candidate.frequencyMinutes ?? 0),
    travelTimeMinutes: Number(candidate.travelTimeMinutes ?? 0),
    direction: String(candidate.direction ?? 'Unknown'),
    score: Number(candidate.score ?? 0)
  }
}

export async function fetchRouteSuggestions(query: string): Promise<RouteSuggestion[]> {
  const target = query.trim()

  if (!target) {
    return []
  }

  const runtimeConfig = useRuntimeConfig()
  const baseUrl = String(runtimeConfig.public.routeApiBaseUrl ?? '').trim().replace(/\/+$/, '')

  if (!baseUrl) {
    return []
  }

  try {
    const payload = await $fetch<unknown>(`${baseUrl}/routes/search`, {
      method: 'GET',
      query: {
        q: target,
        city: 'Pretoria'
      },
      retry: 1
    })

    const items = Array.isArray(payload)
      ? payload
      : Array.isArray((payload as { routes?: unknown[] })?.routes)
        ? (payload as { routes: unknown[] }).routes
        : []

    return items
      .map((item) => normalizeRouteSuggestion(item as Partial<RouteSuggestion>))
      .filter((route): route is RouteSuggestion => Boolean(route))
  } catch (error) {
    console.error('Unable to load live route suggestions.', error)
    return []
  }
}
