import React from "react";
import {
  HeaderWrapper,
  OfflineNotice,
  OrderCard,
  OrderHeader,
  OrderId,
  OrderPrice,
  Shipment,
  CancelledTag,
  ProductWrapper,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
} from "./styled";
import { FaAngleLeft } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";

const OrderList = ({ orders, sortBy = "date" }) => {
  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "price") {
      return (
        parseFloat(b.totalPriceSet.shopMoney.amount) -
        parseFloat(a.totalPriceSet.shopMoney.amount)
      );
    }
    return 0;
  });

  return (
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
      {sortedOrders.map((order) => (
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

          {order.lineItems.edges.map(({ node }) => (
            <ProductWrapper key={node.title}>
              <ProductImage src={node.image?.url} alt={node.title} />
              <ProductInfo>
                <ProductTitle>{node.title}</ProductTitle>
                <ProductPrice>
                  ${order.totalPriceSet.shopMoney.amount} x {node.quantity}
                </ProductPrice>
              </ProductInfo>
            </ProductWrapper>
          ))}
        </OrderCard>
      ))}
    </>
  );
};

export default OrderList;
