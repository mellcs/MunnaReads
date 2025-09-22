import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Quotes() {
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@books");
        if (jsonValue) {
          const books = JSON.parse(jsonValue);

          const booksWithQuotes = books.filter((b: any) => b.quote && b.quote.trim() !== "");
          setQuotes(booksWithQuotes);
        }
      } catch (e) {
        console.log("Erro ao carregar citações:", e);
      }
    };

    loadQuotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citações</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {quotes.length > 0 ? (
          quotes.map((book, index) => (
            <View key={index} style={styles.quoteContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.quote}>“{book.quote}”</Text>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>Nenhuma citação cadastrada ainda.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3CC", padding: 20 }, 
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, marginTop: 40 },
  scrollContent: { paddingBottom: 100, marginTop: 10 },
  quoteContainer: { marginBottom: 20 },
  bookTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5, textAlign: "left" },
  quote: { fontSize: 16, color: "#444", textAlign: "left", fontStyle: "italic" },
  empty: { fontSize: 16, color: "#666", marginTop: 20, textAlign: "center" },
});
