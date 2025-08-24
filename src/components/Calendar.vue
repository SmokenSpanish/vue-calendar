<template>
  <div class="vc">
    <div class="vc__header">
      <button class="vc__nav" type="button" @click="prevMonth">‹</button>
      <div class="vc__title">{{ monthLabel }} {{ viewYear }}</div>
      <button class="vc__nav" type="button" @click="nextMonth">›</button>
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
const LOCALES = {
  ru: { months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'] },
  en: { months: ['January','February','March','April','May','June','July','August','September','October','November','December'] }
}
export default {
  name: 'AppCalendar',
  props: {
    value: {
      type: String,
      default: null
    },
    locale: {
      type: String,
      default: 'ru'
    }
  },
  data() {
    const base = this.parseISO(this.value) || new Date()
    return {
      viewYear: base.getFullYear(),
      viewMonth: base.getMonth()
    }
  },
  computed: {
    monthLabel() {
      return (LOCALES[this.locale] || LOCALES.ru).months[this.viewMonth]
    },
  },
  methods: {
    parseISO(str) {
      if (!str) return null
      const m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if (!m) return null
      const d = new Date(+m[1], +m[2] - 1, +m[3])
      if (d.getMonth() !== +m[2] - 1) return null
      return d
    },
    nextMonth() {
      const d = new Date(this.viewYear, this.viewMonth + 1, 1);
      this.viewYear = d.getFullYear();
      this.viewMonth = d.getMonth()
    },
    prevMonth() {
      const d = new Date(this.viewYear, this.viewMonth - 1, 1);
      this.viewYear = d.getFullYear();
      this.viewMonth = d.getMonth()
    },
  }
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
