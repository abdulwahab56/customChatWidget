import styled from "styled-components";

export const SignInContainer = styled.div`
  padding: 20px;
  margin-top: 15px;
  background-color: white;
  border-radius: 10px;
`;

export const SignInTitle = styled.h3`
  margin: 0 0 10px 0;
`;

export const OptionContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const OptionButton = styled.button`
  border: ${(props) =>
    props.active ? "2px solid blue" : "1px solid #ccc"};
  border-radius: 5px;
  padding: 5px 10px;
  background: ${(props) => (props.active ? "#e6f0fa" : "white")};
  cursor: pointer;

  span {
    color: ${(props) => (props.active ? "blue" : "black")};
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const HelpText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 90px;
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2a5f3d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;