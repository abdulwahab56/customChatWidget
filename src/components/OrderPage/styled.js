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
export const OptionsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  padding: 20px;
 
`;

export const TextHelp = styled.h3`
      color: #000000ff
    
`

export const OptionList = styled.div`

    .optionbutton{
      color: #000000ff;
    }
`;

export const OptionButton = styled.button`
  background: none;
  border: none;
  color: #2e7d32;
  font-size: 14px;
  width: 100%;
  text-align: left;
  padding: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffffff33; /* Light border for separation */

  &:hover {
    background-color: #bdf5c0ff; /* Slightly lighter green on hover */
  }

  span {
    font-size: 16px;
  }
`;

export const PageWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: #ffff;
  position: relative;
  height: 100%;
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
  padding: 10px 15px;
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
  position: fixed;
  bottom: 86px;
  right: 80px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.09) 0px -4px 4px, rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.16) 0px 1px 3px;
  padding: 6px;
  width: 368px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HelpText = styled.span`
  font-size: 14px;
  color: #555;
  margin-left: 20px;
`;

export const MessageButton = styled.button`
  background: #004d25;
  margin-left: 85px;
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