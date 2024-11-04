import { defineStore } from "pinia";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../graphql/mutation";
import { useNotificationStore } from "./notification-store";

export const usePostStore = defineStore("post", {
  state(): {
    req: {
      id?: number;
      title: string;
      description: string;
      emoji?: string;
      coverImageUrl?: string;
      content: string;
      tags: string[];
    };
  } {
    return {
      req: {
        title: "",
        description: "",
        content: "",
        tags: [],
      },
    };
  },
  actions: {
    async reset() {
      this.req = {
        title: "",
        description: "",
        content: "",
        tags: [],
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

        return true;
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

        return true;
      } catch (err) {
        notificationStore.alert(err as any);
      }
    },
    async delete() {
      const notificationStore = useNotificationStore();
      try {
        const { mutate } = useDeletePostMutation();
        const res = await mutate({
          id: this.req.id!,
        });

        if (!res?.data.deletePost) {
          throw "terjadi kesalahan";
        }

        notificationStore.alert("tulisan berhasil dihapus", "success");

        return true;
      } catch (err) {
        notificationStore.alert(err as any);
      }
    },
  },
});
