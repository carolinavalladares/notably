"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import useTranslation from "@/hooks/useTranslation";
import TRANSLATIONS from "@/CONSTS/translations";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import Underline from "@tiptap/extension-underline";

const Editor = () => {
  const { language } = useTranslation();

  let editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({
          placeholder: TRANSLATIONS[language].placeholders.post,
        }),
      ],
      autofocus: true,
      editorProps: {
        attributes: {
          class: "outline-none text-sm text-text-color pb-4",
        },
      },
    },
    [language]
  );

  return (
    <div>
      <div className="border-b border-border-color pb-2 mb-2">
        <button
          title={TRANSLATIONS[language].labels.bold}
          className={`p-2 rounded-sm  transition-all duration-150 ${
            editor?.isActive("bold")
              ? "bg-accent text-white "
              : "hover:bg-orange-300"
          } `}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold size={16} strokeWidth={1.75} />
        </button>
        <button
          title={TRANSLATIONS[language].labels.underline}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-sm   transition-all duration-150 ${
            editor?.isActive("underline")
              ? "bg-accent text-white "
              : "hover:bg-orange-300"
          } `}
        >
          <UnderlineIcon size={16} strokeWidth={1.75} />
        </button>
        <button
          title={TRANSLATIONS[language].labels.italic}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-sm  transition-all duration-150 ${
            editor?.isActive("italic")
              ? "bg-accent text-white "
              : "hover:bg-orange-300"
          } `}
        >
          <Italic size={16} strokeWidth={1.75} />
        </button>
      </div>
      <div className="px-2">
        <EditorContent spellCheck={false} editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
