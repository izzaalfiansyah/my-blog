<script lang="ts" setup>
import { ref } from "vue";
import { usePostsQuery } from "../../graphql/query";
import { Post } from "../../type/post";
import { dateFormat } from "../../utils/dates";

let posts = ref<Post[]>([]);
const { onResult } = usePostsQuery();

onResult(({ data }) => {
  if (data?.posts) {
    posts.value = data.posts;
  }
});
</script>

<template>
  <div class="py-5 space-y-3">
    <router-link
      class="no-underline block p-2 rounded hover:bg-gray-50 text-gray-700"
      v-for="post in posts"
      :to="'/' + post.slug"
    >
      <div class="text-lg font-semibold">
        {{ post.title }}
      </div>
      <div class="text-gray-500 mb-1">{{ post.description }}</div>
      <div class="text-sm text-primary">
        {{ dateFormat(post.createdAt) }}, {{ post.createdPlace }}
      </div>
    </router-link>
  </div>
</template>
