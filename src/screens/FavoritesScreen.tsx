import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favorites");
      if (jsonValue) {
        const favsArray = JSON.parse(jsonValue);
        setFavorites(favsArray.reverse());
      }
    } catch (e) {
      console.log("Erro ao carregar favoritos:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const renderBook = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("IndividualBook", { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Livros Favoritos</Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(i) => i.id}
          renderItem={renderBook}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      ) : (
        <Text style={styles.empty}>Nenhum favorito ainda.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3CC", padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    width: "48%",
    height: 180,
    alignItems: "center",
    elevation: 2,
  },
  cover: { width: 100, height: 100, borderRadius: 8 },
  bookTitle: { fontWeight: "bold", marginTop: 8, fontSize: 14 },
  bookAuthor: { color: "#666", fontSize: 12 },
  empty: { fontSize: 16, color: "#666", textAlign: "center", marginTop: 40 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, marginTop: 40 },
});
