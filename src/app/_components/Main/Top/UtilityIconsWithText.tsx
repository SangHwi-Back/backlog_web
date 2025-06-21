'use client';

import { FC } from 'react';
import styles from './mainTopArea.module.css';
import ButtonWithIcon from './ButtonWithIcon';

/**
 * Enum for button states (on/off)
 */
export enum State {
  on, off
}

/**
 * Namespace with utility functions for State enum
 */
export namespace State {
  /**
   * Toggle the state between on and off
   */
  export function toggled(state: State): State {
    return state === State.on ? State.off : State.on;
  }
  
  /**
   * Get the appropriate filter icon based on state
   */
  export function filterImage(isOn: boolean): string {
    return isOn ? '/filterOn.svg' : '/filterOff.svg';
  }
  
  /**
   * Get the appropriate sort icon based on state
   */
  export function sortImage(isOn: boolean): string {
    return isOn ? '/sortOn.svg' : '/sortOff.svg';
  }
}

/**
 * Interface for the state of utility bar buttons
 */
export interface UtilityBarButtonState {
  filterState: State;
  sortState: State;
}

/**
 * Interface for the callbacks of utility bar buttons
 */
export interface UtilityBarButtonOnChange {
  onInsert: () => void;
  onFilter: () => void;
  onSort: () => void;
}

/**
 * Props for the UtilityIconsWithText component
 */
interface UtilityIconsWithTextProps {
  state: UtilityBarButtonState;
  onChange: UtilityBarButtonOnChange;
}

/**
 * UtilityIconsWithText component displays a group of utility buttons
 * with icons and text for actions like Write, Filter, and Sort
 */
const UtilityIconsWithText: FC<UtilityIconsWithTextProps> = ({ state, onChange }) => {
  const icons = [
    {
      icon: '/pencil.svg',
      text: 'Write',
      onClick: onChange.onInsert
    },
    {
      icon: State.filterImage(state.filterState === State.on),
      text: 'Filter',
      onClick: onChange.onFilter
    },
    {
      icon: State.sortImage(state.sortState === State.on),
      text: 'Sort',
      onClick: onChange.onSort
    }
  ];
  
  return (
    <div className={styles.buttonGroup}>
      {icons.map((icon) => (
        <ButtonWithIcon
          key={icon.text}
          src={icon.icon}
          text={icon.text}
          onClick={icon.onClick}
        />
      ))}
    </div>
  );
};

export default UtilityIconsWithText;
