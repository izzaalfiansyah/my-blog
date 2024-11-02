<script lang="ts" setup>
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/apollo";
import { useProfileQuery } from "./graphql/query";
import { watch } from "vue";
import { useAuthStore } from "./stores/auth-store";
import NotificationSnackbar from "./component/NotificationSnackbar.vue";

provideApolloClient(apolloClient);
const { result } = useProfileQuery();
const authStore = useAuthStore();

watch(result, (val) => {
  if (val) {
    authStore.user = val.profile;
  }
});
</script>

<template>
  <div
    class="min-h-screen antialised text-base font-normal font-inter text-gray-700"
  >
    <template v-if="!!authStore.user">
      <router-view></router-view>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>

    <NotificationSnackbar></NotificationSnackbar>
  </div>
</template>
