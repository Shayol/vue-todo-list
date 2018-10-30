<template>
  <div class="input">
    <div class="input__decor-padding"></div>
    <div class="input__input-wrapper">
      <input class="input__field" maxlength="150" @keyup.enter="create" v-model="title" type="text" placeholder="What needs to be done?">
      <div @click="create" class="input__left-icon"></div>
    </div>
  </div>
</template>

<script>
import Store from "@/Store.js";
export default {
  name: "Input",
  props: ["list"],
  data: function() {
    return {
      title: ""
    };
  },
  methods: {
    create: function() {
      let entry = this.title.trim();
      if (entry) {
        if (this.list.listId) {
          Store.addTodo(this.list.listId, this.title);
          this.title = "";
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/scss/main.scss";
.input {
  &__decor-padding {
    border-bottom: 1px solid #665f5c;
    width: 100%;
    height: 16px;
    background: #aea7a7; /* Old browsers */
    background: -moz-linear-gradient(
      left,
      #aea7a7 0%,
      #938c89 7%,
      #8d857f 20%,
      #857d77 27%,
      #8c857e 33%,
      #827b79 73%,
      #827f79 87%,
      #77746d 93%,
      #72716c 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #aea7a7 0%,
      #938c89 7%,
      #8d857f 20%,
      #857d77 27%,
      #8c857e 33%,
      #827b79 73%,
      #827f79 87%,
      #77746d 93%,
      #72716c 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      #aea7a7 0%,
      #938c89 7%,
      #8d857f 20%,
      #857d77 27%,
      #8c857e 33%,
      #827b79 73%,
      #827f79 87%,
      #77746d 93%,
      #72716c 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#aea7a7', endColorstr='#72716c',GradientType=1 );
    /* IE6-9 */
  }
  &__input-wrapper {
    display: flex;
    box-shadow: 5px 5px 10px $grey-border-color,
      -5px 5px 10px $grey-border-color;
  }
  &__field {
    order: 1;
    height: 48px;
    padding: 0 16px;
    font-size: 20px;
    flex-grow: 1;
    flex-shrink: 0;
    font-style: italic;
    border: 0;
    border-bottom: 0;
    outline: none;
    &::placeholder {
      color: $grey-text-color;
    }
    &:focus ~ .input__left-icon {
      border: 1px solid #b8b8b8;
      &:before,
      &:after {
        border-right-color: #11998e;
        border-bottom-color: #11998e;
      }
    }
  }
  &__left-icon {
    width: 44px;
    height: 48px;
    position: relative;
    background-color: white;
    &::before,
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      border-right: 1.2px solid #969696;
      border-bottom: 1.2px solid #969696;
      opacity: 0.6;
    }
    &:before {
      top: 14px;
    }
    &:after {
      top: 20px;
    }
  }
}
</style>