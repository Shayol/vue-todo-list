<template>
  <div>
    
      <input v-model="newTodo" type="text" class="list__input" placeholder="What needs to be done?">
    
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["list"],
  data: function() {
    return {
      newTodo: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>