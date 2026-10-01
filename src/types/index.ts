export interface LocationPoint {
  lat: number
  lng: number
  label: string
}

export interface StopLocation {
  id: string
  name: string
  location: LocationPoint
}

export interface RouteSuggestion {
  id: string
  routeNumber: string
  routeName: string
  boardingStop: StopLocation
  destinationStop: StopLocation
  walkDistanceKm: number
  frequencyMinutes: number
  travelTimeMinutes: number
  direction: string
  score: number
}

export interface SearchCriteria {
  query: string
  lat?: number
  lng?: number
}
