import { defineStore } from "pinia";
import { User } from "../type/user";

export const useAuthStore = defineStore("auth", {
  state(): {
    user: User | null;
  } {
    return {
      user: null,
    };
  },
});
