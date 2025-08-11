// // //

// // import styled from "styled-components";

// // export const SignInContainer = styled.div`
// //   padding: 20px;
// //   margin-top: 15px;
// //   background-color: white;
// //   border-radius: 10px;
// // `;

// // export const SignInTitle = styled.h3`
// //   margin: 0 0 10px 0;
// // `;

// // export const OptionContainer = styled.div`
// //   display: flex;
// //   gap: 10px;
// //   margin-bottom: 10px;
// //   align-items: center;
// //   justify-content: space-around;
// //   width: 100%;
// // `;

// // export const OptionButton = styled.label`
// //   display: flex;
// //   align-items: center;
// //   gap: 8px;
// //   font-weight: 500;
// //   font-size: 13px;
// //   line-height: 16px;
// //   border: ${(props) =>
// //     props.active ? "2px solid #115cb5" : "1px solid #d2d7de"};
// //   border-radius: 5px;
// //   padding: 10px 10px;
// //   width: 50%;
// //   cursor: pointer;
// // `;

// // export const RadioInput = styled.input`
// //   appearance: none;
// //   -webkit-appearance: none;
// //   width: 16px;
// //   height: 16px;
// //   border: 2px solid #e8eaecff;
// //   border-radius: 50%;
// //   outline: none;
// //   cursor: pointer;
// //   display: inline-block;
// //   position: relative;

// //   &:checked {
// //     border-color: #115cb5;
// //   }

// //   &:checked::after {
// //     content: "";
// //     position: absolute;
// //     top: 2px;
// //     left: 2px;
// //     width: 8px;
// //     height: 8px;
// //     background-color: blue;
// //     border-radius: 50%;
// //   }
// // `;

// // export const InputField = styled.input`
// //   width: 100%;
// //   padding: 10px;
// //   margin-bottom: 10px;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// //   box-sizing: border-box;
// // `;

// // export const HelpText = styled.p`
// //   font-size: 12px;
// //   color: #666;
// //   margin-top: 90px;
// // `;

// // export const SignInButton = styled.button`
// //   width: 100%;
// //   padding: 10px;
// //   background-color: #2a5f3d;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   margin-top: 10px;
// // `;

// // export const InputLabel = styled.label`
// //   display: block;
// //   font-size: 14px;
// //   margin-bottom: 5px;
// //   font-weight: 500;
// //   color: #333;
// // `;

// // export const RequiredMark = styled.span`
// //   color: red;
// //   margin-left: 2px;
// // `;

// import styled from "styled-components";

// export const SignInContainer = styled.div`
//   padding: 24px;
//   margin-top: 20px;
//   background-color: white;
//   border-radius: 12px;
//   max-width: 420px;
//   margin-left: auto;
//   margin-right: auto;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
// `;

// export const SignInTitle = styled.h3`
//   margin: 0 0 16px 0;
//   font-size: 20px;
//   font-weight: 600;
//   color: #222;
//   text-align: center;
// `;

// export const OptionContainer = styled.div`
//   display: flex;
//   gap: 12px;
//   margin-bottom: 16px;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
// `;

// export const OptionButton = styled.label`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   font-weight: 500;
//   font-size: 13px;
//   border: ${(props) =>
//     props.active ? "2px solid #115cb5" : "1px solid #d2d7de"};
//   border-radius: 6px;
//   padding: 10px;
//   width: 50%;
//   cursor: pointer;
//   background-color: ${(props) => (props.active ? "#f0f7ff" : "white")};
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: #f7f9fc;
//   }
// `;

// export const RadioInput = styled.input`
//   appearance: none;
//   width: 16px;
//   height: 16px;
//   border: 2px solid #e8eaec;
//   border-radius: 50%;
//   outline: none;
//   cursor: pointer;
//   display: inline-block;
//   position: relative;

//   &:checked {
//     border-color: #115cb5;
//   }

//   &:checked::after {
//     content: "";
//     position: absolute;
//     top: 2px;
//     left: 2px;
//     width: 8px;
//     height: 8px;
//     background-color: #115cb5;
//     border-radius: 50%;
//   }
// `;

// export const InputLabel = styled.label`
//   display: block;
//   font-size: 14px;
//   font-weight: 600;
//   margin-bottom: 6px;
//   color: #444;
// `;

// export const RequiredMark = styled.span`
//   color: red;
//   margin-left: 4px;
//   font-size: 14px;
//   vertical-align: middle;
// `;

// export const InputField = styled.input`
//   width: 100%;
//   padding: 10px 12px;
//   margin-bottom: 14px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   box-sizing: border-box;
//   font-size: 14px;

//   &:focus {
//     border-color: #115cb5;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(17, 92, 181, 0.2);
//   }
// `;

// export const HelpText = styled.p`
//   font-size: 12px;
//   color: #666;
//   margin-top: 80px;
//   text-align: center;
// `;

// export const SignInButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: #2a5f3d;
//   color: white;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-top: 10px;
//   font-size: 15px;
//   font-weight: 500;
//   transition: background-color 0.2s ease;

//   &:hover {
//     background-color: #244f34;
//   }
// `;

/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 */

import styled from "styled-components";

export const SignInContainer = styled.div`
  @media ${(props) => props.device.laptop} {
    width: 100%;
    height: 100%;
    max-width: 448px;
    max-height: 630px;
    bottom: 15px;
    right: 75px;
  }
  position: fixed;
  bottom: 65px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3px;
  margin-left: 3px;
  float: left;
  overflow: auto;
  border-radius: 5px 5px 45px 5px;
  z-index: 999;
`;

export const SignInTitle = styled.h2`
  color: ${(props) => (props.primaryColor ? props.primaryColor : "#3F5773")};
  margin-bottom: 16px;
  text-align: center;
`;

export const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  gap: 20px;
`;

export const OptionButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 5px;
  border: 2px solid
    ${(props) => (props.active ? props.primaryColor : "transparent")};
  background-color: ${(props) =>
    props.active ? props.primaryColor + "22" : "transparent"};
  color: ${(props) => (props.active ? props.primaryColor : "#111")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.primaryColor};
    color: ${(props) => props.primaryColor};
  }
`;

export const RadioInput = styled.input`
  margin-right: 8px;
`;

export const InputLabel = styled.label`
  align-self: flex-start;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
`;

export const RequiredMark = styled.span`
  color: red;
  margin-left: 2px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: AmazonEmber_Md, Helvetica, sans-serif;
  outline-color: ${(props) =>
    props.primaryColor ? props.primaryColor : "#3F5773"};

  &:focus {
    border-color: ${(props) =>
      props.primaryColor ? props.primaryColor : "#3F5773"};
    box-shadow: 0 0 5px
      ${(props) => (props.primaryColor ? props.primaryColor : "#3F5773")};
  }
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: ${(props) =>
    props.primaryColor ? props.primaryColor : "#3F5773"};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: AmazonEmber_Md, Helvetica, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 3px 0;
`;

export const HelpText = styled.p`
  font-size: 0.875rem;
  color: #777;
  margin-top: -12px;
  margin-bottom: 12px;
  text-align: center;
`;
