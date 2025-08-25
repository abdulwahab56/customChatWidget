import React from "react";
import {
  HeaderWrapper,
  OfflineNotice,
  OrderCard,
  OrderHeader,
  OrderId,
  Shipment,
  CancelledTag,
  ProductWrapper,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ReportButton,
  TestSummary,
  CustomerName,
  ScrollContainer,
  Payment,
  PaymentDetail,
  PaymentInfor
} from "./styled";
import { FaAngleLeft } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
const ProductItem = ({ product, orderAmount }) => (
  <ProductWrapper key={product.id || product.title}>
    <ProductImage src={product.image?.url} alt={product.title} />
    <ProductInfo>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>
        ${orderAmount} × {product.quantity}
      </ProductPrice>
    </ProductInfo>
  </ProductWrapper>
);

const OrderItem = ({ order, reportHandler }) => (
  <OrderCard>
    <OrderHeader>
      <OrderId>Order {order.name}</OrderId>
    </OrderHeader>
    <TestSummary>Summary</TestSummary>
    <Shipment>
      Shipment
      {order.displayFulfillmentStatus === "UNFULFILLED" && (
        <CancelledTag>Cancelled</CancelledTag>
      )}
    </Shipment>
    <ReportButton onClick={reportHandler}>Report issue</ReportButton>
    {order.lineItems?.edges?.map(({ node }) => (
      <ProductItem
        key={node.id || node.title}
        product={node}
        orderAmount={order.totalPriceSet?.shopMoney?.amount}
      />
    ))}
  </OrderCard>
);

const OrderList = ({ orders, setCurrentStep, reportHandler }) => {
  const orderList = orders?.orders || [];
  const country = orderList[0]?.shippingAddress?.country;
  const subtotal = orderList[0]?.subtotalPriceSet?.shopMoney.amount;
  const refunded = orderList[0]?.totalRefundedSet?.shopMoney.amount;
  const shipping = orderList[0]?.totalShippingPriceSet?.shopMoney.amount;
  const total = orderList[0]?.totalPriceSet?.shopMoney.amount;

  return (
    <>
      <HeaderWrapper>
        <FaAngleLeft
          onClick={() => setCurrentStep("SIGN_IN")}
          className="cursor-pointer"
        />
        <OfflineNotice>
          Ruff Greens Help Desk <br />
          <span className="back-online">
            <LuClock /> Back online at 5:00 PM
          </span>
        </OfflineNotice>
      </HeaderWrapper>

      <ScrollContainer>
        {orderList.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orderList.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              reportHandler={reportHandler}
            />
          ))
        )}

        <hr />
        <TestSummary>Shipping information</TestSummary>
        <CustomerName>{orders?.customer?.name}</CustomerName>
        <CustomerName>{country}</CustomerName>
        <hr />
        <TestSummary>Billing information</TestSummary>
        <CustomerName>{orders?.customer?.name}</CustomerName>
        <CustomerName>{country}</CustomerName>
        <hr />
        <TestSummary>Payment</TestSummary>
        <PaymentInfor>
        <Payment>
          <PaymentDetail>Subtotal (Inc.tax)</PaymentDetail>
          <PaymentDetail>Refunded</PaymentDetail>
          <PaymentDetail>Shipping</PaymentDetail>
          <PaymentDetail>Total</PaymentDetail>
        </Payment>
        <Payment>
          <PaymentDetail>${subtotal}</PaymentDetail>
          <PaymentDetail>${refunded}</PaymentDetail>
          <PaymentDetail>${shipping}</PaymentDetail>
          <PaymentDetail>${total}</PaymentDetail>
        </Payment> 
        </PaymentInfor>
      
      </ScrollContainer>
    </>
  );
};

export default OrderList;
