<script setup lang="ts">
import '~/assets/SearchBar.css'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'search', value: string): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const onSearch = () => {
  emit('search', localValue.value.trim())
}
</script>

<template>
  <div class="search-panel">
    <label class="search-label" for="destination">Destination</label>
    <div class="search-row">
      <input
        id="destination"
        v-model="localValue"
        type="text"
        placeholder="Search destination or area"
        @keyup.enter="onSearch"
      />
      <button type="button" @click="onSearch">Search</button>
    </div>
  </div>
</template>
