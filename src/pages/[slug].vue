<script setup lang="ts">
import { useRoute } from "vue-router";
import PostForm from "../component/PostForm/PostForm.vue";
import { usePostBySlugQuery } from "../graphql/query";
import { usePostStore } from "../stores/post-store";
import { Post } from "../type/post";
import { ref } from "vue";
import { dateFormat } from "../utils/dates";

const postStore = usePostStore();
const req = postStore.$state.req;

const route = useRoute();
const slug = route.params.slug as string;
const createdAt = ref(new Date(Date.now()).toUTCString());
const createdPlace = ref("");
const updatedAt = ref();

const isLoaded = ref(false);
const { onResult } = usePostBySlugQuery({ slug });

onResult(({ data }) => {
  console.log(data);
  if (data?.postBySlug) {
    const post: Post = data.postBySlug;

    req.id = post.id;
    req.title = post.title;
    req.description = post.description;
    req.content = post.content;
    req.coverImageUrl = post.coverImageUrl;
    req.emoji = post.emoji;
    req.tags = post.tags || [];

    createdAt.value = post.createdAt;
    createdPlace.value = post.createdPlace;
    updatedAt.value = post.updatedAt;

    isLoaded.value = true;
  }
});
</script>

<template>
  <div v-if="isLoaded" class="mb-20 min-h-70vh">
    <PostForm></PostForm>
    <div class="my-10 text-sm text-gray-400">
      {{ dateFormat(createdAt) }}, {{ createdPlace }}
      <br />
      <template v-if="updatedAt">
        Terakhir diubah: {{ dateFormat(updatedAt) }}
      </template>
      <div v-if="req.tags" class="mt-5 space-x-2">
        <template v-for="tag in req.tags">
          <v-chip
            color="warning"
            role="router-link"
            :to="'/tags/' + tag"
            class="!rounded"
            density="compact"
            >#{{ tag }}</v-chip
          >
        </template>
      </div>
    </div>
  </div>
  <template v-else>
    <div class="min-h-80vh flex items-center justify-center">Memuat...</div>
  </template>
</template>
