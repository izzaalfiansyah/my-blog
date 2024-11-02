<script lang="ts" setup>
import { ref } from "vue";
import { emailRules, passwordRules } from "../../rules/login";
import { useLoginMutation } from "../../graphql/mutation";
import { VForm } from "vuetify/components";
import { Storage } from "../../utils/storage";
import { useNotificationStore } from "../../stores/notification-store";

const showPassword = ref(false);
const req = ref({
  email: "",
  password: "",
});
const formElement = ref<VForm>();

const notificationStore = useNotificationStore();

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

async function handleLogin() {
  await formElement.value?.validate();
  const isValid = formElement.value?.isValid;

  if (isValid) {
    try {
      const { mutate } = useLoginMutation();
      const res = await mutate(req.value);

      const token = res?.data.login;

      if (!!token) {
        Storage.setToken(token);
        window.location.reload();
      }
    } catch (err) {
      notificationStore.alert(err as any);
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-5">
    <v-form
      @submit.prevent="handleLogin"
      ref="formElement"
      class="w-420px max-w-full"
    >
      <div class="mb-10">
        <div class="text-2xl font-bold">Selamat Datang!</div>
        <div class="text-sm font-light">
          Silahkan login ke akunmu dan mulai penjelajahan.
        </div>
      </div>
      <div class="space-y-2">
        <v-text-field
          type="email"
          color="primary"
          label="Email"
          placeholder="Masukkan Email"
          v-model="req.email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          color="primary"
          label="Password"
          placeholder="Masukkan Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="req.password"
          :rules="passwordRules"
        >
          <template #append-inner>
            <button
              :class="showPassword ? 'i-mdi:eye' : 'i-mdi:eye-off'"
              @click="toggleShowPassword"
              type="button"
            ></button>
          </template>
        </v-text-field>
      </div>
      <v-btn class="mt-8" variant="tonal" type="submit" color="primary" block
        >LOGIN</v-btn
      >
    </v-form>
  </div>
</template>
