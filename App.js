import {
  View,
  Text,
  FlatList,
  SectionList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { useState, useMemo } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [refreshing, setRefreshing] = useState(false);
  const [numColumns, setNumColumns] = useState(1);
  const [sort, setSort] = useState("");
  const [isSection, setIsSection] = useState(false);

  const categories = [
    "Semua",
    "Bouquet",
    "Romantis",
    "Elegan",
    "Ceria",
    "Aromatik",
    "Tanaman",
    "Dekorasi",
  ];

  const filtered = useMemo(() => {
    let data = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "Semua") {
      data = data.filter((p) => p.category === category);
    }

   if (sort === "murah") data.sort((a, b) => b.price - a.price);
if (sort === "mahal") data.sort((a, b) => a.price - b.price);
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating);

    return data;
  }, [search, category, sort]);

  const sectionData = useMemo(() => {
    const grouped = {};
    filtered.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    return Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));
  }, [filtered]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>
        🌸 Yumii Flowers ({filtered.length})
      </Text>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Cari bunga..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1 }}
        />
        {search !== "" && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* SORT (CHIP STYLE) */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setSort("murah")}
          style={[styles.chip, sort === "murah" && styles.activeChip]}
        >
          <Text style={sort === "murah" && styles.activeText}>
            ↑ Harga
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSort("mahal")}
          style={[styles.chip, sort === "mahal" && styles.activeChip]}
        >
          <Text style={sort === "mahal" && styles.activeText}>
            ↓ Harga
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSort("")}
          style={[styles.chip, sort === "" && styles.activeChip]}
        >
          <Text style={sort === "" && styles.activeText}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>

      {/* FILTER */}
      <View style={styles.row}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.chip,
              category === cat && styles.activeChip,
            ]}
          >
            <Text style={category === cat && styles.activeText}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TOGGLE GRID */}
      <TouchableOpacity onPress={() => setNumColumns(numColumns === 1 ? 2 : 1)}>
        <Text style={styles.toggle}>Toggle Grid</Text>
      </TouchableOpacity>

      {/* TOGGLE SECTION */}
      <TouchableOpacity onPress={() => setIsSection(!isSection)}>
        <Text style={styles.toggle}>
          {isSection ? "Mode List" : "Mode Section"}
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      {isSection ? (
        <SectionList
          sections={sectionData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={Empty}
        />
      ) : (
        <FlatList
          data={filtered}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={Empty}
        />
      )}
    </View>
  );
}

const Empty = () => (
  <View style={{ alignItems: "center", marginTop: 40 }}>
    <Text style={{ fontSize: 40 }}>🌼</Text>
    <Text>Bunga tidak ditemukan</Text>
    <Text>Coba kata lain</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff0f5",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  searchBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
    margin: 4,
  },

  activeChip: {
    backgroundColor: "#e91e63",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  toggle: {
    textAlign: "center",
    marginBottom: 10,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
