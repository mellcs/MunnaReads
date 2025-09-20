import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const books = [
  {
    id: "1",
    title: "Livro 1",
    author: "Autor",
    image: "https://via.placeholder.com/140x160.png?text=Livro+1",
  },
  {
    id: "2",
    title: "Livro 2",
    author: "Autor",
    image: "https://via.placeholder.com/140x160.png?text=Livro+2",
  },
];

export default function MainScreen({ navigation }: any) {
  const renderBook = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("BookDetails", { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estante</Text>
      <Text style={styles.subheader}>Últimos adicionados:</Text>

      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={renderBook}
        contentContainerStyle={{ paddingVertical: 40, paddingBottom :300 }}
      />

      <TouchableOpacity style={styles.verMais} onPress={() => navigation.navigate("Shelf")}>
        <Text style={styles.verMaisText}>Ver mais</Text>
      </TouchableOpacity>

      <View style={styles.addSection}>
        <Text style={styles.addLabel}>Adicionar livro</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* bottom tab visual - substitua por Tab Navigator quando quiser */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Quotes")}>
          <Ionicons name="star-outline" size={26} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
          <Ionicons name="book-outline" size={26} color="#C78A00" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    elevation: 2,
  },
  cover: { width: 10, height: 50, borderRadius: 8 },
  bookTitle: { fontWeight: "bold", marginTop: 8 },
  bookAuthor: { color: "#666" },
  verMais: {
    backgroundColor: "#FF6F91",
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  verMaisText: { color: "#fff", fontWeight: "600" },
  addSection: { alignItems: "center", marginTop: 40, marginBottom: 60 },
  addLabel: { fontWeight: "600", marginBottom: 10 },
  addButton: {
    backgroundColor: "#FF6F91",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
