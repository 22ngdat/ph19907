import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
  Alert,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useId } from "react";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Item from "./item/Item";
import axios from "axios";

const Home = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const [content, setContent] = useState();
  const [selectImage, setSelectImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  let urlPost = "http://10.24.57.87:3000/posts";

  /// Loading UserInfo
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  // lấy dữ liệu người dùng từ asyns storage
  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem("loginInfo");
      if (value !== null) {
        setUserInfo(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };
  // tải ảnh từ thư viện
  const pickImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        cropperCircleOverlay: true,
        allowsEditing: true,
      });
      if (!image.canceled) {
        let _uri = image.assets[0].uri;
        let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1);

        FileSystem.readAsStringAsync(image.assets[0].uri, {
          encoding: "base64",
        }).then((res) => {
          setSelectImage("data:image/" + file_ext + ";base64," + res);
        });
      } else {
        console.log("Image picker was canceled.");
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };
  //POST
  const uploadNewPost = () => {
    if (content === "") {
      alert("Nhập nội dung");
      return;
    }
    if (selectImage === "") {
      alert("Chọn ảnh");
      return;
    }
    try {
      const newPost = {
        postContent: content,
        postImage: selectImage,
        profileName: userInfo.fullname,
      };

      fetch(urlPost, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((res) => {
          if (res.status == 201) {
            Alert.alert("Thông báo!", "Đã tải bài viết lên!");
            setModalVisible(false);
            getPosts();
          } else {
            Alert.alert("Add Fail!");
            console.log(res.status);
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error uploading data:", error);
    }
  };
  // GET
  const getPosts = async () => {
    try {
      const response = await fetch(urlPost);
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.error(error);
    }
  };
  // Load data
  const loadData = React.useCallback(() => {
    setisLoading(true);
    getUserInfo();
    getPosts();
    setisLoading(false);
  }, []);

  // Flatlist
  return (
    <SafeAreaView style={{ paddingBottom: 150 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            alignItems: "center",
          }}
        >
          {/* CHECK ROLE = 1 mới cho post bài viết */}
          {userInfo.role === 1 && (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Feather
                name={"plus-square"}
                style={{
                  marginStart: 20,
                  paddingRight: 10,
                  fontSize: 30,
                  marginBottom: 5,
                }}
              />
            </TouchableOpacity>
          )}

          {/* MODAL PICK IMAGE */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={{ color: "black", textAlign: "center" }}
                  placeholder="Bạn đang nghĩ gì ?"
                  onChangeText={setContent}
                ></TextInput>

                {/* NÚT CHỌN ẢNH */}
                <TouchableOpacity onPress={pickImage}>
                  {selectImage != "" ? (
                    <View style={{ width: 320, height: 200 }}>
                      <Image
                        source={{ uri: selectImage }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Feather
                        name={"camera"}
                        style={{
                          marginTop: 15,
                          fontSize: 30,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                {/* NÚT POST */}
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => [
                    uploadNewPost(),
                    setSelectImage(""),
                    // setModalVisible(false),
                  ]}
                >
                  <Text style={styles.textStyle}>Post</Text>
                </TouchableOpacity>
                {/* NÚT ẨN MODAL */}
                <TouchableOpacity
                  style={{
                    backgroundColor: "gray",
                    marginTop: 20,
                    borderRadius: 20,
                    padding: 10,
                    elevation: 0,
                  }}
                  onPress={() => [setModalVisible(false)]}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Text
            style={{
              fontSize: 18,
              fontStyle: "italic",
              fontWeight: "bold",
              marginBottom: 10,
              marginStart: 10,
            }}
          >
            New post
          </Text>
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Item
              inputData={item}
              navigation={navigation}
              userInfo={userInfo}
              onPress={() => {
                loadData();
              }}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadData} />
          }
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 0,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#E66C2C",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
