import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GlobalStyles } from "../../constants/styles";
function Input({ label, invalid, textInputConfig, type, style }) {
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>

      {type === "picker" ? (
        <Picker
          style={inputStyles}
          selectedValue={textInputConfig.selectedValue}
          onValueChange={textInputConfig.onValueChange}
        >
          {textInputConfig.options.map((option) => (
            <Picker.Item
              label={option.label}
              value={option.value}
              key={option.value}
            />
          ))}
        </Picker>
      ) : (
        <TextInput style={inputStyles} {...textInputConfig} />
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});
