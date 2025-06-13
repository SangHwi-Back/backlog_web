'use client';

import { InsertParam, InsertRow } from "../lib/data";
import { useRef, useActionState, useEffect, useState } from 'react';
import Form from "next/form";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useRouter } from 'next/navigation';
import { markdownPreviewStyles } from "./(style)/markdownPreviewStyles";

export default function Page() {
  const router = useRouter();
  const initialState: InsertParam = { message: null, errors: {} };
  const [_, dispatch] = useActionState(InsertRow, initialState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [contents, setContents] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isVerticalLayout, setIsVerticalLayout] = useState(true);

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

  const HandleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const HandleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const BackButton = () => {
    return (
      <button className="flex items-center text-gray-600 hover:text-gray-900 hover:cursor-pointer" onClick={() => router.back()}>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back</span>
      </button>
    )
  }

  const SaveDraftButton = () => {
    return (
      <button className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center hover:cursor-pointer">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Save Draft
      </button>
    )
  }

  const PublishButton = () => {
    return (
      <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 hover:cursor-pointer">
        Publish
      </button>
    )
  }

  const TitleLabel = ({ text }: { text: string }) => {
    return (
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="inline-block bg-gray-900 text-white px-3 py-1 rounded-md mr-2 font-bold">{text}</span>
      </h2>
    )
  }

  const CategoryAddButton = () => {
    return (
      <button
        type="button"
        onClick={HandleAddCategory}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 hover:cursor-pointer"
      >
        Add
      </button>
    )
  }

  const SwitchLayoutButton = () => {
    const SwitchIcon = () => {
      return (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    }

    return (
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => setIsVerticalLayout(!isVerticalLayout)}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 hover:cursor-pointer"
        >
          <SwitchIcon />
          {isVerticalLayout ? 'Switch to Horizontal Layout' : 'Switch to Vertical Layout'}
        </button>
      </div>
    )
  }

  const CategoryList = () => {
    return (
      <div className="flex flex-wrap gap-2 mb-2">
        {categories.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
          >
            {category}
            <button
              type="button"
              onClick={() => HandleRemoveCategory(category)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    )
  }

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

        <Form action={dispatch} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <input
              name="title"
              className="w-full text-3xl font-bold rounded-md border-gray-300 shadow-xs p-4 mb-4 focus:outline-none"
              id="title"
              type="text"
              placeholder="Write your title here..."
            />

            <div className="mb-6">
              <TitleLabel text="Categories" />
              <CategoryList />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm p-4 focus:border-gray-500 focus:ring-gray-500"
                  placeholder="Add a category..."
                />
                <CategoryAddButton />
              </div>
            </div>

            <div className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-row'} gap-6`}>
              <div className={`${isVerticalLayout ? 'w-full' : 'w-1/2'}`}>
                <div className="flex justify-between items-center">
                  <TitleLabel text="Content" />
                  <SwitchLayoutButton />
                </div>
                <textarea
                  ref={textAreaRef}
                  className="w-full h-[600px] p-4 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  id="description"
                  name="description"
                  placeholder="Write your story here... (Markdown supported)"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                />
              </div>
              <div className={`${isVerticalLayout ? 'w-full' : 'w-1/2'}`}>
                <TitleLabel text="Preview" />
                <div className="w-full h-[600px] p-4 border border-gray-300 rounded-md bg-white overflow-auto">
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
