<template>
  <div class="app">
    <h1>Calendar</h1>

    <button @click="toggleLang" class="lang-toggle">
      {{ currentLang === 'ru' ? 'Switch to English' : 'Переключить на русский' }}
    </button>

    <Calendar v-model="picked" :locale="currentLang" @select="onPick" />

    <p>
      {{ currentLang === 'ru' ? 'Выбрано:' : 'Selected:' }} {{ picked }}
    </p>
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
    const currentLang = ref("ru")
    const onPick = (d) => console.log('select', d)
    const toggleLang = () => {
      currentLang.value = currentLang.value === "ru" ? "en" : "ru"
    }

    return { picked, currentLang, toggleLang, onPick }
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

.lang-toggle {
  position: absolute;
  top: 55px;
  right: 25px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.lang-toggle:hover {
  background: #e0e0e0;
  border-color: #aaa;
}

.lang-toggle:active {
  background: #d6d6d6;
  transform: scale(0.97);
}
</style>
