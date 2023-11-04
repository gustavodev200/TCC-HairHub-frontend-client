import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 30%;
  border-radius: 10px;
  padding: 35px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #242731;

  @media (max-width: 400px) {
    padding: 10px;
  }

  @media (max-width: 1180px) {
    min-width: 100%;
  }
`;

export const ContainerOne = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageContent = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
export const InfoServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h4 {
    font-size: 18px;
  }

  @media (max-width: 400px) {
    h4 {
      font-size: 14px;
    }

    span:nth-child(3) {
      font-size: 12px;
    }
  }
`;

export const FeedbackClient = styled.p`
  color: #c2c2c2;
  font-size: 16px;
  font-style: italic;
  display: flex;
  align-items: flex-start;
  /* text-align: left; */
`;

export const AspasContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const BarberName = styled.h4`
  color: #c1820b;
  font-weight: bold;
  margin-left: 10px;
`;

export const SubtitleProfile = styled.span`
  color: #c2c2c2;
  font-size: 14px;
  margin-left: 10px;
  display: flex;
  align-items: flex-start;
`;

export const AttendPerBarbeiroStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;

  span {
    color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
  }
`;
