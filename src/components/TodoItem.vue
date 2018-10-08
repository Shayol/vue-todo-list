<template>
  <div class="todo">

      <input type="checkbox" name="checked" class="todo__checked" v-bind:checked="todo.checked">
    
      <p class="todo__title">
          {{todo.title}} 
      </p>
    
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>