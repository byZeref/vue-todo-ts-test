import { VueWrapper, mount } from "@vue/test-utils";

export const createTodo = async (wrapper: VueWrapper, text: string) => {
  const form = wrapper.get('[role="form"]')
  const input = wrapper.get('[role="todo-input"]')
  await input.setValue(text)
  await form.trigger('submit')
}