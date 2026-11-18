import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { SchoolItem } from "../types";

type SchoolItemRowProps = {
  item: SchoolItem;
  checked: boolean;
  onToggle: (itemId: string) => void;
  dark: boolean;
};

export function SchoolItemRow({ item, checked, onToggle, dark }: SchoolItemRowProps) {
  const colors = dark
    ? { surface: "#18312E", border: "#2C4641", text: "#F7F2E8", muted: "#ADC1BB", checked: "#28433E" }
    : { surface: "#FFFDF8", border: "#E5DDCF", text: "#17332F", muted: "#71827E", checked: "#EAF0DD" };

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => {
        void Haptics.selectionAsync();
        onToggle(item.id);
      }}
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: checked ? "#A8C686" : colors.border },
        checked && { backgroundColor: colors.checked },
      ]}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox, !checked && { borderColor: colors.muted }]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }, checked && styles.checkedName]}>{item.name}</Text>
        <Text style={[styles.subject, { color: colors.muted }]}>{item.subject}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5DDCF",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    padding: 16,
  },
  checkedContainer: {
    backgroundColor: "#F0F3FF",
    borderColor: "#B8C4FF",
  },
  checkbox: {
    alignItems: "center",
    borderColor: "#C9D0DF",
    borderRadius: 7,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  checkedBox: {
    backgroundColor: "#F26B4A",
    borderColor: "#F26B4A",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    color: "#17332F",
    fontSize: 16,
    fontWeight: "600",
  },
  checkedName: {
    textDecorationLine: "line-through",
  },
  subject: {
    color: "#71827E",
    fontSize: 13,
    marginTop: 4,
  },
});
