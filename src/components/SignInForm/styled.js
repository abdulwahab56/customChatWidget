// 


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
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const OptionButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  border: ${(props) =>
    props.active ? "2px solid #115cb5" : "1px solid #d2d7de"};
  border-radius: 5px;
  padding: 10px 10px;
  width: 50%;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #e8eaecff;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  display: inline-block;
  position: relative;

  &:checked {
    border-color: #115cb5;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 8px;
    height: 8px;
    background-color: blue;
    border-radius: 50%;
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


export const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
`;

export const RequiredMark = styled.span`
  color: red;
  margin-left: 2px;
`;

