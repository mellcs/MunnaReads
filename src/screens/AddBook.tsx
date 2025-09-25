import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function AddBook({ navigation, route }: any) {
  const editingBook = route.params?.book || null;

  const [cover, setCover] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [quote, setQuote] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (editingBook) {
      setCover(editingBook.image);
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setPages(editingBook.pages);
      setQuote(editingBook.quote);
      setReview(editingBook.review)
    }
  }, [editingBook]);

  const selectCover = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Precisamos de acesso à galeria.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setCover(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Erro ao selecionar capa: ", e);
    }
  };

  const saveBook = async () => {
    if (!title.trim() || !author.trim() || !pages.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const jsonValue = await AsyncStorage.getItem("@books");
      const existingBooks = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (editingBook) {
        const updatedBooks = existingBooks.map((book: any) =>
          book.id === editingBook.id
            ? {
                ...book,
                title,
                author,
                pages,
                quote,
                review,
                image: cover || "https://via.placeholder.com/140.png?text=Sem+Capa",
              }
            : book
        );
        await AsyncStorage.setItem("@books", JSON.stringify(updatedBooks));
        Alert.alert("Sucesso", "Livro atualizado!");
        navigation.navigate("Tabs", { screen: "MainScreen" });
      } else {
        const newBook = {
          id: Date.now().toString(),
          title,
          author,
          pages,
          quote,
          review,
          image: cover || "https://via.placeholder.com/140.png?text=Sem+Capa",
        };
        const updatedBooks = [...existingBooks, newBook];
        await AsyncStorage.setItem("@books", JSON.stringify(updatedBooks));
        Alert.alert("Sucesso", "Livro adicionado!");

        navigation.navigate("Tabs", { screen: "MainScreen" });
      }
    } catch (e) {
      console.log("Erro ao salvar livro: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>
          {editingBook ? "Editar Livro" : "Adicionar Livro"}
        </Text>

        <TouchableOpacity style={styles.coverButton} onPress={selectCover}>
          {cover ? (
            <Image source={{ uri: cover }} style={styles.coverPreview} />
          ) : (
            <Text style={styles.coverButtonText}>Adicionar Capa</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome do livro *"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor *"
          value={author}
          onChangeText={setAuthor}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de páginas *"
          value={pages}
          onChangeText={setPages}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Citação (opcional)"
          value={quote}
          onChangeText={setQuote}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Resenha (opcional)"
          value={review}
          onChangeText={setReview}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={saveBook}>
          <Text style={styles.submitButtonText}>
            {editingBook ? "Atualizar Livro" : "Salvar Livro"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3CC", paddingTop: 20 },
  scrollContainer: { padding: 20, paddingTop: 80, alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  coverButton: {
    width: 140,
    height: 140,
    backgroundColor: "#FF6F91",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  coverButtonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  coverPreview: { width: 140, height: 140, borderRadius: 12 },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#FF6F91",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
