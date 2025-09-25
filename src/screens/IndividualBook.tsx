import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndividualBook({ route, navigation }: any) {
  const { id } = route.params;
  const [book, setBook] = useState<any>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const screenWidth = Dimensions.get("window").width - 40;

  const favoriteBook = async () => {
    try {
        const favsJson = await AsyncStorage.getItem("@favorites");
        let favs = favsJson ? JSON.parse(favsJson) : [];

        const exists = favs.find((f: any) => f.id === book.id);

        if (exists) {
        favs = favs.filter((f: any) => f.id !== book.id);
      } else {
        favs.push(book);
      }

        await AsyncStorage.setItem("@favorites", JSON.stringify(favs));
        Alert.alert(
        "Favoritos",
        exists ? "Livro removido dos favoritos" : "Livro adicionado aos favoritos"
      );
    } catch (e) {
        console.log("Erro ao favoritar:", e);
      }
    };

useEffect(() => {
  const loadBook = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@books");
      if (jsonValue) {
        const books = JSON.parse(jsonValue);
        const found = books.find((b: any) => b.id === id);
          setBook(found);

        if (found?.image) {
            Image.getSize(found.image, (width, height) => {
              setImageSize({ width, height });
            });
          }
        }
      } catch (e) {
      console.log("Erro ao carregar livro:", e);
    }
    };
  loadBook();
}, [id]);

  const deleteBook = async () => {
    Alert.alert("Excluir livro", "Tem certeza que deseja excluir este livro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const jsonValue = await AsyncStorage.getItem("@books");
            const existingBooks = jsonValue != null ? JSON.parse(jsonValue) : [];
            const updatedBooks = existingBooks.filter((b: any) => b.id !== id);
            await AsyncStorage.setItem("@books", JSON.stringify(updatedBooks));

            navigation.navigate("Tabs", { screen: "MainScreen" });
          } catch (e) {
            console.log("Erro ao excluir livro:", e);
        }
        },
      },
    ]);
  };

  const editBook = () => {
    navigation.navigate("AddBook", { book });
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Carregando livro...</Text>
      </View>
    );
  }

 const imageHeight = imageSize ? (imageSize.height / imageSize.width) * screenWidth : 300; 

   return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {book.image && imageSize ? (
          <Image
            source={{ uri: book.image }}
            style={{
              width: screenWidth,
              height: imageHeight,
              borderRadius: 16,
              marginBottom: 20,
              alignSelf: "center",
             }}
          />
        ) : (
          <View
            style={{
              width: screenWidth,
              height: imageHeight,
              borderRadius: 16,
              marginBottom: 20,
              backgroundColor: "#FFF8E1", 
              alignSelf: "center",
             }}
           />
         )}

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.info}>
          <Text style={{ fontWeight: "bold" }}>Autor:</Text> {book.author}
        </Text>
        <Text style={styles.info}>
          <Text style={{ fontWeight: "bold" }}>Páginas:</Text> {book.pages}
        </Text>

        {book.quote ? (
          <Text style={styles.quote}>
             <Text style={{ fontWeight: "bold" }}>Citação:</Text> {book.quote}
           </Text>
         ) : (
          <Text style={styles.quote}>Nenhuma citação cadastrada</Text>
         )}

         {book.review ? (
          <Text style={styles.review}>
             <Text style={{ fontWeight: "bold" }}>Resenha:</Text> {book.review}
          </Text>
        ) : (
          <Text style={styles.quote}>Nenhuma resenha cadastrada</Text>
        )}
       </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={[styles.button, styles.delete]} onPress={deleteBook}>
           <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.edit]} onPress={editBook}>
           <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.favorite]} onPress={favoriteBook}>
          <Text style={styles.buttonText}>♡</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E1", paddingTop: 20 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  info: { fontSize: 16, marginBottom: 5 },
  quote: { fontSize: 16, marginTop: 10, color: "#444" },
  review: { fontSize: 16, marginTop: 10, color: "#444" }, 
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 120,
    paddingBottom: 55,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  delete: { backgroundColor: "#FFD18C" },
  edit: { backgroundColor: "#FF6F91" },
  favorite: { backgroundColor : "#FBB6C1" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});