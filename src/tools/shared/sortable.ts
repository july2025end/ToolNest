"use client";

import { useState, type DragEvent } from "react";

export const move = <T,>(list: T[], from: number, to: number) => {
  if (to < 0 || to >= list.length || from === to) return list;
  const next = list.slice();
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
};

/**
 * HTML5 drag-and-drop reordering. Pair with move-up/down buttons for keyboard and touch users.
 * Returns props to spread on each item.
 */
export function useDragSort<T>(list: T[], setList: (l: T[]) => void) {
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const itemProps = (i: number) => ({
    draggable: true,
    onDragStart: (e: DragEvent) => {
      setDragging(i);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(i));
    },
    onDragOver: (e: DragEvent) => {
      if (dragging === null) return;
      e.preventDefault();
      setOver(i);
    },
    onDrop: (e: DragEvent) => {
      if (dragging === null) return;
      e.preventDefault();
      setList(move(list, dragging, i));
      setDragging(null);
      setOver(null);
    },
    onDragEnd: () => {
      setDragging(null);
      setOver(null);
    },
    "data-over": over === i && dragging !== i ? "" : undefined,
  });
  return { itemProps, dragging };
}
