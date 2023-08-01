import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Item = (props) => {
  const postPersonImage = require("../../assets/profile-icon.png");
  const [cmt, setCmt] = useState([]);
  const [comment, setcomment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLike, setisLike] = useState(false);
  const [likes, setlikes] = useState([]);
  const [likeId, setlikeId] = useState();
  const [curLike, setcurLike] = useState();
  const [isfollow, setisfollow] = useState(false);
  const [follow, setfollow] = useState([]);
  const [followId, setFollowId] = useState();
  const [curFollow, setCurFollow] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    loadData();
  }, [isFocused]);

  //get list comments
  const getComments = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.179:3000/comments?postId=" +
          props.inputData.id +
          "&expand=users"
      );
      setCmt(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //comments
  const addNewCmt = async () => {
    if (comment !== "") {
      let newComment = {
        postId: props.inputData.id,
        profileId: props.userInfo.fullname,
        commentContent: comment,
      };
      try {
        let urlComment = "http://192.168.0.179:3000/comments";
        const response = await axios.post(urlComment, newComment);

        if (response.status === 201) {
          Alert.alert("Thông báo!", "Đã thêm bình luận!");
          loadData();
        } else {
          Alert.alert("Thêm không thành công!");
          console.log(response.status);
        }
      } catch (error) {
        console.error("Lỗi khi đăng bình luận:", error);
      }
    }
  };
  // Thả tim
  const postLikes = async (postId, profileId) => {
    let newLikes = {
      postId: postId,
      profileId: profileId,
    };
    try {
      let urlLikes = "http://192.168.0.179:3000/likes";
      await axios.post(urlLikes, newLikes);
      loadData();
      console.log("Đã like 1 " + props.userInfo.fullname);
    } catch (error) {
      console.log("like bi loi" + error);
    }
  };
  // Bỏ thả tym
  const disLikes = async (likeId) => {
    try {
      // Kiểm tra xem likeId có tồn tại và không phải null/undefined
      if (!likeId) {
        console.log("likeId không hợp lệ!");
        return;
      }

      let urlLike = "http://192.168.0.179:3000/likes/" + likeId;
      const response = await axios.delete(urlLike);

      if (response.status === 200) {
        // Xoá thành công
        console.log("Xoá like thành công");
        setisLike(false); // Cập nhật trạng thái isLike
        loadData(); // Load lại dữ liệu
      } else {
        console.log("Xoá like không thành công");
      }
    } catch (error) {
      console.log("dislike bi loi " + error);
    }
  };

  // Trạng thái like
  const getIsLike = () => {
    likes.forEach((element) => {
      if (element.profileId == props.userInfo.id) {
        setlikeId(element.id);
      }
      if (element.id == curLike) {
        setisLike(false);
      }
    });
  };
  // xem đã like hay chưa
  const getLike = async () => {
    try {
      let urlLike =
        "http://192.168.0.179:3000/likes?postId=" + props.inputData.id;
      const response = await axios.get(urlLike);
      setlikes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async () => {
    try {
      const urlFollow = "http://10.24.57.87:3000/follow"; // Your API endpoint for follow/unfollow

      const followData = {
        userId: props.inputData.id, // ID of the user you want to follow/unfollow
        followerId: props.userInfo.id, // ID of the current logged-in user
        username: props.userInfo.fullname,
      };
      await axios.post(urlFollow, followData);
      setisfollow(true);
      getIsFollow();
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  const unFollow = async () => {
    try {
      // Kiểm tra xem likeId có tồn tại và không phải null/undefined
      if (!followId) {
        console.log("followId không hợp lệ!");
        return;
      }

      let urlFollow = "http://10.24.57.87:3000/follow/" + followId;
      const response = await axios.delete(urlFollow);

      if (response.status === 200) {
        // Xoá thành công
        console.log("Unfollow thành công");
        setisfollow(false); // Cập nhật trạng thái isLike
        loadData(); // Load lại dữ liệu
      } else {
        console.log("Unfollow không thành công");
      }
    } catch (error) {
      console.log("Unfollow bi loi " + error);
    }
  };

  const getIsFollow = () => {
    follow.forEach((element) => {
      if (element.followerId == props.userInfo.id) {
        setFollowId(element.id);
      }
      if (element.id == curFollow) {
        setisLike(false);
      }
    });
  };
  // xem đã like hay chưa
  const getFollow = async () => {
    try {
      let urlLike =
        "http://10.24.57.87:3000/follow?userId=" + props.inputData.id;
      const response = await axios.get(urlLike);
      setfollow(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = () => {
    getComments();
    getLike();
    getIsLike();
    getIsFollow();
    getFollow();
  };
  return (
    <View>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "gray",
          borderBottomWidth: 0.1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* ẢNH ĐẠI DIỆN */}
            <Image
              source={postPersonImage}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            {/* TÊN NGƯỜI POST */}
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {props.inputData.profileName}
              </Text>
            </View>
          </View>
          {/* NÚT FOLLOW */}

          <View>
            {props.userInfo.role === 0 && !isfollow && (
              // Only show the icon if userInfo.role is 0 and isFollowing is false
              <TouchableOpacity onPress={handleFollow}>
                <Feather
                  name="user-plus"
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: "black",
                  }}
                />
              </TouchableOpacity>
            )}
            {props.userInfo.role === 0 && isfollow && (
              // Show the unfollow button when isFollowing is true
              <TouchableOpacity onPress={unFollow}>
                <Feather
                  name="user-minus"
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: "red",
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* HIỂN THỊ ẢNH ĐÃ ĐĂNG */}
        <View
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: props.inputData.postImage }}
            style={{ width: "100%", height: 250 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 15,
          }}
        >
          {/* NÚT THẢ TYM VÀ COMMENT */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isLike ? (
              <TouchableOpacity
                onPress={() => {
                  disLikes(likeId);
                  setisLike(false);
                }}
              >
                <AntDesign
                  name="heart"
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: isLike ? "red" : "black",
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  postLikes(props.inputData.id, props.userInfo.id);
                  setisLike(true);
                }}
              >
                <AntDesign
                  name="hearto"
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: isLike ? "red" : "black",
                  }}
                />
              </TouchableOpacity>
            )}

            {/* Nut comment */}
            <TouchableOpacity
              onPress={() => [setModalVisible(true), getComments]}
            >
              <Ionic
                name="chatbox-outline"
                style={{ fontSize: 20, paddingRight: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="share-2" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Comments</Text>
              <ScrollView>
                {cmt.map((item) => (
                  <View
                    key={item.id}
                    style={{ flexDirection: "row", marginTop: 30 }}
                  >
                    <View style={{ marginRight: 10 }}>
                      <Image source={postPersonImage}></Image>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.profileId}
                      </Text>
                      <Text>{item.commentContent}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red", paddingTop: 10, fontSize: 14 }}>
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* PHẦN NỘI DUNG BÀI POST */}
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 14,
              paddingVertical: 2,
            }}
          >
            {props.inputData.postContent}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></View>
          {/* TEXT INPUT COMMENT */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              key={comment.id}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={postPersonImage}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  backgroundColor: "white",
                  marginRight: 10,
                }}
              />
              <TextInput
                placeholder="Add a comment "
                onChangeText={setcomment}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={addNewCmt}>
                <Feather
                  name="send"
                  style={{ fontSize: 20, marginRight: 15 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  modalView: {
    marginBottom: 60,
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: 300,
  },
});
