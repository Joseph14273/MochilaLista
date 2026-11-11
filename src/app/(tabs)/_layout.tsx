import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#4F46E5",
      tabBarInactiveTintColor: "#94A3B8",
      tabBarLabelStyle: { fontWeight: "600" },
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={route.name === "index" ? "bag-handle-outline" : "calendar-outline"} color={String(color)} size={size} />
      ),
    })}>
      <Tabs.Screen name="index" options={{ title: "Mi Mochila" }} />
      <Tabs.Screen name="horario" options={{ title: "Horario" }} />
    </Tabs>
  );
}
