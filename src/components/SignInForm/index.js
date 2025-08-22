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
  const [timer, setTimer] = useState(""); // seconds (10 mins)
  const [orders, setOrders] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (currentStep === "VERIFY" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep, timer]);

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

      log("api data", data.expiryTime);
      if (data.expiryTime) {
        const secondsLeft = Math.floor((data.expiryTime - Date.now()) / 1000);
        setTimer(secondsLeft); // ⏱ initialize countdown
      }
      if (data.message === "No customer associated with this email") {
        setMessage(data.message);
      } else if (data.message === "No orders found for this email") {
        setMessage(data.message);
      } else {
        setOrders(data.orders);
        setCurrentStep("Orders");
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

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleVerifiy = async (e) => {
    const val = e.target.value.replace(/\D/g, "");
    console.log("val",val)
    if (message) setMessage("");
    setVerificationCode(val);
    if (val.length === 6) {
      try {
        const response = await fetch(
          "https://b0g5qyg9y1.execute-api.us-east-1.amazonaws.com/dev/otpVerify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: inputValue,
              otp: val,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Verification failed");
        }
        log("api data", data);
        if (data.verified) {
          // setOrders(data.orders || []); // backend should send orders
          setCurrentStep("Orders"); // ✅ move to next step
        } else {
          setMessage("Invalid code. Try again.");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleResend = () => {
    console.log("codesend it again");
  };

  const startChatSendMessage = (option) => {
    log("Start chat button clicked:", option);

    setData((prev) => ({
      ...prev,
      chatTopic: option,
    }));
    localStorage.setItem("chatTopic", JSON.stringify(option));

    setCurrentState(chatWithFormStates.CHAT_WIDGET);
  };

  return (
    <SignInContainer device={device}>
      {currentStep === "SIGN_IN" && (
        <>
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

            {message && (
              <TestMessage className="fade-in">{message}</TestMessage>
            )}
            <HelpText>
              Can't sign in?{" "}
              <span onClick={() => startChatSendMessage("Send us a message")}>
                Send us a message
              </span>
            </HelpText>
            <SignInButton onClick={handleSignIn} primaryColor={primaryColor}>
              Sign In
            </SignInButton>
          </SignInContent>
        </>
      )}

      {currentStep === "VERIFY" && (
        <>
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
          <VerificationContainer>
            <Title primaryColor={primaryColor}>Sign in</Title>

            <InfoText>
              Code sent to <strong>{inputValue}</strong>
            </InfoText>

            <SmallText>
              If you can't find the verification email, please check your spam
              and junk folders.
            </SmallText>

            <Label>
              6-digit code <RequiredMark>*</RequiredMark>{" "}
              {message && (
                <TestMessage className="fade-in">{message}</TestMessage>
              )}
            </Label>
            <CodeInput
              type="text"
              inputMode="numeric" 
              pattern="[0-9]*" 
              maxLength={6}
              value={verificationCode}
              onChange={(e) => handleVerifiy(e)}
            />
            {/* <ExpireText>
              The From will automatically submit once you enter all 6 digits.
              Code expires in {formatTime(timer)}
            </ExpireText> */}
            <ExpireText>
              {timer > 0
                ? `Code expires in ${formatTime(timer)}`
                : "Code expired. Please resend."}
            </ExpireText>

            <SignInButton primaryColor={primaryColor} onClick={handleResend} disabled={timer > 0}>
              Resend Code
            </SignInButton>
          </VerificationContainer>
        </>
      )}

      {currentStep === "Orders" && (
        <OrdersPage orders={orders} setCurrentStep={setCurrentStep} />
      )}
    </SignInContainer>
  );
};

export default SignInForm;
