// /*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0 */

// import React, { createRef, useRef, useContext } from "react";
// import { TbMathGreater } from "react-icons/tb";
// import { useAppConfig } from "../../providers/AppConfigProvider";
// import {
//   device,
//   chatWithFormStates,
//   loggerNames,
//   inputFieldValidations,
// } from "../../constants";
// import InputField from "../../components/InputField";
// import {
//   FormSection,
//   SubmitButton,
//   FormHeader,
//   OptionButton,
//   OptionList,
//   OptionsContainer
// } from "./styled";
// import { GrSend } from "react-icons/gr";
// import { FaGreaterThan } from "react-icons/fa6";
// import { genLogger } from "../../lib/logger";

// const name = loggerNames.containers.CHAT_FORM;
// const { log } = genLogger(name);

// const ChatForm = ({ setData, setCurrentState }) => { 
//   log(">>> Init");
//   const {
//     primaryColor,
//     description,
//     preChatForm: { inputFields },
//   } = useAppConfig();
//   const inputRefs = useRef(inputFields.map((field) => createRef()));
//   const handleInputDataChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Updated handler to include the button text
//   const startChatDirectly = (text) => {
//     log("Start chat button clicked with text:", text);
//     setData((prev) => ({
//       ...prev,
//       chatTopic: text, // Store the button text as 'chatTopic'
//     }));
//     setCurrentState(chatWithFormStates.CHAT_WIDGET);
//   };
//   // Sample help desk options
//   const helpOptions = [
//     "What is your Return Policy?",
//     "Ways to Administer Ruff Greens",
//     "What ingredients are in Ruff Greens?",
//     "How much should I give my pet?",
//   ];

//   return (
//     <FormSection device={device}>
//       <FormHeader primaryColor={primaryColor} device={device}>
//         <h3 className="preChatForm-welcome-text">{description}</h3>
//         <span>We will be back after we walk the dog!</span>
//       </FormHeader>
//       <OptionsContainer>
//         <OptionList device={device}>
//           {helpOptions.map((option, index) => (
//             <OptionButton
//               className="optionbutton"
//               key={index}
//               type="button"
//               onClick={() => startChatDirectly(option)}
//             >
//               {option} <FaGreaterThan />
//             </OptionButton>
//           ))}
//         </OptionList>
//         <SubmitButton 
//         type="button"
//         onClick={() => startChatDirectly("Track and manage my orders")}>
//           <div className="trackmessage-chat">
//             <span>
//               Track and manage my orders
//             </span>
//             <span><FaGreaterThan /></span> 
//           </div>
          
//         </SubmitButton>
//         <SubmitButton 
//         type="button" 
//         onClick={() => startChatDirectly("Leave a message")}
//         largeIcon={true}
//         >
//             <div className="leaveMsessage-chat">
//                 <span>Ruff Greens Help Desk</span>
//                 <span className="leaveMessage-subheadingclr">Leave a message</span>
//             </div>
//             <GrSend/>
          
//         </SubmitButton>
//       </OptionsContainer>
//     </FormSection>
//   );
// };

// export default ChatForm;




import React, { createRef, useRef, useState, useContext } from "react";
import { useAppConfig } from "../../providers/AppConfigProvider";
import {
  device,
  chatWithFormStates,
  loggerNames,
  inputFieldValidations,
} from "../../constants";
import SignInForm from "../../components/SignInForm"
import InputField from "../../components/InputField";
import {
  FormSection,
  SubmitButton,
  FormHeader,
  OptionButton,
  OptionList,
  OptionsContainer,
} from "./styled";
import { GrSend } from "react-icons/gr";
import { FaGreaterThan } from "react-icons/fa6";
import { genLogger } from "../../lib/logger";

const name = loggerNames.containers.CHAT_FORM;
const { log } = genLogger(name);

const ChatForm = ({ setData, setCurrentState }) => {
  log(">>> Init");
  const {
    primaryColor,
    description,
    preChatForm: { inputFields },
  } = useAppConfig();
  const inputRefs = useRef(inputFields.map((field) => createRef()));
  const [showSignInForm, setShowSignInForm] = useState(false); // New state for sign-in form
  const [signInMethod, setSignInMethod] = useState("email"); // Default to email
  const [inputValue, setInputValue] = useState(""); // For phone/email input

  const handleInputDataChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startChatDirectly = (text) => {
    log("Start chat button clicked with text:", text);
    setData((prev) => ({
      ...prev,
      chatTopic: text,
    }));
    setCurrentState(chatWithFormStates.CHAT_WIDGET);
  };

  // Handle sign-in form submission
  const handleSignIn = () => {
    if (signInMethod === "email" && !inputValue.includes("@")) {
      log("Invalid email format");
      return; // Basic validation
    } else if (signInMethod === "sms" && !/^\+?\d{10,}$/.test(inputValue)) {
      log("Invalid phone number format");
      return; // Basic validation
    }
    log("Sign in with:", signInMethod, inputValue);
    setData((prev) => ({
      ...prev,
      signInMethod,
      signInValue: inputValue,
    }));
    setCurrentState(chatWithFormStates.CHAT_WIDGET); // Proceed to chat after sign-in
  };

  // Sample help desk options
  const helpOptions = [
    "What is your Return Policy?",
    "Ways to Administer Ruff Greens",
    "What ingredients are in Ruff Greens?",
    "How much should I give my pet?",
  ];

  return (
    <FormSection device={device}>
      <FormHeader primaryColor={primaryColor} device={device}>
        <h3 className="preChatForm-welcome-text">{description}</h3>
        <span>We will be back after we walk the dog!</span>
      </FormHeader>
      {!showSignInForm ? (
        <OptionsContainer>
          <OptionList device={device}>
            {helpOptions.map((option, index) => (
              <OptionButton
                className="optionbutton"
                key={index}
                type="button"
                onClick={() => startChatDirectly(option)}
              >
                {option} <FaGreaterThan />
              </OptionButton>
            ))}
          </OptionList>
          <SubmitButton
            type="button"
            onClick={() => setShowSignInForm(true)} // Show sign-in form instead of starting chat
          >
            <div className="trackmessage-chat">
              <span>Track and manage my orders</span>
              <span><FaGreaterThan /></span>
            </div>
          </SubmitButton>
          <SubmitButton
            type="button"
            onClick={() => startChatDirectly("Leave a message")}
            largeIcon={true}
          >
            <div className="leaveMsessage-chat">
              <span>Ruff Greens Help Desk</span>
              <span className="leaveMessage-subheadingclr">Leave a message</span>
            </div>
            <GrSend />
          </SubmitButton>
        </OptionsContainer>
      ) : (
        // Sign-in form UI based on the screenshot
       <SignInForm setData={setData} setCurrentState={setCurrentState} />
      )}
    </FormSection>
  );
};

export default ChatForm;