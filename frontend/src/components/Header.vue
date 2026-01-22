<template>
  <header class="header">
    <div>
      <h1>Todo-Liste (Vue.js)</h1>
      <div class="subtitle">
        Vue.js Frontend für Spring Boot Backend
      </div>
    </div>
    <div class="meta">
      Offen: <b>{{ countOpen }}</b> / Gesamt: <b>{{ countTotal }}</b>
    </div>
  </header>
</template>

<script setup>
defineProps({
  countOpen: Number,
  countTotal: Number
})
</script>