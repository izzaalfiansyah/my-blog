<script setup lang="ts">
import { ref } from "vue";
import TipTap from "../../component/TipTap";
import VEmojiPicker, { EmojiExt } from "vue3-emoji-picker";
import { useAuthStore } from "../../stores/auth-store";
import { usePostStore } from "../../stores/post-store";

const authStore = useAuthStore();
const postStore = usePostStore();

const searchTag = ref("");

const req = postStore.$state.req;

const showEmojiPicker = ref(false);
const showCoverImagePicker = ref(false);
const showTagsDialog = ref(false);
const coverImageUrl = ref("");

function handleSelectEmoji(emoji: EmojiExt) {
  req.emoji = emoji.i;
  showEmojiPicker.value = false;
}

function handleImageCoverChange() {
  req.coverImageUrl = coverImageUrl.value;
  showCoverImagePicker.value = false;
  coverImageUrl.value = "";
}
</script>

<template>
  <div
    class="bg-gray-100 h-60 rounded overflow-hidden relative"
    v-if="!!req.coverImageUrl"
  >
    <img :src="req.coverImageUrl" alt="" class="w-full h-full object-cover" />
    <div class="absolute bottom-0 right-0 p-3" v-if="!!authStore.user">
      <v-btn variant="flat" @click="showCoverImagePicker = true" class="mr-3"
        ><span class="i-mdi:image-outline mr-3"></span> Ganti</v-btn
      >
      <v-btn variant="flat" @click="req.coverImageUrl = undefined" class="mr-3"
        ><span class="i-mdi:image-off-outline mr-3"></span> Hapus</v-btn
      >
    </div>
  </div>
  <div class="text-4xl my-10">
    <div class="mb-8 gap-x-2 gap-y-2 flex flex-wrap" v-if="!!authStore.user">
      <template v-if="!req.emoji">
        <v-btn variant="tonal" @click="showEmojiPicker = true"
          ><span class="i-mdi:emoticon-outline mr-3"></span> Emoji</v-btn
        >
      </template>
      <template v-if="!req.coverImageUrl">
        <v-btn variant="tonal" @click="showCoverImagePicker = true"
          ><span class="i-mdi:image-outline mr-3"></span> Cover</v-btn
        >
      </template>

      <v-btn
        variant="tonal"
        @click="showTagsDialog = true"
        :color="req.tags.length ? 'primary' : undefined"
        ><span class="i-mdi:tag-outline mr-3"></span>
        <span v-if="req.tags.length">{{ req.tags.length }}</span> Tags</v-btn
      >
    </div>
    <div class="mb-3 text-8xl group flex items-end" v-if="req.emoji">
      <span
        class="cursor-pointer relative inline-block"
        @click="showEmojiPicker = !!authStore.user ? true : false"
      >
        {{ req.emoji }}
      </span>

      <v-btn
        class="!hidden group-hover:!inline-block transition"
        icon
        density="compact"
        variant="tonal"
        @click="req.emoji = undefined"
        v-if="!!authStore.user"
      >
        <span class="i-mdi:delete-outline"></span>
      </v-btn>
    </div>
    <div class="flex flex-col" v-if="!!authStore.user">
      <input
        type="text"
        class="text-3xl font-bold outline-none h-auto w-full resize-none !mb-0"
        v-model="req.title"
        placeholder="Masukkan Judul"
      />
      <input
        type="text"
        placeholder="Berikan deskripsi mengenai tulisanmu...."
        class="text-lg w-full font-normal outline-none text-gray-500"
        v-model="req.description"
      />
    </div>
    <template v-else>
      <div
        class="text-3xl font-bold outline-none h-auto w-full resize-none !mb-0"
      >
        {{ req.title }}
      </div>
      <div class="text-lg w-full font-normal outline-none text-gray-500">
        {{ req.description }}
      </div>
    </template>
  </div>
  <TipTap v-model="req.content"></TipTap>

  <v-dialog max-width="600px" v-model="showEmojiPicker">
    <v-card>
      <v-card-title>Pilih Emoji</v-card-title>
      <v-card-text>
        <div>
          <v-emoji-picker :native="true" @select="handleSelectEmoji">
          </v-emoji-picker>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog max-width="600px" v-model="showCoverImagePicker">
    <v-card>
      <v-card-title>Pilih Cover Image</v-card-title>
      <v-card-text>
        <v-text-field
          label="Cover Image"
          placeholder="http://image/path/to/url"
          color="primary"
          v-model="coverImageUrl"
          :rules="[
            (v: string) => {
              if (!v.startsWith('http://') && !v.startsWith('https://')) return 'Kolom harus berisi link gambar yang valid';

              return true;
            }
          ]"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="handleImageCoverChange" color="primary"
          >Simpan</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog max-width="600px" v-model="showTagsDialog">
    <v-card>
      <v-card-title>Berikan Tags</v-card-title>
      <v-card-text>
        <v-combobox
          v-model="req.tags"
          v-model:search="searchTag"
          :hide-no-data="false"
          :items="[]"
          multiple
          chips
          variant="outlined"
          density="default"
          color="primary"
          placeholder="Masukkan tags tulisanmu"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                <div class="text-sm">
                  Klik enter untuk menambahkan tag "<strong>{{
                    searchTag
                  }}</strong
                  >".
                </div>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template #chip="{ item }">
            <v-chip color="primary">{{ item.title }}</v-chip>
          </template>
        </v-combobox>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" color="primary" @click="showTagsDialog = false"
          >TUTUP</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
