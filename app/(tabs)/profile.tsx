import Header from "@/components/header";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { getProfileImage } from "@/services/ImageServices";
import { accountOptionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import { useEffect } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../contexts/authContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      bgColor: "#6366f1",
      routeName: "/(modals)/profileModal",
    },
    {
      title: "Setting",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      bgColor: "#e11d48",
    },
  ];

  useEffect(() => {
    console.log("Profile Component - User:", user);
    console.log("Profile Component - User Name:", user?.name);
    console.log("Profile Component - Logout Function:", logout);
  }, [user, logout]);

  const showLogoutAlert = () => {
    console.log("Showing logout alert");
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (confirmed) {
        handleLogout();
      } else {
        console.log("Cancel logout");
      }
    } else {
      // Simplified alert for testing
      Alert.alert("Test Alert", "This is a test alert", [
        { text: "OK", onPress: () => console.log("Test alert OK pressed") },
      ]);
      // Original alert (uncomment after testing)
      /*
      Alert.alert(
        "Confirm",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel logout"),
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: handleLogout,
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
      */
    }
  };

  const handleLogout = async () => {
    console.log("Attempting logout");
    try {
      console.log("Logout function:", logout);
      if (!logout) throw new Error("Logout function is undefined");
      await logout();
      console.log("Logout successful, navigating to login");
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      Alert.alert("Error", `Failed to logout: ${error.message}`);
    }
  };

  const handlePress = async (item: accountOptionType) => {
    console.log("handlePress called with item:", item.title);
    if (item.title === "Logout") {
      showLogoutAlert();
    } else if (item.routeName) {
      router.push(item.routeName);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" style={{ marginVertical: spacingY._10 }} />
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={getProfileImage(user?.image)}
            style={styles.avatar}
            contentFit="cover"
            transition={100}
          />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={24} fontWeight="600" color={colors.neutral100}>
            {user?.name || "User"}
          </Typo>
          <Typo size={15} color={colors.neutral400}>
            {user?.email || "Email"}
          </Typo>
        </View>
      </View>
      <View style={styles.accountOptions}>
        {accountOptions.map((item, index) => (
          <Animated.View
            key={index.toString()}
            entering={FadeInDown.delay(index * 50)
              .springify()
              .damping(14)}
            style={styles.listItem}
          >
            <TouchableOpacity
              style={[styles.flexRow]}
              onPress={() => handlePress(item)}
            >
              <View
                style={[styles.listIcon, { backgroundColor: item.bgColor }]}
              >
                {item.icon}
              </View>
              <Typo
                size={16}
                fontWeight="500"
                color={colors.white}
                style={styles.listTitle}
              >
                {item.title}
              </Typo>
              <Icons.CaretRight
                size={verticalScale(20)}
                weight="bold"
                color={colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    alignSelf: "center",
    marginTop: spacingY._20,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  nameContainer: {
    gap: verticalScale(5),
    alignItems: "center",
    marginTop: spacingY._20,
  },
  accountOptions: {
    marginTop: spacingY._30,
    gap: spacingY._12,
  },
  listItem: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._10,
    backgroundColor: colors.neutral800,
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listTitle: {
    flex: 1,
    marginHorizontal: spacingX._10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
