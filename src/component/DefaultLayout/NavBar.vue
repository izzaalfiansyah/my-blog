<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth-store";
import { usePostStore } from "../../stores/post-store";

const authStore = useAuthStore();
const postStore = usePostStore();
const route = useRoute();
</script>

<template>
  <div
    class="sticky top-0 left-0 z-50 w-full border-b-solid border-1 border-gray-200 bg-white"
  >
    <v-container class="flex items-center justify-between h-18">
      <div class="text-xl font-semibold flex items-center gap-x-2">
        <router-link
          to="/"
          class="no-underline text-gray-800 transition hover:text-gray-400"
        >
          <span class="mr-2">✍️</span>Tulisan
        </router-link>

        <template v-if="route.params.slug">
          <span class="text-base font-normal"> / </span>
          <span
            class="font-normal text-base text-gray-800 max-w-200px truncate"
            :title="postStore.req.title"
            >{{ postStore.req.title }}</span
          >
        </template>
      </div>
      <template v-if="!!authStore.user">
        <v-btn
          variant="text"
          color="primary"
          role="router-link"
          to="/create"
          v-if="route.path != '/create' && !route.params.slug"
        >
          <span class="i-mdi:pencil-outline mr-3"></span>
          Baru
        </v-btn>
        <v-btn
          variant="text"
          v-if="route.path == '/create'"
          color="primary"
          @click="postStore.save"
        >
          <span class="i-mdi:upload-outline mr-3"></span>
          Publish
        </v-btn>
        <div v-if="!!route.params.slug">
          <v-btn variant="text" color="primary" @click="postStore.update">
            <span class="i-mdi:upload-outline mr-3"></span>
            Simpan
          </v-btn>
          <v-btn variant="text" color="red" @click="postStore.delete">
            <span class="i-mdi:trash-outline mr-3"></span>
            Hapus
          </v-btn>
        </div>
      </template>
    </v-container>
  </div>
</template>
