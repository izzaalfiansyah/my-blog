<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth-store";
import { usePostStore } from "../../stores/post-store";
import { ref } from "vue";

const authStore = useAuthStore();
const postStore = usePostStore();
const route = useRoute();
const router = useRouter();

const showDialogDelete = ref(false);

async function handleSavePost() {
  const res = await postStore.save();

  if (res) {
    router.push("/");
  }
}

async function handleDeletePost() {
  const res = await postStore.delete();

  if (res) {
    router.push("/");
    showDialogDelete.value = false;
  }
}

async function handleUpdatePost() {
  await postStore.update();
}
</script>

<template>
  <div
    class="sticky top-0 left-0 z-10000 w-full border-b-solid border-1 border-gray-200 bg-white"
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
          <span class="i-mdi:pencil-outline"></span>
          <span class="lg:block hidden ml-3">Baru</span>
        </v-btn>
        <v-btn
          variant="text"
          v-if="route.path == '/create'"
          color="primary"
          @click="handleSavePost"
        >
          <span class="i-mdi:upload-outline"></span>
          <span class="lg:block hidden ml-3">Publish</span>
        </v-btn>
        <div v-if="!!route.params.slug" class="flex">
          <v-btn variant="text" color="primary" @click="handleUpdatePost">
            <span class="i-mdi:upload-outline"></span>
            <span class="lg:block hidden ml-3">Simpan</span>
          </v-btn>
          <v-btn variant="text" color="red" @click="showDialogDelete = true">
            <span class="i-mdi:trash-outline"></span>
            <span class="lg:block hidden ml-3">Hapus</span>
          </v-btn>
        </div>
      </template>
    </v-container>
  </div>

  <v-dialog max-width="600px" v-model="showDialogDelete">
    <v-card>
      <v-card-title>Hapus Tulisan</v-card-title>
      <v-card-text
        >Anda yakin menghapus tulisan? Data akan dihapus permanen</v-card-text
      >
      <v-card-actions>
        <v-btn variant="text" color="red" @click="handleDeletePost"
          >Hapus</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
