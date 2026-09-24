import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;

    background:
        radial-gradient(
            circle at 20% 20%,
            #3a3a40 0%,
            transparent 30%
        ),
        radial-gradient(
            circle at 80% 80%,
            #29292e 0%,
            transparent 30%
        ),
        #18181b;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 20px;
    box-sizing: border-box;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.header`
    width: 100%;
    max-width: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 15px;
    color: #ffffff;
    position: fixed;
    top: 0;

    img {
        width: 45px;
        height: 45px;
        object-fit: contain;
    }

    h1 {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 22px;
        font-weight: 500;
    }
`;

export const Footer = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 15px;
    color: #ffffff;
    position: fixed;
    bottom: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    font-weight: 500;

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        opacity: 0.8;
    }
`;

export const Content = styled.div`
    background-color: #2b2b30;
    width: 100%;
    max-width: 360px;
    min-width: 280px;
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.4),
        0 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
`;

const pulseRotate = keyframes`
  0% { transform: scale(0.95) rotate(0deg); opacity: 0.8; }
  50% { transform: scale(1.1) rotate(10deg); opacity: 1; filter: drop-shadow(0 0 12px #ffa800); }
  100% { transform: scale(0.95) rotate(0deg); opacity: 0.8; }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 0, 75, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: inherit;

  img {
    animation: ${pulseRotate} 1s infinite ease-in-out;
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  span {
    color: #FFF;
    margin-top: 12px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
  }
`;