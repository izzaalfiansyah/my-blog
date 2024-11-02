<script lang="ts" setup>
import { useNotificationStore } from "../stores/notification-store";

const notificationStore = useNotificationStore();
</script>

<template>
  <v-snackbar v-model="notificationStore.show" :color="notificationStore.color">
    {{ notificationStore.message }}
    <template #actions>
      <button
        type="button"
        class="i-mdi:close text-white"
        @click="notificationStore.reset"
      ></button>
    </template>
  </v-snackbar>
</template>
