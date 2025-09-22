import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen({ navigation }: any) {
  const [books, setBooks] = useState<any[]>([]);

  const loadBooks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@books");
      if (jsonValue != null) {
        setBooks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log("Erro ao carregar livros:", e);
    }
  };

  const saveBooks = async (booksList: any) => {
    try {
      const jsonValue = JSON.stringify(booksList);
      await AsyncStorage.setItem("@books", jsonValue);
    } catch (e) {
      console.log("Erro ao salvar livros:", e);
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
      <Text style={styles.header}>MunnaReads</Text>
      <Text style={styles.subheader}>Últimos adicionados:</Text>

      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={[...books].reverse().slice(0, 2)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          renderItem={renderBook}
          contentContainerStyle={{ paddingVertical: 20 }}
        />

        <TouchableOpacity 
          style={styles.verMais} 
          onPress={() => navigation.navigate("Shelf")}
        >
          <Text style={styles.verMaisText}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3CC", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, marginTop: 40 },
  subheader: { fontSize: 16, marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    width: 140,
    height: 180,
    alignItems: "center",
    elevation: 2,
  },
  cover: { width: 100, height: 100, borderRadius: 8 },
  bookTitle: { fontWeight: "bold", marginTop: 8 },
  bookAuthor: { color: "#666" },
  verMais: {
    backgroundColor: "#FF6F91",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  verMaisText: { color: "#fff", fontWeight: "600" },
  addButton: {
    position: "absolute",
    bottom: 150, 
    alignSelf: "center",
    backgroundColor: "#FF6F91",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
