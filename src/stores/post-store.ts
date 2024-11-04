import { defineStore } from "pinia";
import { useCreatePostMutation } from "../graphql/mutation";
import { useNotificationStore } from "./notification-store";
import { useRouter } from "vue-router";

export const usePostStore = defineStore("post", {
  state(): {
    req: {
      title: string;
      emoji?: string;
      coverImageUrl?: string;
      content?: string;
    };
  } {
    return {
      req: {
        title: "Judul Tulisan",
        emoji: undefined,
        coverImageUrl: undefined,
        content: undefined,
      },
    };
  },
  actions: {
    reset() {
      this.req = {
        title: "Judul Tulisan",
        emoji: undefined,
        coverImageUrl: undefined,
        content: undefined,
      };
    },
    async save() {
      const notificationStore = useNotificationStore();
      try {
        const { mutate } = useCreatePostMutation();
        const res = await mutate({ ...this.req, isPublished: true });

        if (!res?.data.createPost) {
          throw "terjadi kesalahan";
        }

        this.reset();
        notificationStore.alert("tulisan berhasil dibuat", "success");

        const router = useRouter();
        router.push("/");
      } catch (err) {
        notificationStore.alert(err as any);
      }
    },
  },
});
