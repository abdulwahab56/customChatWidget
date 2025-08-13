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

export const SignInContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #ffffff;
`;

export const SignInTitle = styled.h2`
  color: ${(props) => props.primaryColor || "#3F5773"};
  margin-bottom: 8px;
  text-align: start;
`;

export const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const OptionButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 5px;
  border: 2px solid
    ${(props) => (props.active ? props.primaryColor : "transparent")};
  background-color: ${(props) =>
    props.active ? props.primaryColor + "22" : "transparent"};
  color: ${(props) => (props.active ? props.primaryColor : "#111")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: all 0.3s ease;
  width:50%;
  &:hover {
    border-color: ${(props) => props.primaryColor};
    color: ${(props) => props.primaryColor};
  }
`;

export const RadioInput = styled.input`
  margin-right: 8px;
`;

export const InputLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

export const RequiredMark = styled.span`
  color: red;
  margin-left: 2px;
`;

export const InputField = styled.input`
  padding: 10px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: AmazonEmber_Md, Helvetica, sans-serif;
  outline-color: ${(props) => props.primaryColor || "#3F5773"};

  &:focus {
    border-color: ${(props) => props.primaryColor || "#3F5773"};
    box-shadow: 0 0 5px ${(props) => props.primaryColor || "#3F5773"};
  }
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: ${(props) => props.primaryColor || "#3F5773"};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: AmazonEmber_Md, Helvetica, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 3px 0;
`;

export const HelpText = styled.p`
  font-size: 0.92rem;
  color: #777;
  margin-top: -6px;
  margin-bottom: 0px;
  margin-top: 70px;
  text-align: center;
   span {
   color: rgb(2, 64, 18);
   fontWeight: 500;
   &:hover {
    color: rgba(59, 189, 92, 1);
    cursor: pointer;

  }
   
   }
`;

export const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 10px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  height: 100%;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${props => props.primaryColor || "#000"};
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;

  strong {
    font-weight: bold;
  }
`;

export const SmallText = styled.p`
  font-size: 12px;
  color: #555;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`;


export const CodeInput = styled.input`
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

export const ExpireText = styled.p`
  font-size: 12px;
  color: #777;
  margin-bottom: 50px;
`;

export const ResendButton = styled.button`
  background: transparent;
  color: ${props => props.primaryColor || "#0a7cff"};
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  padding: 5px;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

