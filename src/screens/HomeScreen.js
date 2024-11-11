import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";

//Lottie
import Lottie from "lottie-react-native";

//Nav
import { useNavigation } from "@react-navigation/native";

//Utils
import { removeItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("Onboarding");
  };

  useEffect(() => {
    animationRef.current?.play();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          ref={animationRef}
          source={require("../assets/animation/confetti.json")}
          loop
          style={styles.lottie}
        />
      </View>
      <Text style={styles.text}>Home Page</Text>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  text: {
    fontSize: width * 0.09,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#34d399",
    padding: 10,
    borderRadius: 10,
  },
});
