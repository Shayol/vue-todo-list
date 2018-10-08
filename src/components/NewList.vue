<template>
  <div class="new-list">
      <h2 class="list__name">
        {{newList.name}} 
    </h2>
   <Input v-bind:list="newList"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";

export default {
  name: "NewList",
  data: function() {
    return {
      newList: {
        name: "Default list",
        todos: []
      }
    };
  },
  components: {
    Input
  }
};
</script>