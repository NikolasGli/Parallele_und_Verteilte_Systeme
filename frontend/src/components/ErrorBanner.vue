<template>
  <div v-if="message" class="error">
    <div>{{ message }}</div>
    <button class="btn" type="button" @click="$emit('clear')">
      OK
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: String
})

defineEmits(['clear'])
</script>