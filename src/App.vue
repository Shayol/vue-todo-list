<template>
  <div id="app">
    <ul class="list">
      <router-link v-for="list in lists" v-bind:key="list.listId" class="list__link" :to="{ name: 'ListItem', params: { listId: 1, list: list }}">
          {{list.name}}
      </router-link>
      
    </ul>
    <router-view></router-view>
    
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  name: "App",
  data: function() {
    return {
      lists: [
        {
          name: "I'm first",
          listId: 1,
          editing: false,
          todos: [
            {
              todoId: 1,
              title: "I'm first todo in first list",
              checked: false,
              editing: false
            },
            {
              todoId: 2,
              title: "I'm second todo in first list",
              checked: false,
              editing: false
            }
          ]
        },
        {
          name: "I'm second",
          listId: 2,
          editing: false,
          todos: [
            {
              todoId: 1,
              title: "I'm first todo in second list",
              checked: false,
              editing: false
            },
            {
              todoId: 2,
              title: "I'm second todo in second list",
              checked: false,
              editing: false
            }
          ]
        }
      ]
    };
  },
  components: {
    ListItem
  }
};
</script>

<style lang="scss">
</style>
