<script setup lang="ts">
import PostList from "../component/Home/PostList.vue";
</script>

<template>
  <div
    class="min-h-80vh flex items-center lg:!justify-between gap-5 justify-center lg:flex-row flex-col"
  >
    <div class="lg:w-1/2 lg:!text-left text-center">
      <h2 class="lg:text-3xl text-2xl font-semibold mb-3">
        Hai, Saya Alfiansyah!
        <span class="lg:text-5xl text-3xl mb-5">🌊</span>
      </h2>
      <p>
        Jika kau bertanya, aku orang yang perfeksionis tapi tetap menerima semua
        apa adanya. Dan aku ingin menguasai dunia!
      </p>
    </div>
    <div class="order-first lg:!order-last">
      <img
        src="../assets/cover-boy.png"
        alt=""
        class="lg:size-350px size-200px rounded-lg object-cover lg:mb-0 mb-5"
      />
    </div>
  </div>
  <v-divider></v-divider>
  <div class="my-20">
    <div class="mb-10">
      <div class="text-3xl font-semibold text-center">
        Semua Tulisan Bisa Dibaca
      </div>
    </div>
    <PostList></PostList>
  </div>
</template>
