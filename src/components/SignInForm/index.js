import React, { useState, useEffect } from "react";
import { useAppConfig } from "../../providers/AppConfigProvider";
import { chatWithFormStates, device } from "../../constants";
import { genLogger } from "../../lib/logger";
import { FaAngleLeft } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import {
  SignInContainer,
  OfflineNotice,
  HeaderWrapper,
  SignInContent,
  SignInTitle,
  OptionContainer,
  OptionButton,
  InputField,
  HelpText,
  SignInButton,
  RadioInput,
  RequiredMark,
  InputLabel,
  VerificationContainer,
  Title,
  InfoText,
  SmallText,
  Label,
  CodeInput,
  ExpireText,
  ResendButton,
  TestMessage,
} from "./styled";
import OrdersPage from "../OrderPage";

const name = "SignInForm";
const { log } = genLogger(name);

const SignInForm = ({ setData, setCurrentState }) => {
  const { primaryColor } = useAppConfig();
  const [signInMethod, setSignInMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState("SIGN_IN"); // SIGN_IN or VERIFY
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(100); // seconds (10 mins)
  const [orders, setOrders] = useState(false);

  // useEffect(() => {
  //   if (currentStep === "VERIFY" && timer > 0) {
  //     const interval = setInterval(() => {
  //       setTimer((t) => t - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [currentStep, timer]);

  const handleSignIn = async () => {
    if (!inputValue) return;

    try {
      const url =
        "https://b0g5qyg9y1.execute-api.us-east-1.amazonaws.com/dev/customer";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      log("api data", data);
      if (data.message === "No customer associated with this email") {
        setMessage(data.message);
      } else if (data.message === "No orders found for this email") {
        setMessage(data.message);
      }else{
        setOrders(data.orders);
        setCurrentStep("VERIFY");
      }
    } catch (error) {
      console.error("API call failed:", error);
    }

    // if (signInMethod === "email" && !inputValue.includes("@")) return;
    // if (signInMethod === "sms" && !/^\+?\d{10,}$/.test(inputValue)) return;

    // setData((prev) => ({
    //   ...prev,
    //   signInMethod,
    //   signInValue: inputValue,
    // }));

    // // Go to verification step
    // setCurrentStep("VERIFY");
  };

  // const formatTime = (seconds) => {
  //   const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  //   const sec = String(seconds % 60).padStart(2, "0");
  //   return `${min}:${sec}`;
  // };

  // const handleResend = ()=>{
  //   console.log("codesend it again")
  // }

  return (
    <SignInContainer device={device}>
      <HeaderWrapper>
        <FaAngleLeft
          onClick={() => setCurrentState(chatWithFormStates.FORM)}
          style={{ cursor: "pointer" }}
        />
        <OfflineNotice>
          Ruff Greens Help Desk <br />
          <span className="back-online">
            <LuClock /> Back online at 5:00 PM
          </span>
        </OfflineNotice>
      </HeaderWrapper>

      {currentStep === "SIGN_IN" && (
        <SignInContent>
          <SignInTitle primaryColor={primaryColor}>Sign in</SignInTitle>
          {/* Sign-in fields */}
          <OptionContainer>
            <OptionButton
              active={signInMethod === "email"}
              primaryColor={primaryColor}
            >
              <RadioInput
                type="radio"
                name="signInMethod"
                value="email"
                checked={signInMethod === "email"}
                onChange={() => setSignInMethod("email")}
              />
              <span>Email</span>
            </OptionButton>
            <OptionButton
              active={signInMethod === "sms"}
              primaryColor={primaryColor}
            >
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
          <InputLabel>
            {signInMethod === "email" ? "Your email" : "Your phone number"}
            <RequiredMark>*</RequiredMark>
          </InputLabel>
          <InputField
            type={signInMethod === "email" ? "email" : "tel"}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (message) setMessage("");
            }}
            primaryColor={primaryColor}
          />

          {message && <TestMessage className="fade-in">{message}</TestMessage>}
          <HelpText>
            Can't sign in?{" "}
            <span
              onClick={() => setCurrentState(chatWithFormStates.CHAT_WIDGET)}
            >
              Send us a message
            </span>
          </HelpText>
          <SignInButton onClick={handleSignIn} primaryColor={primaryColor}>
            Sign In
          </SignInButton>
        </SignInContent>
      )}

      {currentStep === "VERIFY" && (
        <OrdersPage orders={orders}/>
      )}

      {/* {currentStep === "VERIFY" && (
        <VerificationContainer>
          <Title primaryColor={primaryColor}>Sign in</Title>

          <InfoText>
            Code sent to <strong>{inputValue}</strong>
          </InfoText>

          <SmallText>
            If you can't find the verification email, please check your spam and
            junk folders.
          </SmallText>

          <Label>
            6-digit code <RequiredMark>*</RequiredMark>
          </Label>
          <CodeInput
            type="text"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />

          <ExpireText>The From will automatically submit once you enter all 6 digits. Code expires in {formatTime(timer)}</ExpireText>

          <SignInButton primaryColor={primaryColor} onClick={handleResend}>
            Resend Code
          </SignInButton>
        </VerificationContainer>
      )} */}
    </SignInContainer>
  );
};

export default SignInForm;
