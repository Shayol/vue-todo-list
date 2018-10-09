<template>
  <div class="list__item">
    
    <h2 class="list__name">
        {{list.name}} 
    </h2>
    <div class="list__content">
      <Input v-bind:list="list"/>
      <ul class="todos">
        <TodoItem v-for="todo in list.todos" v-bind:key="todo.todoId" v-bind:todo="todo"/>
      </ul>
  
        <span class="list__number">
          {{todosNumber}}
        </span>
    </div>
    
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import Input from "@/components/Input.vue";
import Store from "@/Store.js";

export default {
  name: "ListItem",
  data: function() {
    return {
      list: {}
    };
  },
  components: {
    TodoItem,
    Input
  },
  created() {
    this.list = this.findList(this.$route.params.listId);
  },
  watch: {
    $route(to, from) {
      this.list = this.findList(to.params.listId); // https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes react to route changes... when navigating the same component instance will be reused - lifecycle hooks of the component will not be called
    }
  },
  methods: {
    findList: function(id) {
      this.id = Number(id);
      return Store.findList(this.id);
    }
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
.list {
  &__content {
    max-width: 550px;
    width: 100%;
  }
}
</style>
