'use client';

interface CategoryAddButtonProps {
  onClick: () => void;
}

export const CategoryAddButton = ({ onClick }: CategoryAddButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 hover:cursor-pointer"
    >
      Add
    </button>
  );
}; 