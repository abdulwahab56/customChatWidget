import styled from "styled-components";


export const SignInContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 320px;
  height: 430px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: linear-gradient(rgb(2, 64, 18) 34%, rgba(255, 255, 255, 0.4));
  box-shadow: rgb(221, 221, 221) 0px 2px 3px;
  overflow: hidden;
  z-index: 999;

  @media ${(props) => props.device.laptop} {
        width: 380px;
        height: 420px;
        /* max-width: 350px; */
        /* max-height: 460px; */
        bottom: 85px;
        right: 80px;
  }
`;

export const HeaderWrapper = styled.div`
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
    fontweight: 400;
    gap: 5px;
  }
`;
export const NavBarWrap = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background: linear-gradient(rgb(2, 64, 18) 34%, rgba(255, 255, 255, 0.4));
`

export const LogOutButton = styled.div`
padding: 15px;
color: white;
`

export const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
  background-color: #ffff;
  padding: 20px;

  /* Optional: custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const OrderCard = styled.div`
  // background: #fff;
  // padding: 16px;
  // margin-bottom: 20px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  justify-content: space-between;
`;
export const ReportButton = styled.button`
  background: #f5f5f5;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 8px 0 12px;

  &:hover {
    background: #e0e0e0;
  }
`;
export const TestSummary = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #161616;
  margin: 0px 0px 20px;
`;
export const CustomerName = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: #161616;
  margin-bottom: 0px;
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
  gap: 5px
`;

export const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin: 5px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  font-size: 14px;
`;

export const ProductTitle = styled.div`
  font-weight: 500;
  color: #222;
`;

export const ProductPrice = styled.div`
  font-size: 13px;
  color: #666;
`;
export const PaymentInfor = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Payment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
    .paymentTotal {
    font-size: 20px;
    font-weight: 600;
  }
`;

export const PaymentDetail = styled.span``;


export const CustomerInfor = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`
