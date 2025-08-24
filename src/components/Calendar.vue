<template>
  <div class="vc">
    <div class="vc__header">
      <button class="vc__nav" type="button" @click="prevMonth">‹</button>
      <div class="vc__title">{{ monthLabel }} {{ viewYear }}</div>
      <button class="vc__nav" type="button" @click="nextMonth">›</button>
    </div>


    <div class="vc__weekdays">
      <div v-for="day in weekdayLabels" :key="day" class="vc__weekday">
        {{ day }}
      </div>
    </div>


    <div class="vc__grid">
      <button
        v-for="cell in daysGrid"
        :key="cell.key"
        class="vc__cell"
        :class="{ 'is-out': !cell.inCurrentMonth }"
        type="button"
        @click="onSelect(cell.date)"
      >
        {{ cell.date.getDate() }}
      </button>
    </div>
  </div>
</template>


<script>
const LOCALES = {
  ru: {
    months: [
      'Январь','Февраль','Март','Апрель','Май','Июнь',
      'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
    ],
    weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekStartsOn: 1, // понедельник
  },
  en: {
    months:
      ['January','February','March','April','May','June',
        'July','August','September','October','November','December'
      ],
    weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    weekStartsOn: 0, // воскресенье
  }
}
export default {
  name: 'AppCalendar',
  props: {
    modelValue: {
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
    activeLocale() {
      return LOCALES[this.locale] || LOCALES.ru
    },
    monthLabel() {
      return this.activeLocale.months[this.viewMonth]
    },
    weekdayLabels() {
      const { weekdays, weekStartsOn } = this.activeLocale
      return weekStartsOn === 0
        ? weekdays
        : [...weekdays.slice(1), weekdays[0]]
    },
    daysGrid() {
      const { weekStartsOn } = this.activeLocale
      const first = new Date(this.viewYear, this.viewMonth, 1)
      // сдвиг относительно выбранного первого дня недели
      const startDay = (first.getDay() - weekStartsOn + 7) % 7
      const start = new Date(this.viewYear, this.viewMonth, 1 - startDay)
      const out = []
      for (let i = 0; i < 42; i++) {
        const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
        out.push({
          key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
          date: d,
          inCurrentMonth: d.getMonth() === this.viewMonth,
        })
      }
      return out
    }
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

    toISO(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`
    },
    onSelect(d) {
      const date = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      const iso = this.toISO(date)

      this.$emit('update:modelValue', iso)
      this.$emit('select', iso)
      this.viewYear = date.getFullYear()
      this.viewMonth = date.getMonth()
    }
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

.vc__cell.is-out {
  color: #aaa;
  background: #fafafa;
}

.vc__cell.is-selected {
  background: #e8f0ff;
  border-color: #7aa7ff;
  font-weight: 600;
}
.vc__cell.is-today {
  border-color: #7aa7ff;
}
</style>
