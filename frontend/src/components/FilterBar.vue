<template>
  <div class="bar">
    <input
      :value="query"
      @input="$emit('update:query', $event.target.value)"
      class="input"
      placeholder="Suchen…"
    />

    <select 
      :value="filter"
      @change="$emit('update:filter', $event.target.value)"
      class="select"
    >
      <option value="all">Alle</option>
      <option value="open">Offen</option>
      <option value="done">Erledigt</option>
    </select>

    <select 
      :value="sort"
      @change="$emit('update:sort', $event.target.value)"
      class="select"
    >
      <option value="new">Neueste</option>
      <option value="old">Älteste</option>
      <option value="title">Titel A–Z</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  filter: String,
  query: String,
  sort: String
})

defineEmits(['update:filter', 'update:query', 'update:sort'])
</script>