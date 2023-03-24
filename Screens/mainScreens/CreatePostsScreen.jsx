import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";

const initialState = {
  name: "",
  address: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [map, setMap] = useState(null);
  const { userId, login } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    setMap(location.coords);

    setPhoto(photo.uri);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onDelete = () => {
    setState(initialState);
    setPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniqueIdPost = Date.now().toString();

    const storageRef = await ref(storage, `postImages/${uniqueIdPost}.jpg`);

    await uploadBytes(storageRef, file);

    const uploadedPhoto = await getDownloadURL(
      ref(storage, `postImages/${uniqueIdPost}.jpg`)
    );

    return uploadedPhoto;
  };

  const uploadPostToServer = async () => {
    const uploadedPhoto = await uploadPhotoToServer();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo: uploadedPhoto,
        title: state.name,
        address: state.address,
        userId,
        login,
        ...map,
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = () => {
    if (!state.name || !state.address) {
      return Alert.alert("please fill in the blanks!");
    }
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={{ ...styles.container }}>
          {!photo ? (
            <Camera style={styles.camera} ref={setCamera}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 30,
                  width: "100%",
                  height: "100%",
                }}
              >
                <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
                  <FontAwesome name="camera" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnChange}
                  onPress={() => {
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    );
                  }}
                >
                  <Entypo name="retweet" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <View style={styles.takePhotoContainer}>
              <Image source={{ uri: photo }} style={{ height: 240 }} />
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Repair a picture!");
              setPhoto(null);
            }}
          >
            <Text style={styles.uploadText}>
              {photo ? "Редактировать фото" : "Загрузите фото"}
            </Text>
          </TouchableOpacity>
          <KeyboardAvoidingView
            style={{ height: "100%" }}
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View style={{ ...styles.form }}>
              <TextInput
                placeholder="Название..."
                placeholderTextColor={"#BDBDBD"}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                value={state.name}
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
              ></TextInput>
              <TextInput
                placeholder="Местность..."
                placeholderTextColor={"#BDBDBD"}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, address: value }))
                }
                value={state.address}
                onFocus={() => setIsShowKeyboard(true)}
                style={{ ...styles.input, marginTop: 16, paddingLeft: 30 }}
              ></TextInput>
            </View>
            <TouchableOpacity onPress={sendPhoto} style={styles.btnPublic}>
              <Text style={styles.publicText}>Опубликовать</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnDelete} onPress={onDelete}>
                <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
    position: "relative",
  },
  btnCamera: {
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  btnChange: {
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  takePhotoContainer: {
    marginBottom: 8,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoContainer: {
    width: 360,
    height: 240,
  },
  uploadText: {
    color: "#BDBDBD",
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    marginTop: 48,
  },
  input: {
    paddingVertical: 15,
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  inputIcon: {
    position: "absolute",
    bottom: 16,
    left: 0,
  },
  btnPublic: {
    marginTop: 32,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
  },
  publicText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  btnDelete: {
    marginTop: 40,
    width: 70,
    paddingVertical: 8,
    paddingHorizontal: 23,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
