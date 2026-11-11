import { SafeAreaProvider } from "react-native-safe-area-context";
import { MochilaProvider } from "./src/context/MochilaContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <MochilaProvider>
        <AppNavigator />
      </MochilaProvider>
    </SafeAreaProvider>
  );
}
