"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface IProps {
  content: string;
}

const Display = ({ content }: IProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};

export default Display;
