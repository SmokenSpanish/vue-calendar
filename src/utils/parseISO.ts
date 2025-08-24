import { mount } from "@vue/test-utils";
import Calendar from "@/components/Calendar.vue";

describe("Calendar.vue", () => {
  it("парсит ISO дату", () => {
    const wrapper = mount(Calendar);

    // достаем метод напрямую
    // @ts-expect-error - достаем приватный метод для теста
    const result = wrapper.vm.parseISO("2025-08-24T12:34:56Z");

    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe("2025-08-24T12:34:56.000Z");
  });
});
