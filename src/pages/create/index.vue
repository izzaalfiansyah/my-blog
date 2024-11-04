<script setup lang="ts">
import { onMounted, ref } from "vue";
import PostForm from "../../component/PostForm/PostForm.vue";
import { usePostStore } from "../../stores/post-store";

const isReset = ref(false);
const postStore = usePostStore();

onMounted(async () => {
  await postStore.reset();
  isReset.value = true;
});
</script>

<template>
  <div v-if="isReset" class="min-h-70vh">
    <PostForm></PostForm>
  </div>
</template>
