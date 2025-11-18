import { StyleSheet, Text, View, useColorScheme, } from "react-native";

export default function CalendarScreen() {
    const theme = useColorScheme(); // "dark" | "light"
    const isDark = theme === "dark";
  return (
    <View
          style={[
            styles.container,
            { backgroundColor: isDark ? "#121212" : "#f2f2f2" },
          ]}
        >
      <Text style={styles.text}>Aquí estará el Calendario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
