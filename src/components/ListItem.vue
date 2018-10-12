<template>
  <div class="list__item">
    <p v-show="!list.listId" class="list__alert">
      Please give your list a name before adding todos
    </p>
    <div v-if="!editing" class="list__name-wrapper">
      <h2 @click="editing=!editing" class="list__name">
          {{list.name}} 
      </h2>
      <span class="list__delete" @click="deleteList">
          &#10005;
      </span>
    </div>
    <div v-else class="list__name-wrapper">
      <input class="list__edit-input" type="text" @keyup.enter="editList" v-model="name">
    </div>
    <div class="list__content">
      <Input v-bind:list="list"/>
      <ul class="todos">
        <TodoItem v-for="todo in filteredTodos" v-bind:key="todo.todoId" v-bind:listId="list.listId" v-bind:todo="todo"/>
      </ul>
      <div class="list__bottom">       
          <span class="list__number">
            {{todosLeft}} item<span v-show="todosLeft != 1">s</span> left
          </span>
          <div class="list__filters filters">
            <a href="" @click.prevent="filter='All'" :class="{filters__active: filter=='All'}" class="filters__link">All</a>
            <a href="" @click.prevent="filter='Active'" :class="{filters__active: filter=='Active'}" class="filters__link">Active</a>
            <a href="" @click.prevent="filter='Completed'" :class="{filters__active: filter=='Completed'}" class="filters__link">Completed</a>
          </div>
          <button class="list__clearCompleted" @click.prevent="clearCompleted">
            Clear completed (<span>{{todosCompleted}}</span>)
          </button>
      </div>
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
      name: "",
      filter: "All"
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
      let parsedId = Number(id);
      return Store.findList(parsedId);
    },
    populateData: function() {
      if (!this.list) {
        this.list = this.newList;
        this.editing = this.list.editing;
      }
      this.name = this.list.name;
    },
    editList: function() {
      if (!this.list.listId) {
        let createdList = {
          name: this.name,
          listId: new Date().getTime(),
          editing: false,
          todos: this.list.todos
        };

        Store.makeNewList(createdList);
        this.list = Store.findList(createdList.listId);
      }
      this.editing = !this.editing;
      Store.editList(this.list.listId, this.name);
    },
    deleteList: function() {
      if (!this.list.listId) {
        return;
      }
      Store.deleteList(this.list.listId);
      this.$router.push("/");
    },
    clearCompleted() {
      let completed = this.list.todos.filter(el => el.checked);
      completed.forEach(el => Store.deleteTodo(this.list.listId, el.todoId));
    }
  },
  computed: {
    filteredTodos: function() {
      if (this.filter == "All") {
        return this.list.todos;
      } else if (this.filter == "Active") {
        return this.list.todos.filter(el => !el.checked);
      } else if (this.filter == "Completed") {
        return this.list.todos.filter(el => el.checked);
      }
    },
    todosLeft: function() {
      return this.list.todos.filter(el => !el.checked).length;
    },
    todosCompleted: function() {
      return this.list.todos.filter(el => el.checked).length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/main.scss";
.list {
  &__name-wrapper {
    height: 65px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
  }
  &__name {
    font-size: 28px;
    font-weight: bold;
    color: #11998e;
    text-align: center;
    &:hover ~ .list__delete {
      display: block;
    }
  }
  &__edit-input {
    height: 60px;
    font-size: 24px;
    flex-grow: 1;
    flex-shrink: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 16px;
  }
  &__delete {
    display: none;
    position: absolute;
    top: 10%;
    right: 30px;
    color: red;
    cursor: pointer;
    &:hover {
      display: block;
    }
  }
  &__alert {
    padding: 15px;
    background-color: #ee8c4a;
    color: white;
    margin-bottom: 15px;
    font-size: 16px;
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    color: #969696;
    align-items: center;
    height: 38px;
    background-color: #efefef;
    padding: 4px 10px 0 10px;
    margin-left: 8px;
    margin-right: 8px;
    border-bottom: 1px solid $grey-border-color;
    border-left: 1px solid $grey-border-color;
    border-right: 1px solid $grey-border-color;
  }
  &__clearCompleted {
    padding: 4px 10px;
    background-color: #d1d1d1;
    border-radius: 4px;
    border: 1px solid $grey-border-color;
    outline: none;
    font-size: 14px;
    color: #969696;
  }
}
.todos {
  width: 550px;
  border-bottom: 1.5px solid $grey-border-color;
  border-left: 1px solid $grey-border-color;
  border-right: 1px solid $grey-border-color;
  background-color: $background-grey;
  position: relative;
  &:after {
    content: "";
    height: 4px;
    width: calc(100% - 8px);
    position: absolute;
    top: calc(100% + 1px);
    left: 4px;
    border-bottom: 1px solid $grey-border-color;
    border-left: 1px solid $grey-border-color;
    border-right: 1px solid $grey-border-color;
    background-color: rgba(255, 255, 255, 0.7);
    // z-index: 1;
  }
}
.filters {
  display: flex;
  height: 32px;
  align-items: center;
  &__link {
    text-decoration: none;
    margin-left: 10px;
    color: #969696;
  }
  &__active {
    font-weight: bold;
  }
}
</style>
