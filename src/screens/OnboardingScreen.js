import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";

const { width, height } = Dimensions.get("window");

//Onboarding
import Onboarding from "react-native-onboarding-swiper";

//Lottie
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const handleDone = () => {
    navigation.navigate("Home");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        // bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  ref={animationRef}
                  source={require("../assets/animation/animation.json")}
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Boost Productivity",
            subtitle: "Subscribe this channel to boost your productivity level",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <Lottie
                ref={animationRef}
                source={require("../assets/animation/achieve.json")}
                loop
                style={styles.lottie}
              />
            ),
            title: "Achieve Higher Goals",
            subtitle:
              "By boosting your productivity we help you to achieve higher goals",
          },
          {
            backgroundColor: "#a78bfa",
            image: (
              <Lottie
                ref={animationRef}
                source={require("../assets/animation/work.json")}
                loop
                style={styles.lottie}
              />
            ),
            title: "Work Seamlessly",
            subtitle: "Get your work done seamlessly without interruption",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: "white",
    // borderBottomLeftRadius: "100%",
    // borderTopLeftRadius: "100%",
  },
});
