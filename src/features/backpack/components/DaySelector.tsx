import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { DAYS, Day } from "../types";

type DaySelectorProps = {
  selectedDay: Day;
  onSelectDay: (day: Day) => void;
};

export function DaySelector({ selectedDay, onSelectDay }: DaySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {DAYS.map((day) => {
        const isSelected = day === selectedDay;

        return (
          <Pressable
            key={day}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelectDay(day)}
            style={[styles.button, isSelected && styles.selectedButton]}
          >
            <Text style={[styles.text, isSelected && styles.selectedText]}>{day}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E7F0",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedButton: {
    backgroundColor: "#5271FF",
    borderColor: "#5271FF",
  },
  text: {
    color: "#69738D",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
