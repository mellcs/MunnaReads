import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Shelf({ navigation }: any) {
  const [books, setBooks] = useState<any[]>([]);

  const loadBooks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@books");
      if (jsonValue) {
        const booksArray = JSON.parse(jsonValue);
        const sortedBooks = [...booksArray].reverse(); 
        setBooks(sortedBooks);
      }
    } catch (e) {
      console.log("Erro ao carregar livros:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadBooks();
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
      <Text style={styles.header}>Estante</Text>

      {books.length > 0 ? (
        <FlatList
          data={books}
          keyExtractor={(i) => i.id}
          renderItem={renderBook}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      ) : (
        <Text style={styles.empty}>Nenhum livro adicionado ainda.</Text>
      )}

      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Quotes" })}>
          <Ionicons name="star-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "MainScreen" })}>
          <Ionicons name="book-outline" size={28} color="#FFD18C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Profile" })}>
          <Ionicons name="person-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
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
  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    paddingBottom: 60
  },
});
