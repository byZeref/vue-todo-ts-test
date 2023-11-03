<script setup lang="ts">
import { ref } from 'vue'
import Todo from "@/components/Todo.vue";
import type { Ref } from 'vue'
import type { SingleTodo } from '@/types/types'
import { v4 as setUUID } from 'uuid'

const list: Ref<SingleTodo[]> = ref([])
const text = ref('')
const duplicatedTodo: Ref<SingleTodo | undefined> = ref(undefined)

const submit = () => {
  if (text.value === '') return;
  
  if (validate()) {
    const obj = {
      id: setUUID(),
      label: text.value,
      done: false,
      shake: false
    }
    list.value.unshift(obj)
    text.value = ''
  } else {
    duplicatedTodo.value = list.value.find(item => item.label === text.value.trim())
    duplicatedTodo.value!.shake = true
    setTimeout(() => {
      duplicatedTodo.value!.shake = false
    }, 300)
  }
}

const validate = () => {
  return !list.value.some(item => item.label === text.value)
}

const deleteTodo = (id: string) => {
  list.value = list.value.filter(item => item.id !== id)
}

const checkTodo = (todo: SingleTodo) => {
  todo.done = !todo.done
  if (todo.done) {
    list.value = list.value.filter(el => el.id !== todo.id)
    list.value.push(todo)
  } else {
    const idx = list.value.findIndex(item => item.done)
    const todo_idx = list.value.findIndex(item => item.id === todo.id)
    
    if (idx !== -1 && idx < todo_idx) {
      list.value = list.value.filter(el => el.id !== todo.id)
      list.value.splice(idx, undefined!, todo)
    }
  }
}

// CUSTOM DIRECTIVE
const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}

</script>

<template>
  <header>TO-DO LIST</header>
  <main>
    <section class="form">
      <form @submit.prevent="submit" class="todo-form" role="form">
        <input v-focus role="todo-input" type="text" v-model.trim="text">
        <button type="submit">
          <img class="add-icon" src="/public/add.svg" alt="add-icon">
          <span>Agregar</span>
        </button>
      </form>
    </section>
    <section>
      <ul class="todo-list" role="todo-list">
        <TransitionGroup name="appearing">
          <Todo
            v-for="(item) in list"
            :key="item.id"
            :todo="item"
            @click="checkTodo(item)"
            @delete="deleteTodo(item.id)"
          />
        </TransitionGroup>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.todo-list {
  @media (max-width: 640px) {
    width: 80vw;
  }
  position: relative;
  padding: 0;
  width: 450px;
}
.appearing {
  &-enter-active {
    transition: all .5s ease-in;
  }
  &-leave-active {
    transition: all .5s ease-out;
    position: absolute;
  }
  &-enter-from {
    opacity: 0;
    transform: translateY(-50px);
  }
  &-leave-to {
    opacity: 0;
    scale: .8;
  }
  &-move {
    transition: all .5s ease;
  }
}

header {
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  margin: 40px 0;
}

.form {
  margin-bottom: 30px;
}

form {
  display: flex;
}


input {
  min-width: 10px;
  width: 100%;
  min-height: 40px;
  border-radius: 5px;
  padding: 0 10px;
  transition: all .3s ease-in-out;
  border: none;

  &:focus {
    outline: 2px solid #336ab1;
  }

  &:hover,
  &:focus {
    background-color: #80808090;
  }

}

button {
  @media (max-width: 620px) {
    padding: 10px;
  }
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 11px 20px;
  border-radius: 5px;
  font-size: 16px;
  background-color: #336ab1;
  color: white;
  border: none;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    opacity: .7;
  }

  &:active {
    scale: .9;
  }
  .add-icon {
    @media (min-width: 621px) {
      display: none;
    }
    width: 25px;
    height: 25px;
  }
  span {
    @media (max-width: 620px) {
      display: none;
    }
  }
}

</style>
