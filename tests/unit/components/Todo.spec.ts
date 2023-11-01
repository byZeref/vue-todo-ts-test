import { VueWrapper, mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import Todo from "@/components/Todo.vue";
import { todosArr } from "../mocks/todo.mock";
import { beforeEach } from "node:test";

describe('Todo', () => {

  test('renderiza el componente', () => {
    const todo = todosArr[0]
    const wrapper = mount(Todo, {
      props: {
        todo,
      }
    })

    expect(wrapper.get('[role=single-todo]')).toBeDefined()
    expect(wrapper.get('[role=single-todo]').get('span').text()).toBe('Todo 1')
  })


  test('emite ev:delete | eliminar un todo', () => {
    const eventName = 'delete'
    const todo = todosArr[0]
    const wrapper = mount(Todo, {
      props: {
        todo
      }
    })

    const btns = wrapper.findAll('[role=delete-todo]')
    expect(btns).toHaveLength(1)

    btns[0].trigger('click')
    expect(wrapper.emitted(eventName)).toBeTruthy()

  })

})