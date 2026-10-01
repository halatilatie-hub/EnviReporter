<script setup lang="ts">
import type { RouteSuggestion } from '~/types'
import { DEFAULT_SEARCH_TERM, PRETORIA_DEFAULT_CENTER } from '~/utils/defaultLocation'
import '~/assets/MapPanel.css'

const props = defineProps<{
  query: string
  routes: RouteSuggestion[]
}>()

const emit = defineEmits<{
  (event: 'search', value: string): void
}>()

const mapContainer = ref<HTMLElement | null>(null)
const searchValue = ref(props.query)
const defaultCenter = PRETORIA_DEFAULT_CENTER
let leaflet: typeof import('leaflet') | null = null
let map: any = null
let markersLayer: any = null

watch(
  () => props.query,
  (value) => {
    searchValue.value = value
  }
)

const handleSearch = () => {
  const nextValue = searchValue.value.trim()
  if (!nextValue) {
    emit('search', DEFAULT_SEARCH_TERM)
    return
  }

  emit('search', nextValue)
}

const syncMarkers = () => {
  if (!map || !leaflet) {
    return
  }

  if (!markersLayer) {
    markersLayer = leaflet.layerGroup().addTo(map)
  }

  markersLayer.clearLayers()

  if (props.routes.length === 0) {
    leaflet.marker(defaultCenter)
      .bindPopup('No route suggestions yet.')
      .addTo(markersLayer)
    map.setView(defaultCenter, 11)
    return
  }

  const validStops = props.routes
    .map((route) => route.boardingStop.location)
    .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng))

  validStops.forEach((point) => {
    const matchingRoute = props.routes.find((route) => route.boardingStop.location === point)
    const routeNumber = matchingRoute?.routeNumber ?? 'Route'
    const routeName = matchingRoute?.routeName ?? 'Route stop'

    leaflet!.marker([point.lat, point.lng])
      .bindPopup(`<strong>${routeNumber}</strong><br>${routeName}`)
      .addTo(markersLayer)
  })

  if (validStops.length > 0) {
    const bounds = leaflet.latLngBounds(validStops.map((point) => [point.lat, point.lng] as [number, number]))
    if (bounds.isValid()) {
      map.fitBounds(bounds.pad(0.3))
    }
  }
}

onMounted(async () => {
  leaflet = await import('leaflet')

  if (!mapContainer.value) {
    return
  }

  map = leaflet.map(mapContainer.value, {
    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: true
  }).setView(defaultCenter, 11)

  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  syncMarkers()
})

watch(
  () => props.routes,
  () => {
    syncMarkers()
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
  markersLayer = null
  leaflet = null
})
</script>

<template>
  <section class="map-panel">
    <div class="map-header">
      <h2>Map overview</h2>
      <span>{{ query || 'Pretoria' }}</span>
    </div>

    <div class="map-surface-wrap">
      <div ref="mapContainer" class="map-surface" aria-label="Map overview" />

      <div class="map-search-overlay">
        <label class="sr-only" for="map-search">Search destination</label>
        <input
          id="map-search"
          v-model="searchValue"
          type="text"
          placeholder="Search destination or area"
          @keyup.enter="handleSearch"
        />
        <button type="button" @click="handleSearch">Search</button>
      </div>
    </div>
  </section>
</template>
