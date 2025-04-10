import React from "react";
import { StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

function CookieInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="cookie"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          value={value}
          label="UID"
          autoFocus
          onChangeText={onChange}
          inputMode="text"
          submitBehavior="submit"
          error={error?.message}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CookieInput;
