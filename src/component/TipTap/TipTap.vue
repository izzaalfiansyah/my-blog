<script lang="ts" setup>
import "./TipTap.css";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);

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
});
</script>

<template>
  <editor-content :editor="editor"></editor-content>
</template>
