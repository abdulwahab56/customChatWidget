/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 */

import styled from 'styled-components';

export const FormSection = styled.div`
  position: fixed;
  bottom: 80px;
  right: 30px;
  @media ${props => props.device.laptop} {
    width: 380px;
    bottom: 100px;
    right: 80px;
    height: 420px;
  }
  width: 320px;
  height: 430px;
  overflow-y: auto;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr;
  box-shadow: rgb(221, 221, 221) 0px 2px 3px;
  background: linear-gradient(rgb(2, 64, 18) 34%, rgba(255, 255, 255, 0.4)); /* Dark green background from Ruff Greens image */
  z-index: 999;
  border-radius: 10px;
  overflow-x: hidden;
`;

export const Form = styled.form`
  border-radius: 20px;
  @media ${props => props.device.laptop} {
    height: 460px;
  }
  height: 360px;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
  text-align: start;
  margin: 0;
  transition: right 0.6s ease-in-out;
  background: transparent; /* Remove gradient to match green background */
  padding: 10px; /* Add padding for content */
`;

export const FormHeader = styled.div`
  background: ${props => props.primaryColor ? props.primaryColor : "#3F5773"};
  text-align: center;
  @media ${props => props.device.laptop} {
    padding: 20px;
  }
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-radius: 3px;
  grid-row: 1/2;
  height: 40px;
  margin-top: 20px;
  .preChatForm-welcome-text {
    color: #ffffff; /* White text for contrast on green background */
    display: inline;
    font-size: 18px;
  }
  span {
    font-size: 20px;
    color: #e0e0e0; /* Lighter text for secondary message */
    text-align: start;
    
  }
`;

export const OptionsContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 2px; /* spacing between OptionList and buttons */
`;

export const OptionList = styled.div`
  width: 100%;
   background-color: #ffffff;
   border-radius: 10px;
    .optionbutton{
      font-weight: bold;
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
  padding: 10px;
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
export const SubmitButton = styled.button`
  margin-top: 10px;
  width: 100%; /* Full width to match image */
  background-color: #ffffff;
  color: #000000ff; /* Dark green text */
  border: 2px solid #2e7d32; /* Green border */
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  transition: ease all 250ms;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
    .leaveMsessage-chat {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
    .trackmessage-chat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%
    }

  .leaveMessage-subheadingclr {
    font-size: 0.9em;
    color: #2e7d32;
  }

  // Style for the icon
  svg {
    font-size: 1.2em; 
    color: #2e7d32; 
    transition: font-size 0.2s, color 0.2s;
  }
  ${(props) =>
    props.largeIcon &&
    `
    svg {
      font-size: 1.2em; // Increased to 2em (e.g., 32px if base font-size is 16px)
    }
  `}

  &:hover {
    background-color: #e0e0e0; /* Light gray on hover */
    box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(241, 255, 255, 0.5);
  }

`;

