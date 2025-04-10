import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import CookieInput from "@/components/CookieInput";
import { FormProvider, useForm } from "react-hook-form";
import { useFetchGameData } from "@/hooks/useFetchGameData";
import RewardList from "@/components/RewardList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const COOKIE_KEY = "hoyo_cookie";

type FormValue = {
  cookie: string;
};

export default function HomeScreen() {
  const [showInput, setShowInput] = useState(true);
  const cookieForm = useForm({
    defaultValues: {
      cookie: "",
    },
  });

  const inset = useSafeAreaInsets();

  const { data, mutate, isPending } = useFetchGameData();

  useEffect(() => {
    loadSavedCookie();
  }, []);

  const loadSavedCookie = async () => {
    try {
      const savedCookie = await SecureStore.getItemAsync(COOKIE_KEY);
      if (savedCookie) {
        cookieForm.setValue("cookie", savedCookie);
        setShowInput(false);
      }
    } catch (error) {
      console.error("Error loading cookie:", error);
    }
  };
  const onSubmit = async (formValue: FormValue) => {
    const { cookie } = formValue;

    await SecureStore.setItemAsync(COOKIE_KEY, cookie);
    setShowInput(false);

    mutate(cookie, {
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (error) => {
        console.log("에러", error);
        setShowInput(true);
      },
    });
  };

  const handleCheckIn = async () => {
    const savedCookie = await SecureStore.getItemAsync(COOKIE_KEY);

    if (savedCookie) {
      mutate(savedCookie, {
        onError: (error) => {
          console.log("에러", error);
          setShowInput(true);
        },
      });
    } else {
      setShowInput(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.awardContainer}>
        {isPending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.ORANGE_600} />
            <Text style={styles.loadingText}>체크인 정보를 가져오는 중...</Text>
          </View>
        ) : data ? (
          <RewardList data={data} />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>체크인 정보가 없습니다</Text>
          </View>
        )}
      </View>
      <View
        style={[styles.inputContainer, { paddingBottom: inset.bottom + 30 }]}
      >
        {showInput ? (
          <View>
            <FormProvider {...cookieForm}>
              <CookieInput />
            </FormProvider>
            <CustomButton
              label={isPending ? "체크인 중..." : "체크인하기"}
              variant="filled"
              size="large"
              onPress={cookieForm.handleSubmit(onSubmit)}
              style={[styles.checkInButton, isPending && styles.pendingButton]}
            />
          </View>
        ) : (
          <CustomButton
            label={isPending ? "체크인 중..." : "체크인하기"}
            variant="filled"
            size="large"
            onPress={handleCheckIn}
            style={[styles.checkInButton, isPending && styles.pendingButton]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: colors.GRAY_700,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.GRAY_700,
    fontSize: 16,
  },
  awardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    borderTopColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },

  isSign: {
    margin: 10,
  },
  checkInButton: {
    marginTop: 10,
  },
  pendingButton: {
    opacity: 0.7,
  },
});
