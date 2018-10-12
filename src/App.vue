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
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.main {
  display: flex;
  justify-content: center;
}
.page {
  display: flex;
  padding-top: 50px;
  background-image: url("/assets/img/background-textures.png");
}
.page__sidebar {
  flex-basis: 20%;
}
.page__main {
  flex-grow: 1;
}

.list {
  &__link {
    height: 45px;
    border: 1px solid $grey-border-color;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: $background-grey;
    font-size: 18px;
    font-weight: bold;
    line-height: 45px;
    padding-left: 16px;
    color: $grey-text-color;
  }
  &__new-list {
    background: #11998e;
    width: 100%;
    height: 45px;
    margin: 0 0 20px 0;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 0;
    outline: none;
    font-size: 18px;
    font-weight: bold;
  }
}

.router-link-active {
  color: white;
  background: #11998e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #38ef7d,
    #11998e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #38ef7d,
    #11998e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
