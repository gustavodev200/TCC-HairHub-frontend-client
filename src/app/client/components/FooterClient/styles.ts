import styled from "styled-components";
import { Footer } from "antd/lib/layout/layout";
import { Button } from "antd";
import Link from "next/link";

export const FooterContainer = styled(Footer)`
  display: flex;
  width: 100%;
  padding: 30px 100px;
  flex-direction: column;

  @media (max-width: 678px) {
    padding: 20px 15px;
  }
`;

export const FooterInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;

  @media (max-width: 1050px) {
    flex-direction: column;
    height: auto;
    padding: 20px 50px;
  }

  @media (max-width: 678px) {
    padding: 20px 10px;
  }
`;

export const FooterContact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    color: #c2c2c2;
  }

  a {
    color: #c2c2c2;

    &:hover {
      color: #fff;
    }
  }
`;

export const FooterTitle = styled.h4`
  color: #fff;
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 1050px) {
    margin-top: 20px;
  }

  @media (max-width: 678px) {
    margin-top: 20px;
  }
`;

export const FooterSocialMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    color: #c2c2c2;
    font-size: 16px;
    margin-bottom: 10px;
    display: flex;
    font-size: 24px;
  }
`;

export const FooterContentSocialMedia = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    cursor: pointer;

    &:hover {
      svg {
        color: #fff;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  height: auto;
  margin-top: 20px;
`;

export const ButtonContent = styled(Button)`
  background-color: #fff;
  color: #16171b;
  font-size: 14px;
  font-weight: bold;
  border: none;

  @media (max-width: 400px) {
    font-size: 12px;
  }

  span {
    margin-right: 7px;
  }
`;

export const FooterBarberNav = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FooterBarberNavLink = styled(Link)`
  color: #c2c2c2;

  &:hover {
    color: #fff;
  }
`;
export const FooterKnowBarber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FooterCopyright = styled.div`
  border-top: 1px solid #c2c2c2;
  padding: 40px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #c2c2c2;

    span {
      font-weight: bold;
    }
  }
`;
