<template>
  <div class="list__item">
    <p v-show="error" class="list__alert">
      {{error}}
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
      <input ref="listedit" class="list__edit-input" type="text" @keyup.enter="editList" v-model="name" placeholder="list name...">
    </div>
    <div class="list__content">

      <Input v-bind:list="list"/>

      <ul class="todos">
        <TodoItem v-for="todo in filteredTodos" v-bind:key="todo.todoId" v-bind:listId="list.listId" v-bind:todo="todo"/>
      </ul>

      <div v-show="list.todos.length" class="list__bottom">       
          <span class="list__number">
            <strong class="list__bold">{{todosLeft}}</strong>  item<span v-show="todosLeft != 1">s</span> left
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
      filter: "All",
      sameNameError: ""
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
  mounted() {
    if (!this.list.listId) {
      this.$refs.listedit.focus();
    }
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
        return;
      }
      this.name = this.list.name;
    },
    editList: function() {
      if (!this.list.listId) {
        if (Store.findListByName(this.name)) {
          this.sameNameError = `There is already a list with '${
            this.name
          }' name. Please, give your list unique name.`;
          return;
        } else {
          this.sameNameError = false;

          let createdList = {
            name: this.name,
            listId: new Date().getTime(),
            editing: false,
            todos: this.list.todos
          };

          Store.makeNewList(createdList);
          this.list = Store.findList(createdList.listId);

          this.$router.push({
            name: "ListItem",
            params: { listId: this.list.listId }
          });
        }
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
    },
    error: function() {
      if (this.sameNameError) {
        return this.sameNameError;
      } else if (!this.list.listId) {
        return "Please give your list a name before adding todos";
      } else {
        return false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/main.scss";
.list {
  &__item {
    width: 100%;
    margin-top: 16px;
  }
  &__name-wrapper {
    height: 48px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
  }
  &__name {
    font-size: 24px;
    font-weight: bold;
    color: $dark-brown;
    text-align: center;
    text-shadow: 2px 2px 8px $grey-border-color;
    &:hover ~ .list__delete {
      display: block;
    }
  }
  &__edit-input {
    height: 32px;
    font-size: 24px;
    display: block;
    width: 100%;
    flex-shrink: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 16px;
    color: $dark-brown;
    border: none;
    &:focus {
      outline: none;
      border: 1px solid $dark-brown;
    }
    &::placeholder {
      color: $grey-text-color;
      font-style: italic;
    }
  }
  &__delete {
    position: absolute;
    top: 10%;
    right: 30px;
    color: red;
    cursor: pointer;
  }
  &__alert {
    padding: 8px 16px;
    background-color: #ee8c4aca;
    color: white;
    margin-bottom: 16px;
    font-size: 12px;
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-top: 1px solid $grey-border-color;
    color: #969696;
    align-items: center;
    // height: 33px;
    background-color: #efefef;
    padding: 4px 10px 4px 10px;
    margin-left: 8px;
    margin-right: 8px;
    position: relative;
    box-shadow: 5px 5px 10px $grey-border-color,
      -5px 5px 10px $grey-border-color;
  }

  &__number {
    font-size: 12px;
    flex-basis: 50%;
    order: 1;
  }
  &__filters {
    flex-basis: 50%;
  }
  &__bold {
    font-weight: bold;
  }
  &__clearCompleted {
    padding: 4px 10px;
    background-color: #d1d1d1;
    border-radius: 4px;
    border: 1px solid $grey-border-color;
    outline: none;
    font-size: 10px;
    color: #969696;
    box-shadow: inset 0px 0px 5px $grey-border-color;
    outline: none;
  }
}
.todos {
  background-color: white;
  box-shadow: 5px 5px 15px $grey-border-color, -5px 5px 10px $grey-border-color;
  width: 100%;
}
.filters {
  display: flex;
  height: 32px;
  align-items: center;
  &__link {
    text-decoration: none;
    margin-left: 10px;
    color: #969696;
    font-size: 12px;
    font-weight: 500;
    &:first-child {
      margin-left: 0;
    }
  }
  &__active {
    font-weight: bold;
  }
}

@media (min-width: $tablet) {
  .list {
    &__item {
      margin-top: 0;
    }
    &__number {
      font-size: 12px;
      flex-basis: auto;
      order: 0;
    }
    &__filters {
      flex-basis: auto;
      margin-right: -10%;
    }
    &__delete {
      display: none;
      &:hover {
        display: block;
      }
    }
  }
}
</style>
