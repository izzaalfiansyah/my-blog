import { defineStore } from "pinia";

type color = "success" | "danger";

export const useNotificationStore = defineStore("notification", {
  state(): {
    show: boolean;
    message?: string;
    color?: color;
  } {
    return {
      show: false,
    };
  },
  actions: {
    alert(message: string, color: color | undefined = undefined) {
      console.log(color);

      this.message = message;
      this.color = undefined;
      this.show = true;
    },
    reset() {
      this.message = undefined;
      this.color = undefined;
      this.show = false;
    },
  },
});
