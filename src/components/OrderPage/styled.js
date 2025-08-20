import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #ffff;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: #222;
`;

export const OrderCard = styled.div`
  margin-bottom: 16px;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const OrderId = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

export const OrderPrice = styled.span`
  font-weight: 600;
  color: #111;
`;

export const Shipment = styled.p`
  font-size: 14px;
  color: #555;
  margin: 4px 0;
`;

export const CancelledTag = styled.span`
  background: #ffe5e5;
  color: #d93025;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  margin-left: 8px;
`;

export const ReportButton = styled.button`
  background: #f5f5f5;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 8px 0 12px;

  &:hover {
    background: #e0e0e0;
  }
`;

export const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  font-size: 14px;
`;

export const ProductTitle = styled.div`
  font-weight: 500;
  color: #222;
`;

export const ProductPrice = styled.div`
  color: #444;
`;

export const Footer = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  argin-top: 65px;
`;

export const HelpText = styled.span`
  font-size: 14px;
  color: #555;
`;

export const MessageButton = styled.button`
  background: #004d25;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #006633;
  }
`;