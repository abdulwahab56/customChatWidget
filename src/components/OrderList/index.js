import React from "react";
import { device } from "../../constants";
import {
  SignInContainer,
  HeaderWrapper,
  OfflineNotice,
  NavBarWrap,
  LogOutButton,
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
  PaymentInfor,
  CustomerInfor,
} from "./styled";
import { FaAngleLeft } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
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

const OrderList = ({ orders, reportHandler, logoutHandler, goBack }) => {
  const orderList = orders?.orders || [];
  const country = orderList[0]?.shippingAddress?.country || "";
  const subtotal = orderList[0]?.subtotalPriceSet?.shopMoney?.amount || 0;
  const refunded = orderList[0]?.totalRefundedSet?.shopMoney?.amount || 0;
  const shipping = orderList[0]?.totalShippingPriceSet?.shopMoney?.amount || 0;
  const total = orderList[0]?.totalPriceSet?.shopMoney?.amount || 0;
  const products = orderList[0]?.lineItems?.edges

  return (
    <SignInContainer device={device}>
      <NavBarWrap>
        <HeaderWrapper>
          <FaAngleLeft onClick={goBack} style={{ cursor: "pointer" }} />
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

      <ScrollContainer>
        {orderList.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            reportHandler={reportHandler}
          />
        ))}
        {products.length > 1 ? (
          <>
            <hr />
            <TestSummary>Payment</TestSummary>
            <PaymentInfor>
              <Payment>
                <PaymentDetail>Subtotal (Inc.tax)</PaymentDetail>
                <PaymentDetail>Refunded</PaymentDetail>
                <PaymentDetail>Shipping</PaymentDetail>
                <PaymentDetail className="paymentTotal">Total</PaymentDetail>
              </Payment>
              <Payment>
                <PaymentDetail>${subtotal}</PaymentDetail>
                <PaymentDetail>${refunded}</PaymentDetail>
                <PaymentDetail>${shipping}</PaymentDetail>
                <PaymentDetail className="paymentTotal">${total}</PaymentDetail>
              </Payment>
            </PaymentInfor>
            
          </>
         
        ) : (

           <>
            <hr />
            <TestSummary>Shipping information</TestSummary>
            <CustomerInfor>
              <CustomerName>{orders?.customer?.name}</CustomerName>
              <CustomerName>{country}</CustomerName>
            </CustomerInfor>

            <hr />
            <TestSummary>Billing information</TestSummary>
            <CustomerInfor>
              <CustomerName>{orders?.customer?.name}</CustomerName>
              <CustomerName>{country}</CustomerName>
            </CustomerInfor>
            <hr />
            <TestSummary>Payment</TestSummary>
            <PaymentInfor>
              <Payment>
                <PaymentDetail>Subtotal (Inc.tax)</PaymentDetail>
                <PaymentDetail>Refunded</PaymentDetail>
                <PaymentDetail>Shipping</PaymentDetail>
                <PaymentDetail className="paymentTotal">Total</PaymentDetail>
              </Payment>
              <Payment>
                <PaymentDetail>${subtotal}</PaymentDetail>
                <PaymentDetail>${refunded}</PaymentDetail>
                <PaymentDetail>${shipping}</PaymentDetail>
                <PaymentDetail className="paymentTotal">${total}</PaymentDetail>
              </Payment>
            </PaymentInfor>
          </>
        )}
      </ScrollContainer>
    </SignInContainer>
  );
};

export default OrderList;
