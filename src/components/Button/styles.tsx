import styled from 'styled-components';

interface ButtonContainerProps {
    $isResult: boolean;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    flex: 1;
    padding: 18px 20px;
    border: 1px solid #50505C;
    border-radius: 4px;
    background-color: ${({ $isResult }) => $isResult ? '#00AAF0' : '#3A3A46'};
    color: #FFFFFF;
    font-size: 22px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition:
        background-color 0.15s ease,
        transform 0.1s ease;

    &:hover {
        background-color: ${({ $isResult }) => $isResult ? '#20B8F5' : '#4A4A58'};
    }

    &:active {
        transform: scale(0.97);
        background-color: ${({ $isResult }) => $isResult ? '#0099D8' : '#32323D'};
    }
`;