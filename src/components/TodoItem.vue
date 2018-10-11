<template>
  <div class="todo">

    
      <div v-if="!editing">
        <input type="checkbox" name="checked" class="todo__checked" v-bind:checked="checked">
      
        <p class="todo__title">
            {{title}} 
        </p>
        <button @click="deleteTodo()">
          Delete
        </button>
      </div>
      <div v-else>
        <input type="text" @keyup.enter="editTodo()" v-model="title">
      </div>
    
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  data: function() {
    return {
      title: this.todo.title,
      checked: this.todo.checked,
      editing: this.todo.editing,
      id: this.todo.todoId
    };
  },
  methods: {
    deleteTodo: function() {
      this.$emit("delete-todo", this.id);
    },
    editTodo: function() {
      this.$emit("edit-title", this.id, title);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>