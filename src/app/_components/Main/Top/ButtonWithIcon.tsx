'use client';

import { FC } from 'react';
import Image from 'next/image';
import styles from './mainTopArea.module.css';

/**
 * Props for the ButtonWithIcon component
 */
interface ButtonWithIconProps {
  /** Source URL for the icon image */
  src: string;
  /** Text to display next to the icon */
  text: string;
  /** Click handler function */
  onClick: () => void;
  /** Optional alt text for the image (defaults to text prop) */
  alt?: string;
  /** Optional width for the icon (defaults to 20) */
  width?: number;
  /** Optional height for the icon (defaults to 20) */
  height?: number;
}

/**
 * ButtonWithIcon component displays a button with an icon and text
 * Used for action buttons in the UI
 */
const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  src,
  text,
  onClick,
  alt,
  width = 20,
  height = 20
}) => (
  <div className={styles.buttonArea} onClick={onClick}>
    <Image
      id="thumbnail"
      src={src}
      alt={alt || text}
      width={width}
      height={height}
    />
    <p id="title">{text}</p>
  </div>
);

export default ButtonWithIcon;
