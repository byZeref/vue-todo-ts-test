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
    <div class="todo-text">
      <span>{{ todo.label }}</span>
    </div>

    <button class="btn delete" role="delete-todo" @click.stop="$emit('delete')">
      <img class="remove-icon" src="/public/trash.svg" alt="remove-icon">
      <span>Eliminar</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.todo-item {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px 20px;
  width: 100%;
  border-radius: 5px;
  color: black;
  user-select: none;
  cursor: pointer;
  transition: all .3s ease;
  &:active {
    scale: .9;
  }
  &:not(.appearing-leave-to):hover {
    opacity: .8;
  }
  .todo-text {
    max-width: 75%;
    overflow-x: hidden;
    text-overflow: ellipsis;
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
  animation: shaking .3s linear;
}
.todo-item.completed {
  background-color: #5a5858;
}
.todo-item.completed span {
  text-decoration: line-through;
}
.btn.delete {
  @media (max-width: 620px) {
    padding: 8px 10px;
  }
  display: flex;
  align-items: center;
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
  .remove-icon {
    @media (min-width: 621px) {
      display: none;
    }
    width: 20px;
    height: 20px;
  }
  span {
    @media (max-width: 620px) {
      display: none;
    }
  }
}
</style>
