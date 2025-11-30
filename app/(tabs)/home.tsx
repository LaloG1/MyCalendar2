import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  // Animaciones
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      {/* Bienvenida */}
      <Text style={styles.title}>¡Bienvenido!</Text>

      {/* Botones de Dashboard */}
      {/* Primera fila: Calendario / Reportes */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() => router.push("/calendar")}
        >
          <Text style={styles.cardText}>Calendario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() => router.push("/reports")}
        >
          <Text style={styles.cardText}>Reportes</Text>
        </TouchableOpacity>
      </View>

      {/* Segunda fila: Empleados */}
      <View style={styles.rowCenter}>
        <TouchableOpacity
          style={styles.cardBtnSingle}
          onPress={() => router.push("/employees")}
        >
          <Text style={styles.cardText}>Empleados</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      {/* Footer fijo abajo */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 20,
    borderColor: "#fff",
    borderWidth: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },

  dashboard: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  cardBtn: {
    backgroundColor: "#4e73df",
    paddingVertical: 20,
    borderRadius: 15,
    width: "48%",
    alignItems: "center",
  },

  cardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  logoutBtn: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: "70%",
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },

  cardBtnSingle: {
    backgroundColor: "#4e73df",
    paddingVertical: 20,
    borderRadius: 15,
    width: "70%", // más grande en el centro
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
});
