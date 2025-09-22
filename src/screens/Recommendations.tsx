import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { OPENAI_API_KEY } from "@env";

export default function Recommendations({ navigation }: any) {
  const [recommendations, setRecommendations] = useState<{ title: string; reason: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = OPENAI_API_KEY; 

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem("@books");
        const books = jsonValue ? JSON.parse(jsonValue) : [];

        if (books.length === 0) {
          setRecommendations([]);
          setLoading(false);
          return;
        }

        const titles = books.map((b: any) => b.title).join(", ");

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "Você é um assistente que recomenda livros. Responda **apenas** em JSON válido. Formato: [{\"title\": \"...\", \"reason\": \"...\"}, ...].",
              },
              {
                role: "user",
                content: `Aqui estão os livros que li: ${titles}. Sugira 5 livros parecidos com título e motivo, e tenha certeza de que o livro existe.`,
              },
            ],
          }),
        });

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "[]";

        let parsed: any[] = [];
        try {
          const jsonMatch = text.match(/\[.*\]/s);
          if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
          else parsed = JSON.parse(text);
        } catch (err) {
          console.log("⚠️ Falha ao parsear JSON. Texto recebido:", text);
        }

        setRecommendations(parsed);
      } catch (e) {
        console.log("❌ Erro ao buscar recomendações:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recomendações personalizadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#F77D8E" />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recBox}>
              <Text style={styles.title}>{rec.title}</Text>
              <Text style={styles.reason}>{rec.reason}</Text>
            </View>
          ))}

          {recommendations.length === 0 && (
            <Text style={{ marginTop: 20 }}>Nenhuma recomendação no momento.</Text>
          )}
        </ScrollView>
      )}

      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Quotes" })}>
          <Ionicons name="star-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "MainScreen" })}>
          <Ionicons name="book-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Profile" })}>
          <Ionicons name="person-outline" size={28} color="#FFD18C" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3CC", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, marginTop: 50 },
  list: { paddingBottom: 100 }, 
  recBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 5, color: "#F77D8E", },
  reason: { fontSize: 14, color: "#444" },
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
