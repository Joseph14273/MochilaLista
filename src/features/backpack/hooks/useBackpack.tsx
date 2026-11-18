import { useState } from "react";
import { Day } from "../types";

export function useBackpack(initialDay: Day = "Lunes") {
  const [selectedDay, setSelectedDay] = useState<Day>(initialDay);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setCheckedItems((current) => ({
      ...current,
      [itemId]: !current[itemId],
    }));
  };

  const resetWeek = () => setCheckedItems({});

  return {
    selectedDay,
    checkedItems,
    selectDay: setSelectedDay,
    toggleItem,
    resetWeek,
  };
}
