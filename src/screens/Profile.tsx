import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function Profile({ navigation }: any) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [booksCount, setBooksCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    loadProfileImage();
    loadStats();
  }, []);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("@profile_image");
      if (savedImage) setProfileImage(savedImage);
    } catch (e) {
      console.log("Erro ao carregar imagem de perfil:", e);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão negada", "É necessário acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem("@profile_image", uri);
    }
  };

  const loadStats = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@books");
      if (jsonValue) {
        const booksArray = JSON.parse(jsonValue);
        setBooksCount(booksArray.length);

        // Somar páginas lidas
        const totalPages = booksArray.reduce(
          (acc: number, book: any) => acc + (parseInt(book.pages) || 0),
          0
        );
        setPagesCount(totalPages);
      }
    } catch (e) {
      console.log("Erro ao carregar estatísticas:", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem de perfil */}
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.mockup}>
            <Ionicons name="person" size={80} color="white" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Livros lidos -</Text>
          <View style={styles.statValueBox}>
            <Text style={styles.statValue}>{booksCount}</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Páginas lidas -</Text>
          <View style={styles.statValueBox}>
            <Text style={styles.statValue}>{pagesCount}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.recommendButton}
        onPress={() => navigation.navigate("Recommendations")}
      >
        <Text style={styles.recommendText}>Recomendações personalizadas</Text>
      </TouchableOpacity>

      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate("Quotes")}>
          <Ionicons name="star-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Tabs", { screen: "MainScreen" })}
        >
          <Ionicons name="book-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Shelf")}>
          <Ionicons name="grid-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3CC", alignItems: "center" },
  imageWrapper: { marginTop: 50, marginBottom: 20 },
  profileImage: { width: 170, height: 170, borderRadius: 85, marginTop: 50 },
  mockup: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F77D8E",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: { marginTop: 50, width: "65%" },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  statLabel: { fontSize: 18, fontWeight: "600" },
  statValueBox: {
    backgroundColor: "#FBB6C1",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statValue: { fontSize: 16, fontWeight: "bold", color: "white" },
  recommendButton: {
    backgroundColor: "#F77D8E",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 50,
  },
  recommendText: { color: "white", fontWeight: "bold", fontSize: 16 },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
});
