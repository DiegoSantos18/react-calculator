import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #202024;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px 14px;
  box-sizing: border-box;

  label {
    width: 100%;
    color: #8f8f94;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    text-align: right;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input {
    width: 100%;
    height: 55px;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    color: #ffffff;
    font-size: 42px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    text-align: right;
    box-sizing: border-box;
  }
`;