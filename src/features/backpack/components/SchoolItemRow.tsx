import { Pressable, StyleSheet, Text, View } from "react-native";
import { SchoolItem } from "../types";

type SchoolItemRowProps = {
  item: SchoolItem;
  checked: boolean;
  onToggle: (itemId: string) => void;
};

export function SchoolItemRow({ item, checked, onToggle }: SchoolItemRowProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onToggle(item.id)}
      style={[styles.container, checked && styles.checkedContainer]}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, checked && styles.checkedName]}>{item.name}</Text>
        <Text style={styles.subject}>{item.subject}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E7F0",
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
    backgroundColor: "#5271FF",
    borderColor: "#5271FF",
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
    color: "#17213D",
    fontSize: 16,
    fontWeight: "600",
  },
  checkedName: {
    textDecorationLine: "line-through",
  },
  subject: {
    color: "#8992A8",
    fontSize: 13,
    marginTop: 4,
  },
});
