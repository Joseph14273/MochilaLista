import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialItem } from "../types/mochila";

interface ItemMaterialProps {
  item: MaterialItem;
  onToggle: () => void;
}

export function ItemMaterial({ item, onToggle }: ItemMaterialProps) {
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.tarjeta, pressed && styles.presionado]}>
      <View style={[styles.checkbox, item.completado && styles.checkboxActivo]}>
        {item.completado && <Ionicons color="#FFFFFF" name="checkmark" size={16} />}
      </View>
      <View style={styles.contenido}>
        <Text style={[styles.nombre, item.completado && styles.nombreCompletado]}>{item.nombre}</Text>
        <Text style={styles.materia}>{item.materia}</Text>
      </View>
      <Ionicons color="#94A3B8" name="chevron-forward" size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 14, borderWidth: 1, flexDirection: "row", marginBottom: 10, padding: 14 },
  presionado: { opacity: 0.75 },
  checkbox: { alignItems: "center", borderColor: "#CBD5E1", borderRadius: 7, borderWidth: 2, height: 25, justifyContent: "center", width: 25 },
  checkboxActivo: { backgroundColor: "#10B981", borderColor: "#10B981" },
  contenido: { flex: 1, marginLeft: 12 },
  nombre: { color: "#0F172A", fontSize: 15, fontWeight: "600" },
  nombreCompletado: { color: "#94A3B8", textDecorationLine: "line-through" },
  materia: { color: "#64748B", fontSize: 12, marginTop: 4 },
});
