import React, { useState } from "react";
import styled from "styled-components";

import { Note } from "../types";
import Day from "./Day";

const StyledCalendar = styled.div`
  padding: 0px 5px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevNextDays = styled.div`
  height: 100px;
  padding: 3px;
  background-color: #e9e9e9;
`;

const Button = styled.button`
  height: 25px;
  margin: 15px;
  font-size: 16px;
  border: 1px solid #00000052;
  border-radius: 5px;
  color: #a1a1a1;
  background-color: #ececec8b;
  cursor: pointer;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 3px;
`;

const DayOfTheWeek = styled.div`
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 10px solid #f0f0f0c1;
`;

const Calendar = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const year = date.getFullYear();

  const [notes, setNotes] = useState<Note[]>([]);
  const [month, setMonth] = useState(currentMonth);

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1);
  };

  const getLastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0);
  };

  const addNote = (text: string, day: number) => {
    const newNote = { id: Date.now(), text, day, month, year };
    setNotes([...notes, newNote]);
  };

  const editNote = (id: number, newText: string) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, text: newText } : note));
    setNotes(updatedNotes);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const renderDaysOfMonth = () => {
    const firstDay = getFirstDayOfMonth(year, month);
    const lastDay = getLastDayOfMonth(year, month);

    const days: JSX.Element[] = [];

    // render prev month
    if (firstDay.getDay() !== 1) {
      const prevMonthLastDay = new Date(year, month, 0);

      for (let i = firstDay.getDay(); i > 1; i--) {
        const prevDate = new Date(prevMonthLastDay);
        prevDate.setDate(prevMonthLastDay.getDate() - i + 2);

        days.push(<PrevNextDays key={prevDate.toISOString()}>{prevDate.getDate()}</PrevNextDays>);
      }
    }

    // render curr month
    for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
      days.push(
        <Day
          key={day.toISOString()}
          day={day.getDate()}
          month={day.getMonth()}
          year={day.getFullYear()}
          notes={notes}
          addNote={addNote}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      );
    }

    // render next month
    if (lastDay.getDay() !== 0) {
      for (let i = lastDay.getDay(); i <= 6; i++) {
        const nextDate = new Date(lastDay);
        nextDate.setDate(lastDay.getDate() + i - lastDay.getDay() + 1);
        days.push(<PrevNextDays key={nextDate.toISOString()}>{nextDate.getDate()}</PrevNextDays>);
      }
    }

    return days;
  };

  return (
    <StyledCalendar>
      <Header>
        <Button
          onClick={() => {
            setMonth(month - 1);
          }}
        >
          &#5167;
        </Button>
        <h2>
          {new Date(year, month).toLocaleDateString("en", { year: "numeric", month: "long" })}
        </h2>
        <Button
          onClick={() => {
            setMonth(month + 1);
          }}
        >
          &#5169;
        </Button>
      </Header>
      <GridWrapper>
        <DayOfTheWeek>Mon</DayOfTheWeek>
        <DayOfTheWeek>Tue</DayOfTheWeek>
        <DayOfTheWeek>Wed</DayOfTheWeek>
        <DayOfTheWeek>Thu</DayOfTheWeek>
        <DayOfTheWeek>Fri</DayOfTheWeek>
        <DayOfTheWeek>Sat</DayOfTheWeek>
        <DayOfTheWeek>Sun</DayOfTheWeek>
        {renderDaysOfMonth()}
      </GridWrapper>
    </StyledCalendar>
  );
};

export default Calendar;
