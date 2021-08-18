import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Alert } from "react-native";

import { icons, COLORS, SIZES, FONTS } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const RequirementDetail = ({ icon, label, detail }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.gray,
          }}
        >
          <Image
            source={icon}
            resizeMode="cover"
            style={{
              tintColor: COLORS.secondary,
              width: 30,
              height: 30,
            }}
          />
        </View>

        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.secondary,
            ...FONTS.h2,
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.h2 }}
        >
          {detail}
        </Text>
      </View>
    </View>
  );
};

const CatDetail = ({ navigation, route }) => {
  const auctionItem = route.params.item;
  const kittyID = auctionItem.kitty.id;

  const [specKitty, setSpecKitty] = React.useState([]);

  const fetchSpecKitty = useCallback(async () => {
    const url = "https://api.cryptokitties.co/kitties/" + kittyID;
    const result = await fetch(url);
    if (result.ok) {
      const kitty = await result.json();
      setSpecKitty(kitty);
    }
  }, []);

  useEffect(() => {
    fetchSpecKitty();
  }, []);

  // Render

  function renderHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          left: SIZES.padding,
          right: SIZES.padding,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Image
                source={icons.back}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: "10%" }}>
          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={2}
              style={{
                textShadowColor: "black",
                textShadowRadius: 1,
                textShadowOffset: {
                  width: 2,
                  height: 2,
                },
                color: COLORS.white,
                ...FONTS.largeTitle,
              }}
            >
              {auctionItem.kitty.name}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    );
  }

  function renderRequirements(item, index) {
    return (
      <View
        style={{
          flex: 2.5,
          paddingHorizontal: SIZES.padding,
          justifyContent: "center",
        }}
      >
        <RequirementDetail
          icon={icons[item.type]}
          label={item.type}
          detail={item.description}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          flex: 0.3,
          flexDirection: "row",
          paddingVertical: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding * 3,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => {
            Alert.prompt(
              "Buy a CryptoKitty!",
              "Enter your offer",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: (password) =>
                    console.log("OK Pressed, password: " + password),
                },
              ],
              "plain-text"
            );
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Buy Kitty</Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text
            numberoflines={1}
            style={{ flex: 1, color: COLORS.secondary, ...FONTS.h3 }}
          >
            ETH {auctionItem.current_price / Math.pow(10, 18)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Banner Photo */}
      <View style={{ height: "35%" }}>
        <Image
          source={{
            uri: auctionItem.kitty.image_url_cdn.slice(0, -4) + ".png",
          }}
          // source={images.bannerBg}
          resizeMode="cover"
          style={{
            backgroundColor: COLORS.primary,
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      {/* Requirements */}
      <View
        style={{
          flex: 1,
          marginTop: -40,
          backgroundColor: COLORS.lightGray,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingVertical: SIZES.padding,
        }}
      >
        <Text
          style={{
            paddingHorizontal: SIZES.padding,
            color: COLORS.secondary,
            ...FONTS.h1,
          }}
        >
          Bio
        </Text>
        <Text
          style={{
            paddingHorizontal: SIZES.padding,
            color: COLORS.secondary,
            ...FONTS.h4,
          }}
        >
          {specKitty.bio}
        </Text>
        <Text
          style={{
            marginTop: 5,
            paddingHorizontal: SIZES.padding,
            color: COLORS.secondary,
            ...FONTS.h1,
          }}
        >
          Cattributes
        </Text>

        <FlatList
          Vertical
          data={specKitty.enhanced_cattributes}
          keyExtractor={(item) => item.type.toString()}
          renderItem={({ item, index }) => renderRequirements(item, index)}
        />
      </View>

      {renderFooter()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CatDetail;
