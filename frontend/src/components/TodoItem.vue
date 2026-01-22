<template>
  <li :class="['item', { done: todo.completed }]">
    <div class="row between">
      <label class="row">
        <!-- <input 
          type="checkbox" 
          :checked="todo.completed"
          @change="$emit('toggle')"
        /> -->
        <span class="id">#{{ todo.id }}</span>
      </label>

      <div class="row">
        <!-- <span class="badge">
          {{ todo.completed ? 'erledigt' : 'offen' }}
        </span> -->
        <button 
          class="btn danger" 
          type="button"
          @click="$emit('delete')"
        >
          Löschen
        </button>
      </div>
    </div>

    <input
      v-model="localTitle"
      class="input"
      readonly
      @input="dirty = true"
    />

    <textarea
      v-model="localDesc"
      class="textarea"
      rows="3"
      readonly
      @input="dirty = true"
    />

    <div class="row">
      <!-- <button 
        class="btn" 
        type="button"
        :disabled="!dirty"
        @click="save"
      >
        Speichern
      </button> -->
    </div>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  todo: Object
})

const emit = defineEmits(['toggle', 'delete', 'save'])

const localTitle = ref(props.todo.title || '')
const localDesc = ref(props.todo.description || '')
const dirty = ref(false)

watch(() => props.todo, (newTodo) => {
  localTitle.value = newTodo.title || ''
  localDesc.value = newTodo.description || ''
  dirty.value = false
}, { deep: true })

function save() {
  emit('save', {
    title: localTitle.value,
    description: localDesc.value
  })
  dirty.value = false
}
</script>