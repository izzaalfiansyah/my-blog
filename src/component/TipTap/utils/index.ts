import { Editor } from "@tiptap/vue-3";

export function getMenuCoordinates({ view, state }: Editor): DOMRectReadOnly {
  const from = state.selection.$anchor.before(1);
  const coords = view.coordsAtPos(from);

  return new DOMRect(coords.left, coords.top, 0, 0);
}

export function getSelectedNode() {
  const currentNode = document.querySelector(".ProseMirror-selectednode")!;

  return currentNode;
}
