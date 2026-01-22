<template>
  <form class="card" @submit.prevent="submit">
    <input 
      v-model="title"
      class="input" 
      placeholder="Titel"
    />
    <textarea 
      v-model="description"
      class="textarea" 
      placeholder="Beschreibung (optional)" 
      rows="3"
    />
    <div class="row">
      <button class="btn primary" type="submit">
        Hinzufügen
      </button>
      <button class="btn" type="button" @click="reset">
        Reset
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const title = ref('')
const description = ref('')

function submit() {
  if (!title.value.trim()) return
  
  emit('add', {
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false
  })
  
  reset()
}

function reset() {
  title.value = ''
  description.value = ''
}
</script>