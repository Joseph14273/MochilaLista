import { StyleSheet, Text, View } from "react-native";

interface BarraProgresoProps {
  completados: number;
  total: number;
}

export function BarraProgreso({ completados, total }: BarraProgresoProps) {
  const porcentaje = total === 0 ? 0 : Math.round((completados / total) * 100);
  const lista = porcentaje === 100;
  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.etiqueta}>{lista ? "¡Mochila lista!" : "Progreso de hoy"}</Text>
        <Text style={[styles.porcentaje, lista && styles.porcentajeCompleto]}>{porcentaje}%</Text>
      </View>
      <View style={styles.fondo}>
        <View style={[styles.relleno, { width: `${porcentaje}%` }, lista && styles.rellenoCompleto]} />
      </View>
      <Text style={styles.detalle}>{completados} de {total} materiales guardados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 16, borderWidth: 1, padding: 16 },
  encabezado: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  etiqueta: { color: "#0F172A", fontSize: 16, fontWeight: "700" },
  porcentaje: { color: "#4F46E5", fontSize: 16, fontWeight: "800" },
  porcentajeCompleto: { color: "#10B981" },
  fondo: { backgroundColor: "#E2E8F0", borderRadius: 5, height: 9, overflow: "hidden" },
  relleno: { backgroundColor: "#4F46E5", borderRadius: 5, height: "100%" },
  rellenoCompleto: { backgroundColor: "#10B981" },
  detalle: { color: "#64748B", fontSize: 12, marginTop: 8 },
});
