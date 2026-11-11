import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DiaSemana } from "../types/mochila";
import { EditarMaterialesScreen } from "../screens/EditarMaterialesScreen";
import { HorarioScreen } from "../screens/HorarioScreen";
import { MochilaScreen } from "../screens/MochilaScreen";

export type RootStackParamList = {
  MainTabs: undefined;
  EditarMateriales: { diaSeleccionado: DiaSemana };
};

export type MainTabParamList = {
  Mochila: undefined;
  Horario: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#4F46E5",
      tabBarInactiveTintColor: "#94A3B8",
      tabBarLabelStyle: { fontWeight: "600" },
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={route.name === "Mochila" ? "bag-handle-outline" : "calendar-outline"} color={color} size={size} />
      ),
    })}>
      <Tabs.Screen component={MochilaScreen} name="Mochila" options={{ title: "Mi Mochila" }} />
      <Tabs.Screen component={HorarioScreen} name="Horario" options={{ title: "Horario" }} />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={MainTabs} name="MainTabs" options={{ headerShown: false }} />
        <Stack.Screen component={EditarMaterialesScreen} name="EditarMateriales" options={{ title: "Gestionar Materiales", presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
