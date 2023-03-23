import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const COURSES = {
  id: "45k6-j54k-4jth",
  title: "Natali Romanova",
  email: "email@example.com",
};

const DefaultScreenPost = ({ route, navigation }) => {
  const [courses, setCourses] = useState(COURSES);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../assets/avatar.png")} />
        <View style={styles.description}>
          <Text style={styles.title}>{courses.title}</Text>
          <Text style={styles.email}>{courses.email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Image
              source={{ uri: item.photo }}
              style={{
                width: "100%",
                height: 240,
                borderWidth: 1,
                borderRadius: 8,
                overflow: "hidden",
              }}
            />
            <Text style={styles.nameCard}>{item.state.name}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 11,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("CommentsScreen")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.comentNumber}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    ...item.map,
                    ...item.state,
                  })
                }
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.mapTetxt}>{item.state.address}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  description: {
    textAlign: "flex-start",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontFamily: "normal",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    marginLeft: 8,
  },
  email: {
    marginLeft: 8,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 13,
  },
  postCard: {
    marginBottom: 35,
    justifyContent: "center",
  },
  nameCard: {
    marginTop: 8,
    fontFamily: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
  },
  comentNumber: {
    marginLeft: 9,
    fontFamily: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  mapTetxt: {
    marginLeft: 9,
    fontFamily: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});

export default DefaultScreenPost;
