'use client';

import GrayRoundedSearchTextField from "./GrayRoundedSearchTextField";
import { useDispatch, useSelector } from "react-redux";
import { setProgrammingCategory, setToastData } from "@/app/store/mainSlice";
import styles from './mainTopArea.module.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import SubMenuBar from './SubMenuBar';
import UtilityIconsWithText, { State } from './UtilityIconsWithText';

/**
 * MainTopArea component serves as the main navigation and search area
 * at the top of the application. It includes:
 * - Search field
 * - Category navigation
 * - Utility buttons (Write, Filter, Sort)
 */
export default function MainTopArea() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get the current category from Redux store
  const currentCategory = useSelector((state: RootState) => state.main).selectedProgrammingCategory;

  // State for filter and sort buttons
  const [filterState, setFilterState] = useState<State>(State.off);
  const [sortState, setSortState] = useState<State>(State.off);

  /**
   * Handle filter button click
   * Toggles filter state and navigates to menu page
   */
  const handleFilterClick = () => {
    setFilterState(State.toggled(filterState));
    router.push('/menu');
  };

  /**
   * Handle sort button click
   * Toggles sort state and shows a toast notification
   */
  const handleSortClick = () => {
    setSortState(State.toggled(sortState));
    dispatch(setToastData({ title: 'Test Title', message: 'Test Message' }));
  };

  /**
   * Handle insert/write button click
   * Navigates to the insert page
   */
  const handleInsertClick = () => {
    router.push('/insert');
  }

  /**
   * Handle category selection
   * Updates the selected category in Redux and navigates to the corresponding page
   * @param category - The index of the selected category
   */
  const handleCategoryClick = (category: number) => {
    dispatch(setProgrammingCategory(category));
    router.push(`/query-content/${category}`);
  }

  return (
    <div className={`${styles.background} ${styles.backgroundBetween}`}>
      <GrayRoundedSearchTextField placeholder={'검색'}/>
      <SubMenuBar
        currentCategory={currentCategory}
        handleCategoryClick={handleCategoryClick}
      />
      <UtilityIconsWithText
        state={{filterState, sortState}}
        onChange={{
          onInsert: handleInsertClick,
          onFilter: handleFilterClick,
          onSort: handleSortClick
        }}
      />
    </div>
  );
}
