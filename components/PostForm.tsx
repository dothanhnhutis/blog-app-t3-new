"use client";
import React, { useEffect, useState } from "react";
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
import slug from "slugify";

import { useEditor } from "@tiptap/react";
import { Check, ChevronsUpDown, ImagePlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

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

  const [data, setData] = useState<{
    thumnail: string;
    name: string;
    slug: string;
    category: string;
    content: string;
    userId: string;
  }>({
    thumnail: "",
    name: "",
    slug: "",
    category: "",
    content: "",
    userId: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, slug: slug(prev.name) }));
  }, [data.name]);

  const [editable, setEditable] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create post</CardTitle>
        <CardDescription>Create new post now</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid sm:grid-cols-3 sm:grid-rows-4  w-full gap-4">
            <Label
              htmlFor="file"
              className="sm:row-span-4 border-2 border-dashed w-full h-[200px] sm:h-full rounded-lg flex items-center justify-center cursor-pointer"
            >
              <div>
                <ImagePlusIcon className="w-14 h-14" />
                <p>Thumnail</p>
              </div>

              <input type="file" name="file" id="file" className="hidden" />
            </Label>
            <div className="sm:col-span-2 flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleOnchange}
                className="focus-visible:ring-transparent "
                placeholder="Name of your project"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                disabled={!editable}
                id="slug"
                name="slug"
                value={data.slug}
                onChange={handleOnchange}
                className="focus-visible:ring-transparent "
                placeholder="Name of your project"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="sm:col-span-2 flex flex-col space-y-1.5">
              <Label htmlFor="category">Author</Label>
              <Input
                id="category"
                name="category"
                value={data.category}
                onChange={handleOnchange}
                className="focus-visible:ring-transparent "
                placeholder="Name of your project"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 mt-4">
            <Label htmlFor="">Content</Label>
            <Tiptap editor={editor} />
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
