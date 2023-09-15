import React from "react";
import styled from "styled-components";
import { HolidaysWorldwide } from "../types";

const HolidayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000053;
  z-index: 1;
`;

const HolidaysListBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HolidayHeader = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 16px;
  }
`;

const HolidayWrapper = styled.div`
  padding: 20px;
  border: 1px solid #0000006a;
  border-radius: 5px;
  background-color: white;
`;

const CloseButton = styled.button`
  margin-left: 10px;
  background: #9b9b9b39;
  border: 1px solid #0000002b;
  border-radius: 5px;
  cursor: pointer;
`;

const SingleHoliday = styled.div``;

type Props = {
  currentDate: string;
  holidays: HolidaysWorldwide[] | undefined;
  handleClick: () => void;
};

const HolidayList = ({ holidays, currentDate, handleClick }: Props) => {
  const holidaysListRender = () => {
    if (typeof holidays === "undefined") {
      return null;
    }

    return holidays.map((data) => {
      if (data.date === currentDate) {
        return (
          <SingleHoliday key={data.date}>
            {data.name} | {data.countryCode}
          </SingleHoliday>
        );
      }
      return null;
    });
  };

  return (
    <HolidayBackground>
      <HolidaysListBlock>
        <HolidayWrapper>
          <HolidayHeader>
            <h3>Worldwide holidays</h3>
            <CloseButton onClick={handleClick}>X</CloseButton>
          </HolidayHeader>
          {holidaysListRender()}
        </HolidayWrapper>
      </HolidaysListBlock>
    </HolidayBackground>
  );
};

export default HolidayList;
