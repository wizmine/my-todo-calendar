import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { HolidaysWorldwide } from "../types";

import HolidayList from "./HolidayList";

const SingleHoliday = styled.button`
  padding-left: 5px;
  font-size: 14px;
  background-color: #ffffff8b;
  border-radius: 10px;
  border: 1px solid #ffffffb7;
  cursor: pointer;
`;

interface IHolidayProps {
  year: number;
  month: number;
  day: number;
}

const BASE_URL = "https://date.nager.at/api/v3/NextPublicHolidaysWorldwide";

const Holiday: React.FC<IHolidayProps> = ({ year, month, day }) => {
  const [holidays, setHolidays] = useState<HolidaysWorldwide[]>();
  const [holidayList, setHolidayList] = useState(false);

  const handleClick = () => {
    setHolidayList(!holidayList);
  };

  const currentDate = [String(year), "0" + String(month + 1), String(day)].join("-");

  const fetchHolidays = async () => {
    const res = await fetch(BASE_URL);
    const data = (await res.json()) as HolidaysWorldwide[];

    setHolidays(data);
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const renderHoliday = () => {
    const holidaysData: JSX.Element[] = [];

    if (typeof holidays === "undefined") {
      return null;
    } else {
      holidays.map((data) => {
        if (data.date === currentDate) {
          return holidaysData.push(
            <>
              <SingleHoliday onClick={handleClick}>
                {data.name.length >= 21 ? data.name.slice(0, 20) + "..." : data.name} |{" "}
                {data.countryCode}
              </SingleHoliday>
            </>
          );
        } else {
          return null;
        }
      });
      const holidaysLength = holidaysData.length > 1 ? holidaysData[0] : holidaysData;

      return holidaysLength;
    }
  };

  return (
    <>
      {renderHoliday()}
      {holidayList ? (
        <HolidayList
          holidays={holidays}
          currentDate={currentDate}
          handleClick={handleClick}
        />
      ) : null}
    </>
  );
};

export default Holiday;
