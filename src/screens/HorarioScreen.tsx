import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMochila } from "../context/MochilaContext";
import { DIAS_SEMANA } from "../data/datosIniciales";
export function HorarioScreen() {
  const router = useRouter();
  const { datos } = useMochila();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo}>Horario semanal</Text>
        <Text style={styles.subtitulo}>Toca un día para preparar sus materiales.</Text>
        {DIAS_SEMANA.map((dia) => (
          <Pressable key={dia} onPress={() => router.push({ pathname: "/editar-materiales", params: { diaSeleccionado: dia } })} style={({ pressed }) => [styles.tarjeta, pressed && styles.presionado]}>
            <View style={styles.diaEncabezado}>
              <Text style={styles.dia}>{dia}</Text>
              <Text style={styles.preparar}>Preparar <Text style={styles.flecha}>›</Text></Text>
            </View>
            {datos[dia].map((materia) => (
              <View key={materia.id} style={styles.materia}>
                <Text style={styles.hora}>{materia.horaInicio}</Text>
                <View style={styles.punto} />
                <Text style={styles.nombreMateria}>{materia.nombre}</Text>
                <Text style={styles.horaFin}>{materia.horaFin}</Text>
              </View>
            ))}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: "#F8FAFC", flex: 1 },
  contenido: { padding: 20 },
  titulo: { color: "#0F172A", fontSize: 26, fontWeight: "800" },
  subtitulo: { color: "#64748B", fontSize: 15, marginBottom: 22, marginTop: 6 },
  tarjeta: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 16, borderWidth: 1, marginBottom: 14, padding: 16 },
  presionado: { opacity: 0.75 },
  diaEncabezado: { alignItems: "center", borderBottomColor: "#F1F5F9", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12 },
  dia: { color: "#0F172A", fontSize: 17, fontWeight: "800" },
  preparar: { color: "#4F46E5", fontSize: 12, fontWeight: "700" },
  flecha: { fontSize: 18 },
  materia: { alignItems: "center", flexDirection: "row", paddingVertical: 6 },
  hora: { color: "#64748B", fontSize: 12, width: 48 },
  punto: { backgroundColor: "#4F46E5", borderRadius: 4, height: 7, marginRight: 10, width: 7 },
  nombreMateria: { color: "#334155", flex: 1, fontSize: 14, fontWeight: "600" },
  horaFin: { color: "#94A3B8", fontSize: 12 },
});
