<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { usePostsQuery } from "../../graphql/query";
import { Post } from "../../type/post";
import { dateFormat } from "../../utils/dates";

let posts = ref<Post[]>([]);
const { onResult, loading, refetch } = usePostsQuery();

onResult(({ data }) => {
  if (data?.posts) {
    posts.value = data.posts;
  }
});

onMounted(async () => {
  await refetch();
});
</script>

<template>
  <div class="space-y-3">
    <template v-if="loading">
      <div class="text-center">Memuat...</div>
    </template>
    <router-link
      class="no-underline relative flex lg:flex-row flex-col justify-between p-2 rounded hover:bg-gray-50 text-gray-700"
      v-for="post in posts"
      :to="'/' + post.slug"
    >
      <div>
        <div class="text-lg font-semibold">
          {{ post.title }} {{ post.emoji }}
        </div>
        <div class="text-gray-500 text-sm mb-1">{{ post.description }}</div>
      </div>
      <div class="lg:text-sm text-xs text-primary lg:mt-0 mt-2">
        {{ dateFormat(post.createdAt) }}, {{ post.createdPlace }}
      </div>
    </router-link>
  </div>
</template>
