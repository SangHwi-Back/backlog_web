'use client';

import { InsertParam, InsertRow } from "../lib/data";
import { useRef, useActionState, useEffect, useState } from 'react';
import Form from "next/form";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useRouter } from 'next/navigation';
import { markdownPreviewStyles } from "./(style)/markdownPreviewStyles";
import { InsertBlogDTO, InsertBlogResponse } from "../lib/dto";
import { BackButton } from "../_components/Insert/BackButton";
import { SaveDraftButton } from "../_components/Insert/SaveDraftButton";
import { PublishButton } from "../_components/Insert/PublishButton";
import { TitleLabel } from "../_components/Insert/TitleLabel";
import { CategoryAddButton } from "../_components/Insert/CategoryAddButton";
import { SwitchLayoutButton } from "../_components/Insert/SwitchLayoutButton";
import { CategoryList } from "../_components/Insert/CategoryList";

export default function Page() {
  const router = useRouter();
  const initialState: InsertParam = { message: null, errors: {} };
  const [_, dispatch] = useActionState(InsertRow, initialState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [contents, setContents] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isVerticalLayout, setIsVerticalLayout] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const adjustHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();

    const textAreaElement = textAreaRef.current;
    if (textAreaElement) {
      textAreaElement.addEventListener('input', adjustHeight);
    }

    return () => {
      if (textAreaElement) {
        textAreaElement.removeEventListener('input', adjustHeight);
      }
    };
  }, []);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const blogData: InsertBlogDTO = {
      title,
      description: contents,
      categories,
      author: "Anonymous", // TODO: Replace with actual user
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0]
    };

    try {
      const response = await fetch('/api/blog/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const result: InsertBlogResponse = await response.json();

      if (result.success) {
        router.push(`/detail/${result.data?.key}`);
      } else {
        // Handle error
        console.error(result.error);
      }
    } catch (error) {
      console.error('Failed to submit blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <BackButton />
          <div className="flex items-center gap-4">
            <SaveDraftButton />
            <div className="h-6 w-px bg-gray-300"></div>
            <PublishButton />
          </div>
        </div>

        <Form action={dispatch} className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <input
              name="title"
              className="w-full text-3xl font-bold rounded-md border-gray-300 shadow-xs p-4 mb-4 focus:outline-none"
              id="title"
              type="text"
              placeholder="Write your title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="mb-6">
              <TitleLabel text="Categories" />
              <CategoryList categories={categories} onRemoveCategory={handleRemoveCategory} />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm p-4 focus:border-gray-500 focus:ring-gray-500"
                  placeholder="Add a category..."
                />
                <CategoryAddButton onClick={handleAddCategory} />
              </div>
            </div>

            <div className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-row'} gap-6`}>
              <div className={`${isVerticalLayout ? 'w-full' : 'w-1/2'}`}>
                <div className="flex justify-between items-center">
                  <TitleLabel text="Content" />
                  {isVerticalLayout &&
                    <SwitchLayoutButton
                      isVerticalLayout={isVerticalLayout}
                      onClick={() => setIsVerticalLayout(!isVerticalLayout)}
                    />
                  }
                </div>
                <textarea
                  ref={textAreaRef}
                  className={`w-full min-h-[${isVerticalLayout ? '300px' : '600px'}] p-4 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 resize-y`}
                  id="description"
                  name="description"
                  placeholder="Write your story here... (Markdown supported)"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                />
              </div>
              <div className={`${isVerticalLayout ? 'w-full' : 'w-1/2'}`}>
                <div className="flex justify-between items-center">
                  <TitleLabel text="Preview" />
                  {!isVerticalLayout &&
                    <SwitchLayoutButton
                      isVerticalLayout={isVerticalLayout}
                      onClick={() => setIsVerticalLayout(!isVerticalLayout)}
                    />
                  }
                </div>
                <div className={`w-full min-h-[${isVerticalLayout ? '300px' : '600px'}] p-4 border border-gray-300 rounded-md bg-white overflow-auto resize-y`}>
                  <MarkdownPreview source={contents} style={markdownPreviewStyles} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
