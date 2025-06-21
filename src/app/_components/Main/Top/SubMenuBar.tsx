'use client';

import { FC } from 'react';
import styles from './mainTopArea.module.css';

/**
 * Props for the SubMenuBar component
 */
interface SubMenuBarProps {
  /** The currently selected category index */
  currentCategory: number;
  /** Callback function when a category is clicked */
  handleCategoryClick: (category: number) => void;
  /** Optional array of category names to display */
  categories?: string[];
}

/**
 * SubMenuBar component displays a horizontal menu of categories
 * and highlights the currently selected category
 */
const SubMenuBar: FC<SubMenuBarProps> = ({
  currentCategory,
  handleCategoryClick,
  categories = ['iOS', 'Web-FE'] // Default categories if none provided
}) => {
  return (
    <div className={styles.subMenuArea}>
      {categories.map((category, index) => (
        <p
          key={index}
          className={currentCategory === index ? styles.selected : styles.deselected}
          onClick={() => handleCategoryClick(index)}
        >
          {category}
        </p>
      ))}
    </div>
  );
};

export default SubMenuBar;
