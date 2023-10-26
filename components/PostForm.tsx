"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { useEditor } from "@tiptap/react";

const PostForm = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      Highlight,
      Underline,
      Link.configure({
        protocols: ["ftp", "mailto"],
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 underline",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image.configure({
        HTMLAttributes: {
          class: "w-[100px] h-[100px]",
        },
        allowBase64: true,
      }),
    ],
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          attrs: { textAlign: "left" },
        },
      ],
    },
    autofocus: true,
    editable: true,
    injectCSS: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create post</CardTitle>
        <CardDescription>Create new post now</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                className="focus-visible:ring-transparent "
                placeholder="Name of your project"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="">Content</Label>
              <Tiptap editor={editor} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default PostForm;
