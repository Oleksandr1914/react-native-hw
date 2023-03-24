import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const { login } = useSelector((state) => state.auth);

  const createPost = async () => {
    const docRef = doc(db, "posts", postId);
    await addDoc(collection(docRef, "comments"), {
      login,
      comment,
      date: Date.now(),
    });
    setComment("");
  };

  const getAllComments = async () => {
    const docRef = collection(db, "posts", postId, "comments");
    onSnapshot(docRef, (data) => {
      setAllComment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComment}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
        <Text style={styles.sendLabel}>add post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentContainer: {
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  sendLabel: {
    color: "#e35904",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#e35904",
  },
});

export default CommentsScreen;
