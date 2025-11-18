import { useRouter } from "expo-router"; // ✅ Añade esta importación
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const theme = useColorScheme(); // "dark" | "light"
  const router = useRouter(); // ✅ Añade esta línea

  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f2f2f2" },
      ]}
    >
      {/* Avatar */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      {/* Bienvenida */}
      <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>
        ¡Bienvenido!
      </Text>

      {/* Dashboard simple */}
      <View style={styles.dashboard}>
        <View
          style={[styles.card, isDark && styles.cardDark]}
          onTouchEnd={() => router.push("/calendar")} /* ✅ Ahora router está definido */
        >
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
            Calendario
          </Text>
        </View>

        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
            Reportes
          </Text>
        </View>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 30,
  },

  dashboard: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginHorizontal: 5,
    elevation: 3,
    justifyContent: "center", // ⬅ centra vertical
    alignItems: "center", // ⬅ centra horizontal
  },

  cardDark: {
    backgroundColor: "#1f1f1f",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },

  cardTitleDark: {
    color: "#ddd",
  },

  cardValue: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },

  cardValueDark: {
    color: "#fff",
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
});