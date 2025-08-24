<template>
  <div class="app">
    <h1>Calendar</h1>
    <Calendar v-model="picked" locale="ru" @select="onPick" />
    <p>Выбрано: {{ picked }}</p>
  </div>
</template>


<script>
import Calendar from './components/Calendar.vue'
import { ref } from "vue";
export default {
  name: 'App',
  components: { Calendar },
  setup() {
    const picked = ref(null)
    const onPick = (d) => console.log('select', d)
    return { picked, onPick }
  },
}
</script>


<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

.app {
  padding: 25px;
}
</style>
