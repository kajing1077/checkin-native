import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { colors } from "@/constants/colors";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "standard" | "filled" | "outlined";
  style?: StyleProp<ViewStyle>;
}

function CustomButton({
  label,
  size = "medium",
  variant = "standard",
  style = null,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <Text style={styles[`${variant}Text`]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filled: {
    backgroundColor: colors.ORANGE_600,
  },
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  standard: {},
  large: {
    width: "100%",
    height: 44,
  },
  medium: {
    height: 38,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  standardText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  filledText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  outlinedText: {},
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
