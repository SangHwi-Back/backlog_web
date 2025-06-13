'use client';

import { InsertParam, InsertRow } from "../lib/data";
import React, { useRef, useActionState, useEffect, useState } from 'react';
import Form from "next/form";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useRouter } from 'next/navigation';

// Add custom styles for MarkdownPreview
const markdownPreviewStyles = {
  '--color-canvas-default': 'transparent',
  '--color-canvas-subtle': 'transparent',
  '--color-border-default': '#d0d7de',
  '--color-border-muted': '#d0d7de',
  '--color-fg-default': '#24292f',
  '--color-fg-muted': '#57606a',
  '--color-neutral-muted': 'rgba(175, 184, 193, 0.2)',
  '--color-accent-fg': '#0969da',
  '--color-accent-emphasis': '#0969da',
  '--color-attention-subtle': 'rgba(234, 179, 8, 0.15)',
  '--color-danger-subtle': 'rgba(212, 72, 72, 0.15)',
  '--color-done-subtle': 'rgba(34, 134, 58, 0.15)',
  '--color-severe-subtle': 'rgba(234, 74, 170, 0.15)',
  '--color-success-subtle': 'rgba(34, 134, 58, 0.15)',
  '--color-ul': '#24292f',
  '--color-ol': '#24292f',
  '--color-table-border': '#d0d7de',
  '--color-table-header-bg': '#f6f8fa',
  '--color-table-row-bg': 'transparent',
  '--color-table-row-bg-hover': '#f6f8fa',
  'color': 'black',
  '--md-color-ul': '#24292f',
  '--md-color-ol': '#24292f',
  '--md-color-li': '#24292f',
  '--md-color-li-bg': 'transparent',
  '--md-color-li-border': '#d0d7de',
  '--md-color-li-hover': '#f6f8fa',
  '--md-color-li-hover-bg': '#f6f8fa',
  '--md-color-li-hover-border': '#d0d7de',
} as React.CSSProperties;

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

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-900" onClick={() => router.back()}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save Draft
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Publish
            </button>
          </div>
        </div>

        <Form action={dispatch} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <input
              name="title"
              className="w-full text-3xl font-bold border-none focus:ring-0 p-0 mb-4"
              id="title"
              type="text"
              placeholder="Write your title here..."
            />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="inline-block bg-gray-900 text-white px-3 py-1 rounded-md mr-2 font-bold">Categories</span>
              </h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  placeholder="Add a category..."
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setIsVerticalLayout(!isVerticalLayout)}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isVerticalLayout ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
                {isVerticalLayout ? 'Switch to Horizontal Layout' : 'Switch to Vertical Layout'}
              </button>
            </div>

            <div className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-row'} gap-6`}>
              <div className={`${isVerticalLayout ? 'w-full' : 'w-1/2'}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="inline-block bg-gray-900 text-white px-3 py-1 rounded-md mr-2 font-bold">Content</span>
                </h2>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="inline-block bg-gray-900 text-white px-3 py-1 rounded-md mr-2 font-bold">Preview</span>
                </h2>
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
