import { Button, Text, View } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>Bienvenido!</Text>
      <Button title="Cerrar sesión" onPress={signOut} />
    </View>
  );
}
