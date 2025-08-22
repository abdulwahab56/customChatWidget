import React, { useState } from "react";
import { useAppConfig } from "../../providers/AppConfigProvider";
import { chatWithFormStates, device } from "../../constants";
import { genLogger } from "../../lib/logger";
import { FaAngleLeft } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { FaGreaterThan } from "react-icons/fa6";
import OrderList from "../OrderList";
import {
  SignInContainer,
  HeaderWrapper,
  OfflineNotice,
  OptionsContainer,
  OptionList,
  OptionButton,
  TextHelp,
  PageWrapper,
  OrderCard,
  OrderHeader,
  SectionTitle,
  OrderId,
  OrderPrice,
  Shipment,
  CancelledTag,
  ReportButton,
  ProductWrapper,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  Footer,
  HelpText,
  MessageButton,
} from "./styled";

const name = "OrderPage";
const { log } = genLogger(name);

const OrdersPage = ({ orders, setCurrentStep }) => {
  const { primaryColor } = useAppConfig();
  const [reportButtonToggle, setReportButtonToggle] = useState(false);
  const [orderList, setOrderList] = useState("ORDER_LIST")
  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>No orders found</p>;
  }

  const reportHandler = () => {
    setReportButtonToggle(true);
  };
  const helpOptions = [
    { id: 1, text: "I'd like to get a refund for this order", hide: true },
    { id: 2, text: "I'd like to reorder some items", hide: true },
    { id: 3, text: "Other", hide: true },
  ];

  return (
    <SignInContainer device={device}>
      {reportButtonToggle ? (
        <>
          <HeaderWrapper>
            <FaAngleLeft
              onClick={() => setReportButtonToggle(false)}
              style={{ cursor: "pointer" }}
            />
            <OfflineNotice>
              Ruff Greens Help Desk <br />
              <span className="back-online">
                <LuClock /> Back online at 5:00 PM
              </span>
            </OfflineNotice>
          </HeaderWrapper>
          <OptionsContainer>
            <TextHelp>What is wrong with your order?</TextHelp>
            <OptionList device={device}>
              {helpOptions.map((option) => (
                <OptionButton
                  className="optionbutton"
                  key={option.id}
                  type="button"
                  onClick={() => startChatDirectly(option)}
                >
                  {option.text} <FaGreaterThan />
                </OptionButton>
              ))}
            </OptionList>
          </OptionsContainer>
        </>
      ) : (
        <>
          {orderList === "ORDER_LIST" && (
            <>
             <HeaderWrapper>
            <FaAngleLeft
              onClick={() => setCurrentStep("SIGN_IN")}
              style={{ cursor: "pointer" }}
            />
            <OfflineNotice>
              Ruff Greens Help Desk <br />
              <span className="back-online">
                <LuClock /> Back online at 5:00 PM
              </span>
            </OfflineNotice>
          </HeaderWrapper>
          <PageWrapper onClick={()=> setOrderList("ORDER_DETAIL")}>
            <SectionTitle>Your orders</SectionTitle>
            {orders.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <OrderId>Order {order.name}</OrderId>
                  <OrderPrice>
                    ${order.totalPriceSet.shopMoney.amount}{" "}
                    {order.totalPriceSet.shopMoney.currencyCode}
                  </OrderPrice>
                </OrderHeader>

                <Shipment>
                  Shipment
                  {order.displayFulfillmentStatus === "CANCELLED" && (
                    <CancelledTag>Cancelled</CancelledTag>
                  )}
                </Shipment>

                <ReportButton
                  onClick={() => {
                    reportHandler();
                  }}
                >
                  Report issue
                </ReportButton>

                {order.lineItems.edges.map(({ node }) => (
                  <ProductWrapper key={node.title}>
                    <ProductImage src={node.image?.url} alt={node.title} />
                    <ProductInfo>
                      <ProductTitle>{node.title}</ProductTitle>
                      <ProductPrice>
                        ${order.totalPriceSet.shopMoney.amount} x{" "}
                        {node.quantity}
                      </ProductPrice>
                    </ProductInfo>
                  </ProductWrapper>
                ))}
              </OrderCard>
            ))}
          </PageWrapper>
          <Footer>
            <HelpText>Need more help?</HelpText>
            <MessageButton>Send Us A Message</MessageButton>
          </Footer>
            </>
            
          )}
          {orderList === "ORDER_DETAIL" && (<OrderList orders={orders} />)}
        </>
      )}
    </SignInContainer>
  );
};

export default OrdersPage;
