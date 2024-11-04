import { defineStore } from "pinia";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../graphql/mutation";
import { useNotificationStore } from "./notification-store";
import { useRouter } from "vue-router";

export const usePostStore = defineStore("post", {
  state(): {
    req: {
      id?: number;
      title: string;
      description: string;
      emoji?: string;
      coverImageUrl?: string;
      content: string;
    };
  } {
    return {
      req: {
        title: "",
        description: "",
        content: "",
      },
    };
  },
  actions: {
    async reset() {
      this.req = {
        title: "",
        description: "",
        content: "",
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

        await this.reset();
        notificationStore.alert("tulisan berhasil dibuat", "success");

        const router = useRouter();
        router.push("/");
      } catch (err) {
        notificationStore.alert(err as any);
      }
    },
    async update() {
      const notificationStore = useNotificationStore();
      try {
        const { id, ...data } = this.req;

        const { mutate } = useUpdatePostMutation();
        const res = await mutate({
          id: id!,
          ...data,
        });

        if (!res?.data.updatePost) {
          throw "terjadi kesalahan";
        }

        notificationStore.alert("tulisan berhasil diedit", "success");
      } catch (err) {
        notificationStore.alert(err as any);
      }
    },
  },
});
