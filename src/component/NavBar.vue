<script lang="ts" setup>
import { useAuthStore } from "../stores/auth-store";

const authStore = useAuthStore();
</script>

<template>
  <div
    class="sticky top-0 left-0 z-50 w-full border-b-solid border-1 border-gray-200"
  >
    <v-container class="flex items-center justify-between h-18">
      <div class="text-xl font-semibold">
        <router-link
          to="/"
          class="no-underline text-gray-800 transition hover:text-gray-400"
        >
          <span class="mr-2">✍️</span>Tulisan
        </router-link>
      </div>
      <v-btn
        variant="text"
        color="primary"
        role="router-link"
        to="/create"
        v-if="authStore.user"
        >Buat Baru</v-btn
      >
    </v-container>
  </div>
</template>
