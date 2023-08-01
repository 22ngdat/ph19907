import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionic from "react-native-vector-icons/Ionicons";

const Profile = ({ navigation }) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ height: 150, width: 150, borderRadius: 20 }}
        source={require("../assets/avatar.jpg")} // Đường dẫn đến ảnh đại diện
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
        Nguyễn Đạt
      </Text>
      <View style={{ width: "80%", marginTop: 30 }}>
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="moon" style={{ marginRight: 20, fontSize: 20 }} />
              <Text>Night mode</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setmodalVisible(true);
            }}
            style={styles.button}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="key" style={{ marginRight: 20, fontSize: 20 }} />
              <Text>Change Password</Text>
            </View>
          </TouchableOpacity>
          {/* CREATe MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setmodalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Change Password
                </Text>
                <Text style={{ fontSize: 16, margin: 15 }}>New Password</Text>
                <TextInput
                  placeholder="Enter new password"
                  style={{
                    fontSize: 18,
                    borderWidth: 0.7,
                    borderRadius: 10,
                    height: 50,
                    padding: 10,
                  }}
                />
                <Text style={{ fontSize: 16, margin: 15 }}>
                  Confirm Password
                </Text>
                <TextInput
                  placeholder="Enter confirm password"
                  style={{
                    fontSize: 18,
                    borderWidth: 0.7,
                    borderRadius: 10,
                    height: 50,
                    padding: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <Text style={styles.buttonAmen}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <Text style={styles.buttonAmen}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* END */}
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="logout"
                style={{ marginRight: 20, fontSize: 20 }}
              />
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    alignItems: "center",
    width: "100%",
    borderRadius: 30,
    borderWidth: 0.8,
    marginBottom: 20,
    padding: 14,
    backgroundColor: "#f7f7f7",
  },
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
  buttonAmen: {
    marginTop: 20,
    color: "green",
    padding: 8,
    fontSize: 14,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#bcbdbf",
    width: 100,
    marginLeft: 40,
  },
});
