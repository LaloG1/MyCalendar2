import { Ionicons } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirección si NO hay usuario
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [loading, user]);

  // Pantalla de carga mientras Firebase valida sesión
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ⬇️ Aquí regresan las Tabs
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendario",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-number-outline" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reportes",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="clipboard-notes" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="employees"
        options={{
          title: "Empleados",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
