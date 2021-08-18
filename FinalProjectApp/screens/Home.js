import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";

import { images, icons, COLORS, FONTS, SIZES } from "../constants";

const Home = ({ navigation }) => {
  //kitty data
  const [kitty, setKitty] = React.useState([]);
  const [auction, setAuction] = React.useState([]);

  const fetchKitty = useCallback(async () => {
    const result = await fetch("https://api.cryptokitties.co/kitties");
    if (result.ok) {
      const kitties = await result.json();
      setKitty(kitties);
    }
  }, []);

  const fetchAuction = useCallback(async () => {
    const result = await fetch("https://api.cryptokitties.co/auctions?limit=3");
    if (result.ok) {
      const auctions = await result.json();
      setAuction(auctions);
    }
  }, []);

  useEffect(() => {
    fetchKitty();
  }, []);

  useEffect(() => {
    fetchAuction();
  }, []);

  // Render Kitty
  function renderKitties(item, index) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: SIZES.base,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BrowseKitties", { item: item });
          }}
        >
          <Image
            source={{ uri: item.image_url_png }}
            resizeMode="cover"
            style={{
              width: SIZES.width * 0.23,
              height: "82%",
              borderRadius: 15,
              backgroundColor: COLORS.lightGray,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: "17%",
              right: 0,
              backgroundColor: "transparent",
              paddingHorizontal: SIZES.base,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: COLORS.primary, ...FONTS.body4 }}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: "15%",
            left: 7,
          }}
          onPress={() => {
            console.log("Focus on pressed");
          }}
        ></TouchableOpacity>
      </View>
    );
  }

  // Render Auction
  function renderAuction(item, index) {
    return (
      //tree
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: SIZES.font }}
          onPress={() => {
            navigation.navigate("CatDetail", { item: item });
          }}
        >
          <Image
            source={{ uri: item.kitty.image_url_cdn.slice(0, -4) + ".png" }}
            resizeMode="cover"
            style={{
              width: SIZES.width * 0.8,
              height: "85%",
              borderRadius: 15,
              backgroundColor: COLORS.lightGray,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: "9%",
              width: "100%",
              right: 0,
              backgroundColor: COLORS.primary,
              paddingHorizontal: "10%",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: COLORS.white, ...FONTS.body3 }}
            >
              {item.kitty.name}
            </Text>

            <Text
              numberOfLines={1}
              style={{ color: COLORS.white, ...FONTS.body4 }}
            >
              ETH {item.current_price / Math.pow(10, 18)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Browse Kitties */}
      <View style={{ height: "30%", backgroundColor: COLORS.white }}>
        <View
          style={{
            flex: 1,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              marginTop: SIZES.padding * 2,
              marginHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                Browse Kitties
              </Text>
            </View>

            <View style={{ marginTop: SIZES.base }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={kitty.kitties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => renderKitties(item, index)}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Today's Auction */}
      <View style={{ height: "50%", backgroundColor: COLORS.lightGray }}>
        <View
          style={{
            flex: 1,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{ marginTop: SIZES.font, marginHorizontal: SIZES.padding }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            ></View>

            <View style={{ height: "100%", marginTop: SIZES.base }}>
              {/* //kitty */}
              <View style={{ marginTop: SIZES.base }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={auction.auctions}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => renderAuction(item, index)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Wallet */}
      <View style={{ height: "20%", backgroundColor: COLORS.lightGray }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray,
          }}
        >
          <View
            style={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
            }}
          >
            <View style={{ height: "60%" }}>
              {/* connect account */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ color: COLORS.secondary, ...FONTS.h2 }}>
                    Wallet
                  </Text>
                  <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>
                    {0} ETH
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>
                    Connect Account
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: SIZES.base,
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.gray,
                    }}
                    onPress={() => {
                      console.log("Connect Account");
                    }}
                  >
                    <Image
                      source={icons.plus}
                      resizeMode="contain"
                      style={{
                        tintColor: COLORS.primary,
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
