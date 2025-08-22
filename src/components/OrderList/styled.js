import styled from "styled-components";


export const HeaderWrapper = styled.div`
  background: linear-gradient(rgb(2, 64, 18) 34%, rgba(255, 255, 255, 0.4));
  color: #ebe7e7;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 14px;
  font-size: 0.95rem;
  font-weight: 500;
    
`;

export const OfflineNotice = styled.div`
  font-weight: 500;
  line-height: 1.6;
    .back-online {
    font-size: 12px;
    opacity: 0.7;
    display: flex;
    align-items: center;
    fontWeight: 400;
    gap: 5px;
    }
`;

export const OrderCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const OrderId = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

export const OrderPrice = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const Shipment = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CancelledTag = styled.span`
  background: #ffebeb;
  color: #d9534f;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 6px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

export const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const ProductPrice = styled.p`
  font-size: 13px;
  color: #666;
`;
