// import React, { useState, useContext } from "react";
// import { useAppConfig } from "../../providers/AppConfigProvider";
// import { chatWithFormStates } from "../../constants";
// import { genLogger } from "../../lib/logger";
// import {
//   SignInContainer,
//   SignInTitle,
//   OptionContainer,
//   OptionButton,
//   InputField,
//   HelpText,
//   SignInButton,
//   RadioInput,
//   RequiredMark,
//   InputLabel,
// } from "./styled";

// const name = "SignInForm";
// const { log } = genLogger(name);

// const SignInForm = ({ setData, setCurrentState }) => {
//   const { primaryColor } = useAppConfig();
//   const [signInMethod, setSignInMethod] = useState("email");
//   const [inputValue, setInputValue] = useState("");

//   const handleSignIn = () => {
//     if (signInMethod === "email" && !inputValue.includes("@")) {
//       log("Invalid email format");
//       return;
//     } else if (signInMethod === "sms" && !/^\+?\d{10,}$/.test(inputValue)) {
//       log("Invalid phone number format");
//       return;
//     }
//     log("Sign in with:", signInMethod, inputValue);
//     setData((prev) => ({
//       ...prev,
//       signInMethod,
//       signInValue: inputValue,
//     }));
//     setCurrentState(chatWithFormStates.CHAT_WIDGET);
//   };

//   return (
//     <SignInContainer id="chat-container">
//       <SignInTitle>Sign in</SignInTitle>
//       <OptionContainer>
//         <OptionButton active={signInMethod === "email"}>
//           <RadioInput
//             type="radio"
//             name="signInMethod"
//             value="email"
//             checked={signInMethod === "email"}
//             onChange={() => setSignInMethod("email")}
//           />
//           <span>Email</span>
//         </OptionButton>

//         <OptionButton active={signInMethod === "sms"}>
//           <RadioInput
//             type="radio"
//             name="signInMethod"
//             value="sms"
//             checked={signInMethod === "sms"}
//             onChange={() => setSignInMethod("sms")}
//           />
//           <span>SMS</span>
//         </OptionButton>
//       </OptionContainer>
//       <InputLabel
//         id="phone-label"
//         data-testid="phone-label"
//         htmlFor="signInInput"
//       >
//         {signInMethod === "email" ? "Your email" : "Your phone number"}
//         <RequiredMark>*</RequiredMark>
//       </InputLabel>

//       <InputField
//         id="signInInput"
//         type={signInMethod === "email" ? "email" : "tel"}
//         placeholder={
//           signInMethod === "email" ? "Your email*" : "Your phone number*"
//         }
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />

//       <HelpText>Can't sign in? Send us a message</HelpText>
//       <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
//     </SignInContainer>
//   );
// };

// export default SignInForm;

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
  ResendButton
} from "./styled";

const name = "SignInForm";
const { log } = genLogger(name);

// const SignInForm = ({ setData, setCurrentState }) => {
//   const { primaryColor } = useAppConfig();
//   const [signInMethod, setSignInMethod] = useState("email");
//   const [inputValue, setInputValue] = useState("");

//   const handleSignIn = () => {
//     if (signInMethod === "email" && !inputValue.includes("@")) {
//       log("Invalid email format");
//       return;
//     } else if (signInMethod === "sms" && !/^\+?\d{10,}$/.test(inputValue)) {
//       log("Invalid phone number format");
//       return;
//     }
//     log("Sign in with:", signInMethod, inputValue);
//     setData((prev) => ({
//       ...prev,
//       signInMethod,
//       signInValue: inputValue,
//     }));
//     setCurrentState(chatWithFormStates.CHAT_WIDGET);
//   };

//    const startChatDirectly = (text) => {
//       log("Start chat button clicked with text:", text);
//       setData((prev) => ({
//         ...prev,
//         chatTopic: text,
//       }));
//       setCurrentState(chatWithFormStates.CHAT_WIDGET);
//     };

//   return (
//     // JSX
//     <SignInContainer id="chat-container" device={device}>
//       <HeaderWrapper>
//         <span onClick={() => setCurrentState(chatWithFormStates.FORM)} style={{ cursor: "pointer" }}>
//           <FaAngleLeft />
//         </span>
//         <OfflineNotice>
//           Ruff Greens Help Desk <br />
//           <span className="back-online">
//             <LuClock />
//             <span>Back online at 5:00 PM</span>{" "}
//           </span>
//         </OfflineNotice>
//       </HeaderWrapper>

//       <SignInContent>
//         <SignInTitle primaryColor={primaryColor}>Sign in</SignInTitle>

//         <OptionContainer>
//           <OptionButton
//             active={signInMethod === "email"}
//             primaryColor={primaryColor}
//           >
//             <RadioInput
//               type="radio"
//               name="signInMethod"
//               value="email"
//               checked={signInMethod === "email"}
//               onChange={() => setSignInMethod("email")}
//             />
//             <span>Email</span>
//           </OptionButton>

//           <OptionButton
//             active={signInMethod === "sms"}
//             primaryColor={primaryColor}
//           >
//             <RadioInput
//               type="radio"
//               name="signInMethod"
//               value="sms"
//               checked={signInMethod === "sms"}
//               onChange={() => setSignInMethod("sms")}
//             />
//             <span>SMS</span>
//           </OptionButton>
//         </OptionContainer>

//         <InputLabel htmlFor="signInInput">
//           {signInMethod === "email" ? "Your email" : "Your phone number"}
//           <RequiredMark>*</RequiredMark>
//         </InputLabel>

//         <InputField
//           id="signInInput"
//           type={signInMethod === "email" ? "email" : "tel"}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           primaryColor={primaryColor}
//         />

//         <HelpText>Can't sign in? {" "}
//           <span   onClick={() => startChatDirectly(" Send us a message")}>
//             Send us a message
//             </span>
//           </HelpText>

//         <SignInButton onClick={handleSignIn} primaryColor={primaryColor}>
//           Sign In
//         </SignInButton>
//       </SignInContent>
//     </SignInContainer>
//   );
// };

const SignInForm = ({ setData, setCurrentState }) => {
  const { primaryColor } = useAppConfig();
  const [signInMethod, setSignInMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState("SIGN_IN"); // SIGN_IN or VERIFY
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(100); // seconds (10 mins)

  useEffect(() => {
    if (currentStep === "VERIFY" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep, timer]);

  const handleSignIn = () => {
    if (signInMethod === "email" && !inputValue.includes("@")) return;
    if (signInMethod === "sms" && !/^\+?\d{10,}$/.test(inputValue)) return;

    setData((prev) => ({
      ...prev,
      signInMethod,
      signInValue: inputValue,
    }));

    // Go to verification step
    setCurrentStep("VERIFY");
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleResend = ()=>{
    console.log("codesend it again")
  }

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
            onChange={(e) => setInputValue(e.target.value)}
            primaryColor={primaryColor}
          />

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
      )}
    </SignInContainer>
  );
};

export default SignInForm;
