<template>
  <div class="list__item">
    
    <h2 class="list__name">
        {{list.name}} 
    </h2>
    <Input v-bind:list="list"/>

    <ul class="todos">
      <TodoItem v-for="todo in list.todos" v-bind:key="todo.todoId" v-bind:todo="todo"/>
    </ul>

      <span class="list__number">
        {{todosNumber}}
      </span>
    
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import Input from "@/components/Input.vue";
export default {
  name: "ListItem",
  props: ["list"],
  components: {
    TodoItem,
    Input
  },
  computed: {
    todosNumber: function() {
      return this.list.todos.length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
