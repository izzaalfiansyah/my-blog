<script setup lang="ts">
import { useRoute } from "vue-router";
import PostForm from "../component/PostForm/PostForm.vue";
import { usePostBySlugQuery } from "../graphql/query";
import { usePostStore } from "../stores/post-store";
import { Post } from "../type/post";

const postStore = usePostStore();
const req = postStore.$state.req;

const route = useRoute();
const slug = route.params.slug as string;

const { onResult } = usePostBySlugQuery({ slug });

onResult(({ data }) => {
  if (data?.postBySlug) {
    const post: Post = data.postBySlug;
    console.log(post.id);
    req.id = post.id;
    req.title = post.title;
    req.content = post.content;
    req.coverImageUrl = post.coverImageUrl;
    req.emoji = post.emoji;
  }
});
</script>

<template>
  <PostForm></PostForm>
</template>
