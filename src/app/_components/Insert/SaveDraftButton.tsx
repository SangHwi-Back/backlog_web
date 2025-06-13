'use client';

export const SaveDraftButton = () => {
  return (
    <button className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center hover:cursor-pointer">
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      Save Draft
    </button>
  );
}; 