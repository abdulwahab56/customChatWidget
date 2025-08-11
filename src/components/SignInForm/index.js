import React, { useState, useContext } from "react";
import { useAppConfig } from "../../providers/AppConfigProvider";
import { chatWithFormStates } from "../../constants";
import { genLogger } from "../../lib/logger";
import {
  SignInContainer,
  SignInTitle,
  OptionContainer,
  OptionButton,
  InputField,
  HelpText,
  SignInButton,
  RadioInput,
  RequiredMark,
  InputLabel,
} from "./styled";

const name = "SignInForm";
const { log } = genLogger(name);

const SignInForm = ({ setData, setCurrentState }) => {
  const { primaryColor } = useAppConfig();
  const [signInMethod, setSignInMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");

  const handleSignIn = () => {
    if (signInMethod === "email" && !inputValue.includes("@")) {
      log("Invalid email format");
      return;
    } else if (signInMethod === "sms" && !/^\+?\d{10,}$/.test(inputValue)) {
      log("Invalid phone number format");
      return;
    }
    log("Sign in with:", signInMethod, inputValue);
    setData((prev) => ({
      ...prev,
      signInMethod,
      signInValue: inputValue,
    }));
    setCurrentState(chatWithFormStates.CHAT_WIDGET);
  };

  return (
    <SignInContainer>
      <SignInTitle>Sign in</SignInTitle>
      <OptionContainer>
        <OptionButton active={signInMethod === "email"}>
          <RadioInput
            type="radio"
            name="signInMethod"
            value="email"
            checked={signInMethod === "email"}
            onChange={() => setSignInMethod("email")}
          />
          <span>Email</span>
        </OptionButton>

        <OptionButton active={signInMethod === "sms"}>
          <RadioInput
            type="radio"
            name="signInMethod"
            value="sms"
            checked={signInMethod === "sms"}
            onChange={() => setSignInMethod("sms")}
          />
          <span>SMS</span>
        </OptionButton>
      </OptionContainer>
      <InputLabel htmlFor="signInInput">
        {signInMethod === "email" ? "Your email" : "Your phone number"}
        <RequiredMark>*</RequiredMark>
      </InputLabel>

      <InputField
        id="signInInput"
        type={signInMethod === "email" ? "email" : "tel"}
        placeholder={
          signInMethod === "email" ? "Your email*" : "Your phone number*"
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <HelpText>Can't sign in? Send us a message</HelpText>
      <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
    </SignInContainer>
  );
};

export default SignInForm;
