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
        <v-divider></v-divider>
        <div class="text-sm my-5 text-gray-500 lg:!text-right !text-center">
          &copy;
          <a
            href="https://izzaalfiansyah.vercel.app"
            class="no-underline text-gray-500"
            target="_blank"
            >Muhammad Izza Alfiansyah</a
          >
          2024
        </div>
      </v-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>
