<script setup lang="ts">
import type { SingleTodo } from '@/types/types'
const props = defineProps<{
  todo: SingleTodo,
}>()

const emit = defineEmits<{
  delete: []
}>()

</script>

<template>
  <div :class="['todo-item', { completed: todo.done, shake: todo.shake }]" role="single-todo">
    <span>{{ todo.label }}</span>

    <button class="btn delete" role="delete-todo" @click.stop="$emit('delete')">
      Eliminar
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: gray; */
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  color: black;
  user-select: none;
  cursor: pointer;
  transition: all .3s ease;
  &:active {
    scale: .9;
  }
  &:hover {
    opacity: .8;
  }
}
@keyframes shaking {
    0% {
      transform: translateX(0px);
    }
    20% {
      transform: translateX(-5px);
    }
    30% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-10px);
    }
    60% {
      transform: translateX(10px);
    }
    80% {
      transform: translateX(-5px);
    }
    90% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
.todo-item.shake {
  /* background-color: #7a3c3c; */
  animation: shaking .3s linear;
}
.todo-item.completed {
  background-color: #5a5858;
}
.todo-item.completed span {
  text-decoration: line-through;
}
.btn.delete {
  background-color: #e13d3d;
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  transition: opacity .3s ease;
  &:hover {
    opacity: .8;
  }
}
</style>
@/types/types