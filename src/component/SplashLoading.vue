<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/auth-store";
import { useProfileQuery } from "../graphql/query";
import { useRoute, useRouter } from "vue-router";

const { result } = useProfileQuery();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const show = ref(true);

watch(result, (val) => {
  if (val) {
    authStore.user = val.profile;
  }
});

onMounted(() => {
  setTimeout(() => {
    show.value = false;

    if (!!authStore.user) {
      if (route.path == "/login") {
        router.replace("/");
      }
    }
  }, 1500);
});
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-1000 bg-white flex items-center justify-center opacity-100 transition"
    :class="{ '!opacity-0': !show, 'pointer-events-none': !show }"
  >
    <div class="i-mdi:loading animate animate-spin size-12"></div>
  </div>
</template>
