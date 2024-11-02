<script lang="ts" setup>
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/apollo";

provideApolloClient(apolloClient);
</script>

<template>
  <div
    class="min-h-screen antialised text-base font-normal font-inter text-gray-700"
  >
    <router-view></router-view>
  </div>
</template>
