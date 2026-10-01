import { Text, View } from "react-native";

export default function EtiquetaNivel({ nivel }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}> {nivel} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
  },
  texto: { fontSize: 9, fontWeight: "600", letterSpacing: 0.5 },
});
