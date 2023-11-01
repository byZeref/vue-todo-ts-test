import { VueWrapper, mount } from "@vue/test-utils";

export const createTodo = async (wrapper: VueWrapper, text: string) => {
  const form = wrapper.get('[role="form"]')
  const input = wrapper.get('[role="todo-input"]')
  await input.setValue(text)
  await form.trigger('submit')
}

export const todosArr = [
  { id: '1', label: 'Todo 1', done: false, shake: false },
  { id: '2', label: 'Todo 2', done: false, shake: false },
  { id: '3', label: 'Todo 3', done: false, shake: false },
]