<template>
  <div class="input">
    <div class="input__decor-padding"></div>
    <div class="input__input-wrapper">
       <input class="input__field" v-model="newTodo" type="text" placeholder="What needs to be done?">
    </div>
    
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
@import "@/sass/variables.scss";
.input {
  &__decor-padding {
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
  &__field {
    height: 64px;
    padding: 0 16px;
    font-size: 24px;
    width: 100%;
    font-style: italic;
    border-left: 1px solid $brown-border-color;
    &::placeholder {
      color: $grey-text-color;
    }
  }
}
</style>