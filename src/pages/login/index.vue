<script lang="ts" setup>
import { ref } from "vue";

const showPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-5">
    <div class="w-420px max-w-full">
      <div class="mb-10">
        <div class="text-2xl font-bold">Selamat Datang!</div>
        <div class="text-sm font-light">
          Silahkan login ke akunmu dan mulai penjelajahan.
        </div>
      </div>
      <div>
        <v-text-field
          color="primary"
          label="Email"
          placeholder="Masukkan Email"
        ></v-text-field>
        <v-text-field
          color="primary"
          label="Password"
          placeholder="Masukkan Password"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #append-inner>
            <button
              :class="showPassword ? 'i-mdi:eye' : 'i-mdi:eye-off'"
              @click="toggleShowPassword"
            ></button>
          </template>
        </v-text-field>
      </div>
      <v-btn class="mt-8" variant="flat" type="submit" color="primary" block
        >LOGIN</v-btn
      >
    </div>
  </div>
</template>
