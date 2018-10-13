<template>
  <div id="app">
    <div class="container page">
      <ul class="page__sidebar list">
        <button class="list__new-list" @click="makeNewList">New list</button>
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
  created() {
    let localData = localStorage.getItem("todoStorage");

    if (localData) {
      Store.lists = JSON.parse(localData);
      console.log(Store);
    } else {
      localStorage.setItem("todoStorage", JSON.stringify(Store.lists));
    }
    this.lists = Store.lists;
  },
  data: function() {
    return {
      lists: []
    };
  },
  components: {
    ListItem
  },
  methods: {
    makeNewList: function() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.container {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding: 60px 60px;
  background-image: url("./assets/img/background-textures.png");
}

.main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.page {
  display: flex;
  padding-top: 50px;
  height: 100vh;
}
.page__sidebar {
  flex-basis: 20%;
}
.page__main {
  flex-grow: 1;
}

.list {
  &__link {
    height: 16px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    padding-left: 16px;
    margin-bottom: 16px;
    color: $brown-border-color;
  }
  &__new-list {
    width: 100%;
    height: 32px;
    margin: 0 0 16px 0;
    border: none;
    border-radius: 5px;
    color: $dark-brown;
    padding: 0;
    outline: 1px solid $grey-border-color;
    font-size: 16px;
    font-weight: bold;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background: none;
  }
}

.router-link-active {
  color: $dark-brown;
}
</style>
