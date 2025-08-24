<template>
  <div class="vc">
    <div class="vc__header">
      <button class="vc__nav" type="button" @click="$emit('prev')">‹</button>
      <div class="vc__title">Месяц Год</div>
      <button class="vc__nav" type="button" @click="$emit('next')">›</button>
    </div>


    <div class="vc__weekdays">
      <div v-for="n in 7" :key="n" class="vc__weekday">Дн{{ n }}</div>
    </div>


    <div class="vc__grid">
      <button v-for="n in 42" :key="n" class="vc__cell" type="button">{{ n }}</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'AppCalendar',
}
</script>


<style scoped>
.vc {
  width: 280px;
  user-select: none;
}
.vc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.vc__title {
  font-weight: 600;
}
.vc__nav {
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  cursor: pointer;
}
.vc__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}
.vc__weekday {
  text-align: center;
  padding: 4px 0;
}
.vc__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.vc__cell {
  height: 36px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  line-height: 34px;
}
.vc__cell:hover {
  border-color: #bbb;
}
</style>
