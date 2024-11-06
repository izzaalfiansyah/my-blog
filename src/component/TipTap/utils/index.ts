import { Editor } from "@tiptap/vue-3";

export function getTopNode(editor: Editor, node: Node | undefined = undefined) {
  const anchor = editor.state.selection.$anchor;
  const view = editor.view.domAtPos(anchor.pos);

  if (!node) {
    node = view.node;
  }

  if (!node.parentElement?.classList.contains("tiptap")) {
    return getTopNode(editor, node.parentNode!);
  }

  return node;
}

export function getMenuCoordinates(editor: Editor): DOMRectReadOnly {
  let node = getTopNode(editor);

  const rect = (node as any).getBoundingClientRect();

  return rect;
}
