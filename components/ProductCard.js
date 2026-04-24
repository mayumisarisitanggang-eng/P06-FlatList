import { View, Text, StyleSheet } from "react-native";

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.image}>{item.image}</Text>

      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.category}>{item.category}</Text>

      <Text style={styles.price}>
        Rp {item.price.toLocaleString()}
      </Text>

      <Text style={styles.rating}>⭐ {item.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },

  image: { fontSize: 40 },

  name: { fontWeight: "bold", textAlign: "center" },

  category: { fontSize: 12, color: "gray" },

  price: { color: "#e91e63", fontWeight: "bold" },

  rating: { marginTop: 5 },
});