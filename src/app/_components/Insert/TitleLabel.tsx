'use client';

interface TitleLabelProps {
  text: string;
}

export const TitleLabel = ({ text }: TitleLabelProps) => {
  return (
    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
      <span className="inline-block bg-gray-900 text-white px-3 py-1 rounded-md mr-2 font-bold">{text}</span>
    </h2>
  );
}; 