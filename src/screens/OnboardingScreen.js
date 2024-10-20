import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { setItem } from "../utils/asyncStorage";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  // Animasyon referanslarını bir dizi içinde saklıyoruz
  const animationRefs = [useRef(null), useRef(null), useRef(null)];

  const handleDone = () => {
    navigation.navigate("Home");
    setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  );

  // Her sayfa değiştiğinde o sayfanın animasyonunu başlatıyoruz
  const handlePageChange = (index) => {
    animationRefs.forEach((ref, i) => {
      if (i === index) {
        ref.current?.play(); // Aktif sayfanın animasyonunu çalıştır
      } else {
        ref.current?.reset(); // Diğer animasyonları durdur ve sıfırla
      }
    });
  };

  // İlk sayfanın animasyonunu otomatik başlat
  useEffect(() => {
    animationRefs[0]?.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        onPageChange={handlePageChange} // Sayfa değişiminde tetikleniyor
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  ref={animationRefs[0]}
                  source={require("../assets/animation/animation.json")}
                  style={styles.lottie}
                  autoPlay={true} // Otomatik oynatma
                  loop={true} // Döngü
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
                ref={animationRefs[1]}
                source={require("../assets/animation/achieve.json")}
                autoPlay={true} // Otomatik oynatma
                loop={true} // Döngü
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
                ref={animationRefs[2]}
                source={require("../assets/animation/work.json")}
                autoPlay={true} // Otomatik oynatma
                loop={true} // Döngü
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
  },
});
