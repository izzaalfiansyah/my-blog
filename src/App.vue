<script lang="ts" setup>
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/apollo";
import NotificationSnackbar from "./component/NotificationSnackbar.vue";
import SplashLoading from "./component/SplashLoading.vue";
import DefaultLayout from "./component/DefaultLayout";

provideApolloClient(apolloClient);
</script>

<template>
  <v-app>
    <DefaultLayout></DefaultLayout>
    <NotificationSnackbar></NotificationSnackbar>
    <SplashLoading></SplashLoading>
  </v-app>
</template>
