<script lang="ts" setup>
import "./TipTap.scss";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import FloatingMenu from "@tiptap/extension-floating-menu";
import {
  EditorContent,
  FloatingMenu as FloatingMenuContent,
  Editor,
} from "@tiptap/vue-3";
import { NodeSelection } from "@tiptap/pm/state";
import { useAuthStore } from "../../stores/auth-store";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Dropcursor from "@tiptap/extension-dropcursor";
import { getMenuCoordinates, getTopNode } from "./utils";
import SlashMenu from "./component/SlashMenu.vue";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
const authStore = useAuthStore();

const editor = ref<Editor>();

function shouldShowSlashMenu() {
  const currentTopNode = getTopNode(editor.value!);
  const text = currentTopNode.textContent;

  if (text && text.length <= 1) {
    return text[0] == "/";
  }

  return false;
}

function handleDragStart(e: DragEvent) {
  const { state, view } = editor.value!;
  const anchor = state.selection.$anchor;

  view.dispatch(
    state.tr.setSelection(NodeSelection.create(state.doc, anchor.before(1)))
  );

  const selectedNode = document.querySelector(".ProseMirror-selectednode")!;
  e.dataTransfer?.setData("text/html", selectedNode.outerHTML!);
  e.dataTransfer?.setDragImage(selectedNode, 0, 0);
}

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      FloatingMenu,
      Dropcursor,
      Placeholder.configure({
        placeholder: "Ketikkan sesuatu atau '/' untuk membuat perintah...",
      }),
    ],
    content: props.modelValue,
    onUpdate({ editor }) {
      emit("update:modelValue", editor.getHTML());
    },
    editable: !!authStore.user,
  });

  editor.value?.commands.focus();
});

watch(
  () => authStore.user,
  (val) => {
    editor.value?.setEditable(!!val);
    editor.value?.commands.focus();
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <template v-if="!!editor">
    <floating-menu-content
      :editor="editor"
      :should-show="() => true"
      :tippy-options="{
        placement: 'left-start',
        getReferenceClientRect: () => getMenuCoordinates(editor!),
      }"
    >
      <div
        class="cursor-grab bg-gray-100 rounded py-1 px-0.5"
        draggable="true"
        @dragstart="handleDragStart"
      >
        <div class="i-mdi:drag text-black size-4"></div>
      </div>
    </floating-menu-content>

    <floating-menu-content
      :editor="editor"
      :should-show="shouldShowSlashMenu"
      :tippy-options="{
        placement: 'left-start',
      }"
    >
      <slash-menu :editor="editor"></slash-menu>
    </floating-menu-content>
    <editor-content :editor="editor"></editor-content>
  </template>
</template>
