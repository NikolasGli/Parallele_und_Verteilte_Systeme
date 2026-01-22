<template>
  <div v-if="!todos.length" class="card">
    <b>Keine Todos gefunden.</b>
    <div class="muted">
      Füge oben ein neues Todo hinzu oder ändere Filter/Suche.
    </div>
  </div>
  <ul v-else class="list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', todo)"
      @delete="$emit('delete', todo)"
      @save="(updates) => $emit('save', todo, updates)"
    />
  </ul>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: Array
})

defineEmits(['toggle', 'delete', 'save'])
</script>