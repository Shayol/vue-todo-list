<template>
  <div class="new-list">
      <ListItem v-bind:new-list="newList" />
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from "@/components/ListItem.vue";

export default {
  name: "NewList",
  data: function() {
    return {
      newList: {
        name: "Default todo name",
        editing: true,
        listId: new Date().getTime(),
        todos: []
      }
    };
  },
  components: {
    ListItem
  }
};
</script>