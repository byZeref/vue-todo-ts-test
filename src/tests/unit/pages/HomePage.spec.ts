import { describe, test, expect } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import HomePage from '@/pages/HomePage.vue'
import { createTodo, todosArr } from '../mocks/todo.mock'

describe('Home Page', () => {
  
  test('renderiza el componente', () => {
    mount(HomePage)
  })


  test('hace match con snapshot', () => {
    const wrapper = shallowMount(HomePage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  
  test('agrega 2 todos a la lista', async () => {
    const wrapper = mount(HomePage)
    const form = wrapper.get('[role="form"]')
    const input = wrapper.get('[role="todo-input"]')
    const todos = ['Comprar pan', 'Comprar queso']

    expect(form).toBeDefined()
    expect(input).toBeDefined()
    expect(wrapper.findAll('[role="single-todo"]')).toHaveLength(0)
    
    await input.setValue('Comprar pan')
    await form.trigger('submit')
    expect(wrapper.findAll('[role="single-todo"]')).toHaveLength(1)
    expect(wrapper.findAll('[role="single-todo"]')[0].get('span').text()).toBe('Comprar pan')
    expect(input.text()).toBe('')
    
    await input.setValue('Comprar queso')
    await form.trigger('submit')
    expect(wrapper.findAll('[role="single-todo"]')).toHaveLength(2)
    expect(wrapper.findAll('[role="single-todo"]')[0].get('span').text()).toBe('Comprar queso')
    expect(wrapper.findAll('[role="single-todo"]')[1].get('span').text()).toBe('Comprar pan')
    expect(input.text()).toBe('')
  })
 

  test('completa un todo', async () => {
    const wrapper = mount(HomePage)
    const form = wrapper.get('[role="form"]')
    const input = wrapper.get('[role="todo-input"]')

    await input.setValue('Comprar pan')
    await form.trigger('submit')
    await input.setValue('Comprar leche')
    await form.trigger('submit')
    await wrapper.findAll('[role="single-todo"]')[0].trigger('click')

    expect(wrapper.findAll('[role="single-todo"]')[1].classes()).toContain('completed')
  })


  test('elimina un todo', async () => {
    const wrapper = mount(HomePage)
    const btns = wrapper.findAll('[role="delete-todo"]')

    await createTodo(wrapper, 'Comprar pan')
    await createTodo(wrapper, 'Comprar jamon')

    expect(wrapper.findAll('[role="single-todo"]')[0].get('span').text()).toBe('Comprar jamon')
    await wrapper.findAll('[role="delete-todo"]')[0].trigger('click')
    expect(wrapper.findAll('[role="single-todo"]')).toHaveLength(1)
    expect(wrapper.findAll('[role="single-todo"]')[0].get('span').text()).toBe('Comprar pan')
  })


  test('detecta que el todo ya existe', async () => {
    const wrapper = mount(HomePage)

    const form = wrapper.get('[role="form"]')
    const input = wrapper.get('[role="todo-input"]')
    
    await input.setValue('Comprar pan 2 veces')
    await form.trigger('submit')
    
    expect(wrapper.findAll('[role="single-todo"]')).toHaveLength(1)
    
    await input.setValue('Comprar pan 2 veces')
    await form.trigger('submit')

    expect(wrapper.findAll('[role="single-todo"]')).toHaveLength(1)
  })

})
