<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";

const props = defineProps<{
  editor: Editor;
}>();

const items: Array<{
  text: string;
  command: () => void;
  icon: string;
}> = [
  {
    text: "Paragraf",
    icon: "i-mdi:format-paragraph",
    command: () => props.editor.chain().focus().setParagraph().run(),
  },
  {
    text: "Heading 1",
    icon: "i-mdi:format-header-1",
    command: () => props.editor.chain().focus().setHeading({ level: 1 }).run(),
  },
  {
    text: "Heading 2",
    icon: "i-mdi:format-header-2",
    command: () => props.editor.chain().focus().setHeading({ level: 2 }).run(),
  },
  {
    text: "Heading 3",
    icon: "i-mdi:format-header-3",
    command: () => props.editor.chain().focus().setHeading({ level: 3 }).run(),
  },
  {
    text: "Bullet List",
    icon: "i-mdi:format-list-bulleted",
    command: () => props.editor.chain().focus().toggleBulletList().run(),
  },
  {
    text: "Number List",
    icon: "i-mdi:format-list-numbered",
    command: () => props.editor.chain().focus().toggleOrderedList().run(),
  },
  {
    text: "Code",
    icon: "i-mdi:code-braces",
    command: () => props.editor.chain().focus().toggleCodeBlock().run(),
  },
];

function handleCommand(command: () => void) {
  command();

  props.editor.commands.command(({ state, tr }) => {
    const anchor = state.selection.$anchor;
    tr.insertText("", anchor.start(), anchor.end());
    return true;
  });

  props.editor.commands.focus();
}
</script>

<template>
  <v-card
    style="width: 240px; max-height: 300px"
    class="overflow-y-auto"
    elevation="1"
  >
    <!-- <v-list v-for="item in items">
      <template #prepend>
        <div
          class="w-12 h-12 border-solid border-1 border-gray-200 rounded flex items-center justify-center"
        >
          <div :class="'text-gray-500 size-8 ' + item.icon"></div>
        </div>
      </template>
      <v-list-item @click="handleCommand(item.command)">{{
        item.text
      }}</v-list-item>
    </v-list> -->
    <div class="space-y-1 p-2">
      <template v-for="item in items">
        <div
          class="rounded hover:bg-gray-100 transition flex items-center space-x-3 p-1 cursor-pointer"
          @click="handleCommand(item.command)"
        >
          <div
            class="w-12 h-12 border-solid border-1 border-gray-200 rounded flex items-center justify-center"
          >
            <div :class="'text-gray-500 size-8 ' + item.icon"></div>
          </div>
          <div class="text-sm">
            {{ item.text }}
          </div>
        </div>
      </template>
    </div>
  </v-card>
</template>
