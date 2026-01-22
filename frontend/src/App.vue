<template>
  <main class="container">
    <Header :countOpen="countOpen" :countTotal="todos.length" />
    
    <ErrorBanner :message="error" @clear="error = ''" />
    
    <TodoForm @add="addTodo" />
    
    <FilterBar 
      v-model:filter="filter"
      v-model:query="query"
      v-model:sort="sort"
    />
    
    <LoadingState v-if="loading" />
    <TodoList 
      v-else
      :todos="filteredTodos"
      @toggle="toggleTodo"
      @delete="deleteTodo"
      @save="saveTodo"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { todosApi } from './api/todos'
import Header from './components/Header.vue'
import ErrorBanner from './components/ErrorBanner.vue'
import TodoForm from './components/TodoForm.vue'
import FilterBar from './components/FilterBar.vue'
import LoadingState from './components/LoadingState.vue'
import TodoList from './components/TodoList.vue'

const todos = ref([])
const loading = ref(true)
const error = ref('')
const filter = ref('all')
const query = ref('')
const sort = ref('new')

const countOpen = computed(() => 
  todos.value.filter(t => !t.completed).length
)

const filteredTodos = computed(() => {
  const q = query.value.trim().toLowerCase()
  let list = [...todos.value]

  if (q) {
    list = list.filter(t => {
      const title = (t.title || '').toLowerCase()
      const desc = (t.description || '').toLowerCase()
      return title.includes(q) || desc.includes(q)
    })
  }

  if (filter.value === 'open') {
    list = list.filter(t => !t.completed)
  } else if (filter.value === 'done') {
    list = list.filter(t => t.completed)
  }

  if (sort.value === 'new') {
    list.sort((a, b) => (b.id || 0) - (a.id || 0))
  } else if (sort.value === 'old') {
    list.sort((a, b) => (a.id || 0) - (b.id || 0))
  } else if (sort.value === 'title') {
    list.sort((a, b) => 
      String(a.title || '').localeCompare(String(b.title || ''))
    )
  }

  return list
})

async function loadTodos() {
  error.value = ''
  loading.value = true
  try {
    const data = await todosApi.list()
    todos.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
}

async function addTodo(todo) {
  error.value = ''
  try {
    await todosApi.create(todo)
    await loadTodos()
  } catch (e) {
    error.value = e?.message || String(e)
  }
}

async function toggleTodo(todo) {
  error.value = ''
  try {
    await todosApi.update(todo.id, {
      ...todo,
      completed: !todo.completed
    })
    await loadTodos()
  } catch (e) {
    error.value = e?.message || String(e)
  }
}

async function saveTodo(todo, updates) {
  error.value = ''
  try {
    await todosApi.update(todo.id, {
      ...todo,
      ...updates
    })
    await loadTodos()
  } catch (e) {
    error.value = e?.message || String(e)
  }
}

async function deleteTodo(todo) {
  error.value = ''
  try {
    await todosApi.remove(todo.id)
    await loadTodos()
  } catch (e) {
    error.value = e?.message || String(e)
  }
}

onMounted(() => {
  loadTodos()
})
</script>