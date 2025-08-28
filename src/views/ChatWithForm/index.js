import React from "react";
import ChatIcon from "../../components/ChatIcon";
import ChatButton from "../../components/ChatButton";
import { useAppConfig } from "../../providers/AppConfigProvider";
import ChatForm from "../../containers/ChatForm";
import ChatWidget from "../../containers/ChatWidget";
import SignInForm from "../../components/SignInForm";
import { device, chatWithFormStates, chatInitiationIcon, loggerNames } from "../../constants";
import { CSSTransition } from "react-transition-group";
import { Main } from "./styled";
import { genLogger } from "../../lib/logger";
import OrdersPage from "../../components/OrderPage";
import { ChatProvider, useChatContext } from "../../providers/ChatContext";

const name = loggerNames.views.CHAT_WITH_FORM;
const { log } = genLogger(name);

const ChatContent = () => {
  const { widgetIsOpen, setWidgetIsOpen, currentState, data } = useChatContext();
  const { initiationIcon } = useAppConfig();

  return (
    <Main device={device}>
      {initiationIcon.toLowerCase() === chatInitiationIcon.BUTTON ? (
        <ChatButton
          widgetIsOpen={widgetIsOpen}
          setWidgetIsOpen={setWidgetIsOpen}
          currentState={currentState}
        />
      ) : (
        <ChatIcon
          widgetIsOpen={widgetIsOpen}
          setWidgetIsOpen={setWidgetIsOpen}
          currentState={currentState}
        />
      )}

      <div style={{ display: widgetIsOpen ? null : "none" }}>
        <CSSTransition
          in={widgetIsOpen}
          timeout={400}
          classNames="widget-transition"
          mountOnEnter
          appear
          onExited={() => setWidgetIsOpen(false)}
        >
          <>
          {currentState ===chatWithFormStates.FORM ? <ChatForm/> : null }
          {currentState ===chatWithFormStates.SIGN_IN ? <SignInForm/> : null }
          {currentState ===chatWithFormStates.ORDERS ? <OrdersPage/> : null }
          {currentState ===chatWithFormStates.CHAT_WIDGET ? <ChatWidget/> : null }
          </>
        </CSSTransition>
      </div>
    </Main>
  );
};

const ChatWithForm = () => {
  log(">> Init");
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
};

export default ChatWithForm;
