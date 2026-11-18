import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import * as Haptics from "expo-haptics";
import { DAYS, Day } from "../types";

type DaySelectorProps = {
  selectedDay: Day;
  onSelectDay: (day: Day) => void;
  dark?: boolean;
};

export function DaySelector({ selectedDay, onSelectDay, dark = false }: DaySelectorProps) {
  const surface = dark ? "#18312E" : "#FFFDF8";
  const border = dark ? "#2C4641" : "#E5DDCF";
  const text = dark ? "#ADC1BB" : "#71827E";

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
            onPress={() => {
              void Haptics.selectionAsync();
              onSelectDay(day);
            }}
            style={[
              styles.button,
              { backgroundColor: surface, borderColor: border },
              isSelected && styles.selectedButton,
            ]}
          >
            <Text style={[styles.text, { color: text }, isSelected && styles.selectedText]}>{day}</Text>
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
    borderColor: "#E5DDCF",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedButton: {
    backgroundColor: "#F26B4A",
    borderColor: "#F26B4A",
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
