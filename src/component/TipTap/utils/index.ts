import { Editor } from "@tiptap/vue-3";

export function getTopNode(editor: Editor, node: Node | undefined = undefined) {
  const anchor = editor.state.selection.$anchor;
  const view = editor.view.domAtPos(anchor.before(1) + anchor.depth + 1);

  if (!node) {
    node = view.node;
  }

  if (!node.parentElement?.classList.contains("tiptap")) {
    return getTopNode(editor, node.parentNode!);
  }

  return node;
}

export function getMenuCoordinates(editor: Editor): DOMRectReadOnly {
  const from = editor.view.state.selection.$from.before(1);
  const coords = editor.view.coordsAtPos(from);

  return new DOMRect(coords.left, coords.top, 0, 0);
}
