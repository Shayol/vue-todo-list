<template>
  <div id="app">
    <div class="container page">
      <ul class="page__sidebar list">
        <router-link v-for="list in lists" v-bind:key="list.listId" class="list__link" :to="{ name: 'ListItem', params: { listId: list.listId}}" tag="li">
            {{list.name}}
        </router-link>
        
      </ul>
      <div class="page__main main">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import Store from "@/Store.js";

export default {
  name: "App",
  data: function() {
    return {
      lists: Store.lists
    };
  },
  components: {
    ListItem
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.main {
  display: flex;
  justify-content: center;
}

@media (min-width: $tablet) {
  .page {
    display: flex;
  }
  .page__sidebar {
    flex-basis: 20%;
  }
  .page__main {
    flex-grow: 1;
  }
}
</style>
