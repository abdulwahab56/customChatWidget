import React, { useState, useEffect } from "react";
import { useAppConfig } from "../../providers/AppConfigProvider";
import { chatWithFormStates, device } from "../../constants";
import { genLogger } from "../../lib/logger";
import { FaAngleLeft, FaGreaterThan } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import OrderList from "../OrderList";
import { useStateChange } from "../../providers/StateChangeProvider";
import {
  SignInContainer,
  NavBarWrap,
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
  LogOutButton, 
  Spinner
  // styled component
} from "./styled";

const { log } = genLogger("OrderPage");

const OrdersPage = ({ setCurrentState }) => {
  const { primaryColor } = useAppConfig();
  const { setCurrentStep } = useStateChange();
  const [reportButtonToggle, setReportButtonToggle] = useState(false);
  const [orderList, setOrderList] = useState("ORDER_LIST");
  const [orderListDetail, setOrderListDetail] = useState([]);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoding(true)
      try {
        // const email = localStorage.getItem("email");
        const url =
          "https://b0g5qyg9y1.execute-api.us-east-1.amazonaws.com/dev/orderDetails";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrderListDetail(data?.orders || []);
        setLoding(false)
        log("orderdeatil list", data?.orders || []);
      } catch (error) {
        console.error("API call failed:", error);
      }
    };
    fetchOrderDetail();
  }, []);

  const reportHandler = () => setReportButtonToggle(true);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setCurrentState(chatWithFormStates.FORM);
  };

  const helpOptions = [
    { id: 1, text: "I'd like to get a refund for this order" },
    { id: 2, text: "I'd like to reorder some items" },
    { id: 3, text: "Other" },
  ];

  return (
    <SignInContainer device={device}>
      {reportButtonToggle ? (
        <>
          {/* Report Issue View */}
          <NavBarWrap>
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
            <LogOutButton onClick={logoutHandler}>
              <FiLogOut style={{ cursor: "pointer" }} />
            </LogOutButton>
          </NavBarWrap>

          <OptionsContainer>
            <TextHelp>What is wrong with your order?</TextHelp>
            <OptionList device={device}>
              {helpOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  type="button"
                  onClick={() => setCurrentStep("CHAT", option)}
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
              {/* Order List View */}
              <NavBarWrap>
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
                <LogOutButton onClick={logoutHandler}>
                  <FiLogOut style={{ cursor: "pointer" }} />
                </LogOutButton>
              </NavBarWrap>

              <PageWrapper onClick={() => setOrderList("ORDER_DETAIL")}>
                <SectionTitle>Your orders</SectionTitle>
                {loading ? <Spinner/>: <>
                {orderListDetail.map((order) => (
                  <OrderCard key={order.id}>
                    <OrderHeader>
                      <OrderId>Order {order.name}</OrderId>
                      <OrderPrice>
                        ${order.totalPriceSet?.shopMoney?.amount}{" "}
                        {order.totalPriceSet?.shopMoney?.currencyCode}
                      </OrderPrice>
                    </OrderHeader>

                    <Shipment>
                      Shipment
                      {order.displayFulfillmentStatus === "UNFULFILLED" && (
                        <CancelledTag>Cancelled</CancelledTag>
                      )}
                    </Shipment>

                    <ReportButton onClick={reportHandler}>
                      Report issue
                    </ReportButton>

                    {order.lineItems?.edges?.map(({ node }) => (
                      <ProductWrapper key={node.id || node.title}>
                        <ProductImage
                          src={node.image?.url}
                          alt={node.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null; // prevent infinite loop
                            e.currentTarget.src =
                              "https://via.placeholder.com/60?text=No+Image"; // 👈 dummy fallback
                          }}
                        />
                        <ProductInfo>
                          <ProductTitle>{node.title}</ProductTitle>
                          <ProductPrice>
                            ${order.totalPriceSet?.shopMoney?.amount} ×{" "}
                            {node.quantity}
                          </ProductPrice>
                        </ProductInfo>
                      </ProductWrapper>
                    ))}
                  </OrderCard>
                ))}
                </>}
                
              </PageWrapper>

              <Footer>
                <HelpText>Need more help?</HelpText>
                <MessageButton>Send Us A Message</MessageButton>
              </Footer>
            </>
          )}

          {orderList === "ORDER_DETAIL" && (
            <OrderList
              orders={orderListDetail}
              reportHandler={reportHandler}
              logoutHandler={logoutHandler}
              goBack={() => setOrderList("ORDER_LIST")}
            />
          )}
        </>
      )}
    </SignInContainer>
  );
};

export default OrdersPage;
