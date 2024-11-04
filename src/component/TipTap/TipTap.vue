<script lang="ts" setup>
import "./TipTap.css";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { useAuthStore } from "../../stores/auth-store";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
const authStore = useAuthStore();

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: "Ketikkan sesuatu...",
    }),
  ],
  content: props.modelValue,
  onUpdate({ editor }) {
    emit("update:modelValue", editor.getHTML());
  },
  editable: !!authStore.user,
});
</script>

<template>
  <editor-content :editor="editor"></editor-content>
</template>
