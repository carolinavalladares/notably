"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

interface IProps {
  content: string;
}

const Display = ({ content }: IProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};

export default Display;
