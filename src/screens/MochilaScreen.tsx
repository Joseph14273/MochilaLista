import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BarraProgreso } from "../components/BarraProgreso";
import { ItemMaterial } from "../components/ItemMaterial";
import { DIAS_SEMANA } from "../data/datosIniciales";
import { useMochila } from "../context/MochilaContext";
import { DiaSemana } from "../types/mochila";

export function MochilaScreen() {
  const router = useRouter();
  const [diaSeleccionado, setDiaSeleccionado] = useState<DiaSemana>("Lunes");
  const { cargando, materialesDeDia, alternarMaterial, reiniciarDia } = useMochila();
  const materiales = useMemo(() => materialesDeDia(diaSeleccionado), [materialesDeDia, diaSeleccionado]);
  const completados = materiales.filter((item) => item.completado).length;

  if (cargando) {
    return <View style={styles.cargando}><ActivityIndicator color="#4F46E5" size="large" /></View>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.lista}
        data={materiales}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <View style={styles.tituloFila}>
              <View>
                <Text style={styles.saludo}>¡Hola! 👋</Text>
                <Text style={styles.titulo}>Prepara tu mochila</Text>
              </View>
              <Pressable onPress={() => router.push({ pathname: "/editar-materiales", params: { diaSeleccionado } })} style={styles.editar}>
                <Ionicons color="#4F46E5" name="create-outline" size={22} />
              </Pressable>
            </View>
            <FlatList
              contentContainerStyle={styles.dias}
              data={DIAS_SEMANA}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable onPress={() => setDiaSeleccionado(item)} style={[styles.dia, item === diaSeleccionado && styles.diaActivo]}>
                  <Text style={[styles.diaTexto, item === diaSeleccionado && styles.diaTextoActivo]}>{item.slice(0, 3)}</Text>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />
            <BarraProgreso completados={completados} total={materiales.length} />
            <View style={styles.seccionFila}>
              <Text style={styles.seccionTitulo}>Materiales del {diaSeleccionado}</Text>
              <Pressable onPress={() => reiniciarDia(diaSeleccionado)}>
                <Text style={styles.desmarcar}>Desmarcar todos</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => <ItemMaterial item={item} onToggle={() => alternarMaterial(diaSeleccionado, item.id)} />}
        ListEmptyComponent={<Text style={styles.vacio}>No hay materiales para este día.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: "#F8FAFC", flex: 1 },
  lista: { padding: 20, paddingBottom: 30 },
  cargando: { alignItems: "center", backgroundColor: "#F8FAFC", flex: 1, justifyContent: "center" },
  tituloFila: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 22 },
  saludo: { color: "#64748B", fontSize: 15 },
  titulo: { color: "#0F172A", fontSize: 26, fontWeight: "800", marginTop: 3 },
  editar: { alignItems: "center", backgroundColor: "#EEF2FF", borderRadius: 13, height: 46, justifyContent: "center", width: 46 },
  dias: { gap: 10, paddingBottom: 18 },
  dia: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 12, borderWidth: 1, paddingHorizontal: 17, paddingVertical: 11 },
  diaActivo: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  diaTexto: { color: "#64748B", fontSize: 14, fontWeight: "700" },
  diaTextoActivo: { color: "#FFFFFF" },
  seccionFila: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 14, marginTop: 25 },
  seccionTitulo: { color: "#0F172A", fontSize: 17, fontWeight: "800" },
  desmarcar: { color: "#4F46E5", fontSize: 12, fontWeight: "700" },
  vacio: { color: "#64748B", paddingVertical: 30, textAlign: "center" },
});
