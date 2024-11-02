'use client';

import {MouseEventHandler, ReactNode, useEffect, useRef, useState} from "react";
import styles from './SwappableGrid.module.scss';

interface SwappableGridProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export default function SwappableGrid<T>({ items, renderItem }: SwappableGridProps<T>) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!gridRef.current) {
      return;
    }
    setIsDragging(true);
    setStartX(event.pageX - gridRef.current.offsetLeft);
    setScrollLeft(gridRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !gridRef.current) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    gridRef.current.scrollLeft = scrollLeft - walk;
  };
  
  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      grid.addEventListener('mouseup', handleMouseUp);
      grid.addEventListener('mouseleave', handleMouseUp);
    }
    return () => {
      if (grid) {
        grid.removeEventListener('mousemove', handleMouseMove);
        grid.removeEventListener('mouseup', handleMouseUp);
        grid.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [isDragging, startX, scrollLeft]);
  
  return (
    <div className={styles.gridContainer} ref={gridRef} onMouseDown={handleMouseDown}>
      {items.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
};