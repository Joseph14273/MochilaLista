import { Stack } from "expo-router";
import { MochilaProvider } from "../context/MochilaContext";

export default function RootLayout() {
  return (
    <MochilaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="editar-materiales" options={{ title: "Gestionar Materiales", presentation: "modal" }} />
      </Stack>
    </MochilaProvider>
  );
}
