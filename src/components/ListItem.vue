<template>
  <div class="list__item">
    
    <div v-if="!editing" class="list__name-wrapper">
      <h2 @click="editing=!editing" class="list__name">
          {{list.name}} 
      </h2>
      <span class="list__delete" @click="deleteList">
          &#10005;
      </span>
    </div>
    <div v-else class="list__name-wrapper">
      <input class="todo__edit-input" type="text" @keyup.enter="editList" v-model="name">
    </div>
    <div class="list__content">
      <Input v-bind:list="list"/>
      <ul class="todos">
        <TodoItem v-for="todo in list.todos" v-bind:key="todo.todoId" v-bind:listId="list.listId" v-bind:todo="todo"/>
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
  props: ["newList"],
  data: function() {
    return {
      list: {},
      editing: false,
      new: false,
      name: ""
    };
  },
  components: {
    TodoItem,
    Input
  },
  created() {
    this.list = this.findList(this.$route.params.listId);
    this.populateData();
  },
  watch: {
    $route(to, from) {
      this.list = this.findList(to.params.listId); // https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes react to route changes... when navigating the same component instance will be reused - lifecycle hooks of the component will not be called
      this.populateData();
    }
  },
  methods: {
    findList: function(id) {
      this.id = Number(id);
      return Store.findList(this.id);
    },
    populateData: function() {
      if (this.list) {
        this.name = this.list.name;
      } else {
        this.list = this.newList;
        this.name = this.list.name;
        this.editing = this.list.editing;
      }
    },
    editList: function() {
      if (!this.list.listId) {
        Store.makeNewList({
          name: this.name,
          listId: new Date().getTime(),
          editing: false,
          todos: this.list.todos
        });
      }
      Store.editList(this.list.listId, this.name);
      this.editing = !this.editing;
    },
    deleteList: function() {
      if (this.new) {
        return;
      }
      Store.deleteTodo(this.listId);
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
@import "@/assets/scss/main.scss";
.list {
  &__name-wrapper {
    margin-bottom: 30px;
    position: relative;
  }
  &__name {
    font-size: 26px;
    color: #11998e;
    text-align: center;
    &:hover ~ .list__delete {
      display: block;
    }
  }
  &__delete {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    color: red;
    &:hover {
      display: block;
    }
  }
}
.todos {
  width: 550px;
  border-bottom: 1.5px solid $grey-border-color;
  border-left: 1px solid $grey-border-color;
  border-right: 1px solid $grey-border-color;
  background-color: $background-grey;
}
</style>
