import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMochila } from "../context/MochilaContext";
import { DiaSemana } from "../types/mochila";

export function EditarMaterialesScreen() {
  const params = useLocalSearchParams<{ diaSeleccionado?: string }>();
  const diaSeleccionado = (params.diaSeleccionado ?? "Lunes") as DiaSemana;
  const { datos, agregarMaterial, eliminarMaterial } = useMochila();
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const materiales = useMemo(() => datos[diaSeleccionado].flatMap((item) => item.materiales), [datos, diaSeleccionado]);

  const agregar = () => {
    if (!nombre.trim() || !materia.trim()) return;
    agregarMaterial(diaSeleccionado, nombre, materia);
    setNombre("");
    setMateria("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <Text style={styles.subtitulo}>Añade lo que necesitas llevar el {diaSeleccionado}.</Text>
          <Text style={styles.label}>Material</Text>
          <TextInput onChangeText={setNombre} placeholder="Ej. Cuaderno de dibujo" placeholderTextColor="#94A3B8" style={styles.input} value={nombre} />
          <Text style={styles.label}>Materia</Text>
          <TextInput onChangeText={setMateria} placeholder="Ej. Arte" placeholderTextColor="#94A3B8" style={styles.input} value={materia} />
          <Pressable disabled={!nombre.trim() || !materia.trim()} onPress={agregar} style={[styles.boton, (!nombre.trim() || !materia.trim()) && styles.botonDeshabilitado]}>
            <Ionicons color="#FFFFFF" name="add-circle-outline" size={20} />
            <Text style={styles.botonTexto}>Agregar a la mochila</Text>
          </Pressable>
          <Text style={styles.tituloLista}>Materiales actuales</Text>
          {materiales.map((item) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.itemContenido}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemMateria}>{item.materia}</Text>
              </View>
              <Pressable accessibilityLabel={`Eliminar ${item.nombre}`} onPress={() => eliminarMaterial(diaSeleccionado, item.id)} style={styles.eliminar}>
                <Ionicons color="#EF4444" name="trash-outline" size={20} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: "#F8FAFC", flex: 1 },
  flex: { flex: 1 },
  contenido: { padding: 20 },
  subtitulo: { color: "#64748B", fontSize: 15, lineHeight: 22, marginBottom: 24 },
  label: { color: "#0F172A", fontSize: 14, fontWeight: "700", marginBottom: 8 },
  input: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 12, borderWidth: 1, color: "#0F172A", fontSize: 15, marginBottom: 18, padding: 14 },
  boton: { alignItems: "center", backgroundColor: "#4F46E5", borderRadius: 12, flexDirection: "row", gap: 8, justifyContent: "center", padding: 15 },
  botonDeshabilitado: { opacity: 0.5 },
  botonTexto: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  tituloLista: { color: "#0F172A", fontSize: 18, fontWeight: "800", marginBottom: 12, marginTop: 30 },
  item: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 12, borderWidth: 1, flexDirection: "row", marginBottom: 10, padding: 14 },
  itemContenido: { flex: 1 },
  itemNombre: { color: "#0F172A", fontSize: 15, fontWeight: "600" },
  itemMateria: { color: "#64748B", fontSize: 12, marginTop: 3 },
  eliminar: { padding: 6 },
});
