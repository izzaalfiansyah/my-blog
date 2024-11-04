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
  <template v-if="isReset">
    <PostForm></PostForm>
  </template>
</template>
