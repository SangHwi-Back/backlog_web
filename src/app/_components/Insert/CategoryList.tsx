'use client';

interface CategoryListProps {
  categories: string[];
  onRemoveCategory: (category: string) => void;
}

export const CategoryList = ({ categories, onRemoveCategory }: CategoryListProps) => {
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
            onClick={() => onRemoveCategory(category)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}; 