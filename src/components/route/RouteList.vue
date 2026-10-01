<script setup lang="ts">
import type { RouteSuggestion } from '~/types'
import '~/assets/RouteList.css'

const props = defineProps<{
  routes: RouteSuggestion[]
  loading: boolean
  error: string | null
  hasSearched: boolean
}>()
</script>

<template>
  <section class="results-panel">
    <div class="panel-header">
      <h2>Suggested routes</h2>
    </div>

    <div v-if="!props.hasSearched" class="state-message">Search for a destination to view suggested routes.</div>
    <div v-else-if="props.loading" class="state-message">Loading suggestions...</div>
    <div v-else-if="props.error" class="state-message error-message">{{ props.error }}</div>
    <div v-else-if="!props.routes.length" class="state-message">No live route data is available yet. Configure a route API to return suggestions.</div>

    <div v-else class="route-cards">
      <article v-for="route in props.routes" :key="route.id" class="route-card">
        <div class="route-topline">
          <div>
            <p class="route-number">{{ route.routeNumber }}</p>
            <h3>{{ route.routeName }}</h3>
          </div>
          <span class="route-score">{{ route.score.toFixed(1) }}</span>
        </div>

        <ul class="route-details">
          <li>Boarding: {{ route.boardingStop.name }}</li>
          <li>Destination: {{ route.destinationStop.name }}</li>
          <li>Walk: {{ route.walkDistanceKm.toFixed(1) }} km</li>
          <li>Frequency: every {{ route.frequencyMinutes }} mins</li>
          <li>Travel time: {{ route.travelTimeMinutes }} mins</li>
        </ul>
      </article>
    </div>
  </section>
</template>
