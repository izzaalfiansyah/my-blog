<script lang="ts" setup>
import { useRoute } from "vue-router";
import NavBar from "./NavBar.vue";

const route = useRoute();

const isLoginRoute = () => {
  if (route.path == "/login") {
    return true;
  }

  return false;
};
</script>

<template>
  <div class="antialised text-base font-normal font-inter text-gray-700">
    <template v-if="!isLoginRoute()">
      <NavBar></NavBar>
      <v-container>
        <router-view></router-view>
      </v-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>
