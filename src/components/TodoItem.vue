<template>
  <div class="todo">

    
      <div class="todo__field" v-if="!editing">

        <div class="todo__checked-wrapper">
          <input type="checkbox" name="checked" class="todo__checkbox" @change="editTodoChecked" v-model="checked">
          <div class="todo__check">&#10004;</div>
        </div>
      
        <p class="todo__title" @click="editing=!editing" :class="{todo__completed: checked}">
            {{title}} 
        </p>
        <span class="todo__delete" @click="deleteTodo()">
          &#10005;
        </span>
      </div>
      <div class="todo__field todo__field--editing" v-else>
        <div class="todo__checked-wrapper todo__checked-wrapper--editing"></div>
        <input class="todo__edit-input" type="text" maxlength="300" @keyup.enter="editTodoTitle" v-model.trim="title">
      </div>
    
  </div>
</template>

<script>
import Store from "@/Store.js";
export default {
  name: "TodoItem",
  props: ["todo", "listId"],
  data: function() {
    return {
      localTodo: {},
      title: "",
      checked: false,
      editing: false,
      todoId: ""
    };
  },
  created() {
    this.localTodo = Store.findTodo(this.listId, this.todo.todoId);
    this.title = this.todo.title;
    this.checked = this.todo.checked;
    this.editing = this.todo.editing;
    this.todoId = this.todo.todoId;
  },
  methods: {
    deleteTodo: function() {
      Store.deleteTodo(this.listId, this.todoId);
    },
    editTodoTitle: function() {
      if (this.title) {
        Store.editTodoTitle(this.listId, this.todoId, this.title);
        this.editing = !this.editing;
      }
    },
    editTodoChecked: function() {
      Store.editTodoChecked(this.listId, this.todoId, this.checked);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/main.scss";
.todo {
  &__field {
    display: flex;
    position: relative;
    min-height: 48px;
    align-items: center;
    border-top: 1px dotted $brown-border-color;
    width: 100%;
    &\--editing {
      background-color: #efefef;
      padding-right: 16px;
      padding-left: 16px;
    }
  }
  &__checked-wrapper {
    width: 40px;
    margin-right: 4px;
    min-height: 48px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    &\--editing {
      display: none;
    }
  }
  &__checkbox {
    opacity: 0;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  &__checkbox:checked ~ &__check {
    color: #11998e;
  }
  &__check {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #969696;
    opacity: 0.6;
  }
  &__title {
    flex-grow: 1;
    min-height: 48px;
    line-height: 48px;
    padding: 0 16px;
    font-size: 16px;
    color: $dark-brown;
    &:hover {
      ~ .todo__delete {
        display: block;
      }
    }
  }
  &__edit-input {
    min-height: 32px;
    font-size: 24px;
    padding-left: 16px;
    display: block;
    width: 100%;
    flex-shrink: 1;
    margin: auto;
  }
  &__delete {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    color: red;
    cursor: pointer;
  }
  &__completed {
    color: $grey-text-color;
    text-decoration: line-through;
    text-decoration-color: $grey-text-color;
  }

  @media (min-width: $tablet) {
    &__field\--editing {
      padding-left: 0;
    }
    &__delete {
      display: none;
      &:hover {
        display: block;
      }
    }
    &__checked-wrapper\--editing {
      display: block;
    }
  }
}
</style>