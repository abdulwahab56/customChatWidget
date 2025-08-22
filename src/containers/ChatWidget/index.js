/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 */

import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useAppConfig } from "../../providers/AppConfigProvider";
import {
  device,
  chatWithFormStates,
  chatWidgetDefaults,
  chatParties,
  loggerNames,
} from "../../constants";
import { ChatContainer, ChatWrapper } from "./styled";
import { genLogger } from "../../lib/logger";

const name = loggerNames.containers.CHAT_WIDGET;
const { log, error, trace, info } = genLogger(name);

const ChatWidget = ({
  dataFromInputForm = {},
  setCurrentState = () => log("No Function"),
  setWidgetIsOpen,
  widgetIsOpen,
}) => {
  log(">>> Init");
  const [loading, setLoading] = useState(true);
  const [chatInitialized, setChatInitialized] = useState(false);
  const [toggleToForm, setToggleToForm] = useState(false);
  const {
    primaryColor,
    description,
    region,
    apiGateway,
    contactFlowId,
    instanceId,
    enableAttachments,
    name: configName,
    username: configUsername,
    contactAttr: configContactAttr,
  } = useAppConfig();
  if (Object.keys(dataFromInputForm).length !== 0)
    log("dataFromInputForm: ", dataFromInputForm);

  // Log chatTopic specifically for debugging
  // const chatTopic = dataFromInputForm.chatTopic?.chatTopic || "No topic";
  const { chatTopic } = dataFromInputForm;
  log("Chat topic received:", chatTopic);

  window.connect.ChatEvents &&
    window.connect.ChatEvents.onAgentEndChat(() => {
      setChatInitialized(false);
    });

  window.connect.ChatEvents &&
    window.connect.ChatEvents.onChatEnded(() => {
      setChatInitialized(false);
    });

  const successHandler = (chatSession) => {
    info("successHandler");
    log("chatsession", chatSession);
    log("chatsession", chatSession.contactId);

    const contactId = chatSession.contactId;
    localStorage.setItem("chatContactId", contactId);
    //   const existingContactId = localStorage.getItem("chatContactId");
    // if (!existingContactId && contactId) {
    //   localStorage.setItem("chatContactId", contactId);
    //   log("Saved new contactId:", contactId);
    // } else {
    //   log("ContactId already exists in localStorage:", existingContactId);
    // }

    setLoading(false);
    chatSession.incomingItemDecorator = function (item) {
      if ([chatParties.SYSTEM_MESSAGE].indexOf(item.displayName) !== -1) {
        item.displayName = "";
      }
      if ([chatParties.BOT].indexOf(item.displayName) !== -1) {
        item.displayName = "";
      }
      return item;
    };
    chatSession.onIncoming(function (data) {
      trace("incoming message:|| " + JSON.stringify(data));
    });

    chatSession.onOutgoing(function (data) {
      trace("outgoing message:|| " + JSON.stringify(data));
    });

    chatSession.onChatDisconnected(function (data) {
      info("Chat has been disconnected");
      trace(data);
      if (Object.keys(dataFromInputForm).length !== 0) setToggleToForm(true);
    });
    const widgetDiv = document.getElementById("chat-widget");
    if (!widgetDiv) return;

    let originalDisplay = null;

    function hideTarget() {
      const textArea = widgetDiv.querySelector(
        '[data-testid="customer-chat-attachment-icon"]'
      );
      if (textArea) {
        const flexContainer = textArea.closest("div.sc-elJkPf");
        if (flexContainer) {
          const targetDiv = flexContainer.querySelector("div:first-child");
          if (targetDiv) {
            if (originalDisplay === null) {
              originalDisplay =
                targetDiv.style.display ||
                window.getComputedStyle(targetDiv).display;
            }
            targetDiv.style.display = "none";
          }
        }
      }
    }

    function showTarget() {
      const textArea = widgetDiv.querySelector(
        '[data-testid="customer-chat-attachment-icon"]'
      );
      if (textArea) {
        const flexContainer = textArea.closest("div.sc-elJkPf");
        if (flexContainer) {
          const targetDiv = flexContainer.querySelector("div:first-child");
          if (targetDiv && originalDisplay !== null) {
            targetDiv.style.display = originalDisplay;
          }
        }
      }
    }

    const messageObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const messageBody = node.querySelector(
              '[data-testid="message-body"]'
            );
            if (messageBody) {
              const msg = messageBody.textContent.trim();
              const stored = localStorage.getItem("chatTopic");
              if (!stored) return;

              const topic = JSON.parse(stored);

              if (msg === "No, I need more help") {
                showTarget();

                // flip hide flag → so it won’t hide again until next option is picked
                topic.hide = false;
                localStorage.setItem("chatTopic", JSON.stringify(topic));
              } else if (topic.hide) {
                hideTarget();
              }
            }
          }
        });
      });
    });

    messageObserver.observe(widgetDiv, { childList: true, subtree: true });

    //   const widgetDiv = document.getElementById("chat-widget");
    //   if (!widgetDiv) return;

    //   let originalDisplay = null;

    //   function hideTarget() {
    //     const textArea = widgetDiv.querySelector(
    //       '[data-testid="customer-chat-attachment-icon"]'
    //     );
    //     if (textArea) {
    //       const flexContainer = textArea.closest("div.sc-elJkPf");
    //       if (flexContainer) {
    //         const targetDiv = flexContainer.querySelector("div:first-child");
    //         if (targetDiv) {
    //           if (originalDisplay === null) {
    //             originalDisplay =
    //               targetDiv.style.display ||
    //               window.getComputedStyle(targetDiv).display;
    //           }
    //           targetDiv.style.display = "none";
    //         }
    //       }
    //     }
    //   }

    //   function showTarget() {
    //     const textArea = widgetDiv.querySelector(
    //       '[data-testid="customer-chat-attachment-icon"]'
    //     );
    //     if (textArea) {
    //       const flexContainer = textArea.closest("div.sc-elJkPf");
    //       if (flexContainer) {
    //         const targetDiv = flexContainer.querySelector("div:first-child");
    //         if (targetDiv && originalDisplay !== null) {
    //           targetDiv.style.display = originalDisplay;
    //         }
    //       }
    //     }
    //   }

    //   // Messages that trigger hiding
    //  const hideIds = [1, 2, 3, 4];

    //   // Watch for new chat messages
    //   const messageObserver = new MutationObserver((mutations) => {
    //     mutations.forEach((mutation) => {
    //       mutation.addedNodes.forEach((node) => {
    //         if (node.nodeType === Node.ELEMENT_NODE) {
    //           const messageBody = node.querySelector(
    //             '[data-testid="message-body"]'
    //           );
    //           if (messageBody) {
    //             const msg = messageBody.textContent.trim();

    //             // Hide if message matches any in hideMessages
    //             if (hideMessages.includes(msg)) {
    //               hideTarget();
    //             }

    //             // Show for this specific message
    //             if (msg === "No, I need more help") {
    //               showTarget();
    //             }
    //           }
    //         }
    //       });
    //     });
    //   });

    //   messageObserver.observe(widgetDiv, { childList: true, subtree: true });
  };

  const failureHandler = (e) => {
    error("failed", e);
  };

  const getReferredData = (referralString, sourceData) => {
    log("getReferredData");
    log("referralString", referralString);
    log("sourceData", sourceData);
    let data = "";
    let [operator, whereToRefer, dataToRefer] = referralString.split("|");
    log("dataToRefer", dataToRefer);
    if (dataToRefer && sourceData.hasOwnProperty(dataToRefer)) {
      data = sourceData[dataToRefer];
    }
    if (dataToRefer && !sourceData.hasOwnProperty(dataToRefer)) {
      error(`Unable to find ${dataToRefer} in source data ${sourceData}`);
    }
    log("return data", data);
    return data;
  };

  const getNameAndUserName = (
    formData = {},
    initialPropertiesName = "",
    initialPropertiesUsername = ""
  ) => {
    log("Inside getNameAndUserName");
    let name = chatWidgetDefaults.NAME;
    let username = chatWidgetDefaults.USER_NAME;
    if (Object.keys(formData).length !== 0) {
      log(`formData`, formData);
      if (
        initialPropertiesName &&
        initialPropertiesName.includes(chatWidgetDefaults.REFER_INDICATOR)
      ) {
        name = getReferredData(initialPropertiesName, formData);
      }
      if (
        initialPropertiesUsername &&
        initialPropertiesUsername.includes(chatWidgetDefaults.REFER_INDICATOR)
      ) {
        username = getReferredData(initialPropertiesUsername, formData);
      }
    }
    if (Object.keys(formData).length === 0) {
      name = initialPropertiesName
        ? initialPropertiesName
        : chatWidgetDefaults.NAME;
      username = initialPropertiesUsername
        ? initialPropertiesUsername
        : chatWidgetDefaults.USER_NAME;
    }
    if (name.includes(chatWidgetDefaults.REFER_INDICATOR)) {
      error(
        `name field has value ${initialPropertiesName} which is not referenced correct`
      );
      name = chatWidgetDefaults.NAME;
    }
    if (username.includes(chatWidgetDefaults.REFER_INDICATOR)) {
      error(
        `username field has value ${initialPropertiesUsername} which is not referenced correct`
      );
      username = chatWidgetDefaults.USER_NAME;
    }
    return { name, username };
  };

  const getContactAttrsForContactFlow = (
    name = "",
    username = "",
    dataFromInputForm = {},
    initialPropertiesContAttrs,
    initialPropertiesName,
    initialPropertiesUsername
  ) => {
    log(">>> Inside getContactAttrsForContactFlow");
    let attrs = {};
    attrs.customerName = !initialPropertiesName.includes(
      chatWidgetDefaults.REFER_INDICATOR
    )
      ? name
      : chatWidgetDefaults.CUSTOMER_NAME;
    if (
      !initialPropertiesUsername.includes(chatWidgetDefaults.REFER_INDICATOR)
    ) {
      attrs.username = username;
    }
    if (dataFromInputForm) {
      log(
        `Appending ${JSON.stringify(dataFromInputForm)} to contact attributes`
      );
      attrs = { ...attrs, ...dataFromInputForm }; // Includes chatTopic
    }

    // Add stored contactId if exists
    const savedContactId = localStorage.getItem("chatContactId");
    if (savedContactId) {
      attrs.contactId = savedContactId;
      log("Reusing contactId from localStorage:", savedContactId);
    }

    // Dynamically set initialMessage from chatTopic
    if (chatTopic && chatTopic.text && chatTopic.text !== "No topic") {
      attrs.initialMessage = chatTopic.text; // Override or set initialMessage
      log("Setting initialMessage to:", chatTopic.text);
    }else if(chatTopic && chatTopic !== "No topic"){
      attrs.initialMessage = chatTopic; // Override or set initialMessage
      log("Setting initialMessage when no id:", chatTopic);
    }
    if (initialPropertiesContAttrs) {
      log(
        `Appending ${JSON.stringify(
          initialPropertiesContAttrs
        )} to contact attributes`
      );
      attrs = { ...attrs, ...initialPropertiesContAttrs };
    }
    log("Final contactAttrs:", attrs);
    return attrs;
  };

  const initializeChat = () => {
    const { name, username } = getNameAndUserName(
      dataFromInputForm,
      configName,
      configUsername
    );
    log("Name and username to initiate a chat connection: ", {
      name,
      username,
    });

    let contactAttrs = getContactAttrsForContactFlow(
      name,
      username,
      dataFromInputForm,
      configContactAttr,
      configName,
      configUsername
    );
    log("contactAttrs for contact flow: ", contactAttrs);

    let params = {
      name,
      username,
      region,
      apiGatewayEndpoint: apiGateway,
      contactAttributes: JSON.stringify(contactAttrs),
      contactFlowId,
      instanceId,
      featurePermissions: {
        ATTACHMENTS: !!enableAttachments,
      },
    };
    log("Params to initiate chat connection: ", params);

    try {
      window.connect.ChatInterface.initiateChat(
        params,
        successHandler,
        failureHandler
      );
      setChatInitialized(true);
    } catch (e) {
      error("window.connect.ChatInterface.initiateChat");
      error(e);
      setChatInitialized(false);
    }
  };

  useEffect(() => {
    log("useEffect");
    try {
      window.connect.ChatInterface.init({
        containerId: "chat-widget",
        headerConfig: {
          isHTML: true,
          render: () => {
            return `<div class="header-wrapper">
                                    <h2 class="welcome-text">${description}</h2>
                                </div>`;
          },
        },
      });
    } catch (e) {
      error("window.connect.ChatInterface.init");
      error(e);
    }
    if (toggleToForm && !widgetIsOpen) {
      setCurrentState(chatWithFormStates.FORM);
      setToggleToForm(false);
    }
    if (!chatInitialized && widgetIsOpen) {
      initializeChat();
    }
  }, [widgetIsOpen]);

  return (
    <ChatContainer id="chat-container" device={device}>
      <ChatWrapper
        id="chat-wrapper"
        primaryColor={primaryColor}
        device={device}
      >
        <div id="chat-widget"></div>
      </ChatWrapper>
      {loading && <Spinner primaryColor={primaryColor} />}
    </ChatContainer>
  );
};

export default ChatWidget;
