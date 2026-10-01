<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import MapPanel from '~/components/map/MapPanel.vue'
import RouteList from '~/components/route/RouteList.vue'
import { useRouteSearch } from '~/composables/useRouteSearch'

const { searchTerm, results, isLoading, error, hasSearched, setSearchTerm, loadSuggestions } = useRouteSearch()

const handleSearch = async (value: string) => {
  setSearchTerm(value)
  await loadSuggestions(value)
}
</script>

<template>
  <div class="app-shell">
    <AppHeader />

    <main class="content-area">
      <MapPanel :query="searchTerm" :routes="results" @search="handleSearch" />
      <RouteList :routes="results" :loading="isLoading" :error="error" :has-searched="hasSearched" />
    </main>

    <AppFooter />
  </div>
</template>
