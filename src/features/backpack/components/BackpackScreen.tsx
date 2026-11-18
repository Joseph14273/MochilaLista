import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { schoolItemsByDay } from "../data/schoolItems";
import { useBackpack } from "../hooks/useBackpack";
import { DaySelector } from "./DaySelector";
import { SchoolItemRow } from "./SchoolItemRow";

export function BackpackScreen() {
  const { checkedItems, selectedDay, selectDay, toggleItem } = useBackpack();
  const items = schoolItemsByDay[selectedDay];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>MochilaLista</Text>
        <Text style={styles.title}>Prepara tu mochila</Text>
        <Text style={styles.subtitle}>Selecciona un día y revisa tus materiales.</Text>

        <Text style={styles.sectionTitle}>Día de clases</Text>
        <DaySelector selectedDay={selectedDay} onSelectDay={selectDay} />

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Materiales del {selectedDay.toLowerCase()}</Text>
          <Text style={styles.itemCount}>{items.length} útiles</Text>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <SchoolItemRow
              key={item.id}
              item={item}
              checked={checkedItems[item.id] ?? false}
              onToggle={toggleItem}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F7F9FC",
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  eyebrow: {
    color: "#5271FF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: "#17213D",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  subtitle: {
    color: "#69738D",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  sectionTitle: {
    color: "#17213D",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
  },
  listHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemCount: {
    color: "#8992A8",
    fontSize: 14,
    marginTop: 30,
  },
  list: {
    gap: 12,
    marginTop: 16,
  },
});
