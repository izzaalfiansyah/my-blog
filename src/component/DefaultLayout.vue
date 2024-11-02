<script lang="ts" setup>
import { useAuthStore } from "../stores/auth-store";

const authStore = useAuthStore();
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
  </div>
</template>
