import { Editor } from "@tiptap/react";
import React, { useCallback } from "react";
import {
  Heading1,
  Heading2,
  Bold,
  Italic,
  Strikethrough,
  ListOrdered,
  List,
  Undo2,
  Redo2,
  Underline,
  Heading3,
  Heading4,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Image,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { BsParagraph } from "react-icons/bs";
import { Skeleton } from "./ui/skeleton";

const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (editor) {
    const addImage = useCallback(() => {
      editor
        .chain()
        .focus()
        .setImage({
          src: "https://source.unsplash.com/8xznAGy4HcY",
          alt: "A boring example image",
          title: "An example",
        })
        .run();
    }, [editor]);

    return (
      <div className="flex flex-wrap gap-2 mb-2">
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant={editor.isActive("paragraph") ? "secondary" : "ghost"}
          className={cn("p-2 rounded-full")}
        >
          <BsParagraph className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <Heading1 className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <Heading2 className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <Heading3 className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          variant={
            editor.isActive("heading", { level: 4 }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <Heading4 className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <Bold className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <Italic className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <Strikethrough className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <Underline className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <List className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <ListOrdered className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={
            editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <AlignLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          variant={
            editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <AlignCenter className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          variant={
            editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <AlignRight className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          variant={
            editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <AlignJustify className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
            } else {
              editor.commands.setLink({
                href: "https://example.com",
                target: "_blank",
              });
            }
          }}
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <Link className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          size="icon"
          onClick={addImage}
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          className="p-2 rounded-full"
        >
          <Image className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant={
            editor.can().chain().focus().undo().run() ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <Undo2 className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant={
            editor.can().chain().focus().redo().run() ? "secondary" : "ghost"
          }
          className="p-2 rounded-full"
        >
          <Redo2 className="h-5 w-5" />
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Skeleton className="rounded-full w-10 h-10" />
      <Skeleton className="rounded-full w-10 h-10" />
      <Skeleton className="rounded-full w-10 h-10" />
      <Skeleton className="rounded-full w-10 h-10" />
    </div>
  );
};

export default ToolBar;
