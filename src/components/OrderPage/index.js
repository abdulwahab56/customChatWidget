import React from "react";
import {
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

const OrdersPage = ({ orders }) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
   <PageWrapper>
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

          <ReportButton>Report issue</ReportButton>

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

      <Footer>
        <HelpText>Need more help?</HelpText>
        <MessageButton>Send Us A Message</MessageButton>
      </Footer>
    </PageWrapper>
  );
};

export default OrdersPage;

