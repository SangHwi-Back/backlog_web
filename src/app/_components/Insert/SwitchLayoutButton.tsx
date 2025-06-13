'use client';

interface SwitchLayoutButtonProps {
  isVerticalLayout: boolean;
  onClick: () => void;
}

export const SwitchLayoutButton = ({ isVerticalLayout, onClick }: SwitchLayoutButtonProps) => {
  const SwitchIcon = () => {
    return (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  };

  return (
    <div className="flex justify-end mb-4">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 hover:cursor-pointer"
      >
        <SwitchIcon />
        {isVerticalLayout ? 'Switch to Horizontal Layout' : 'Switch to Vertical Layout'}
      </button>
    </div>
  );
}; 