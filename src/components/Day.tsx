import React from "react";
import styled from "styled-components";

import { Note } from "../types";

import HolidayInfo from "./Holiday";
import Notes from "./Notes";
import NoteForm from "./NoteForm";

const DayWrapper = styled.div`
  height: 100px;
  padding: 3px;
  background-color: #d3dae2;
`;

const InfoBlock = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f5f5f5;

  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #f5f5f5;
  }
`;

interface IDay {
  day: number;
  month: number;
  year: number;
  notes: Note[];
  addNote: (text: string, day: number) => void;
  editNote: (id: number, newText: string) => void;
  deleteNote: (id: number) => void;
}

const Day: React.FC<IDay> = ({ day, month, year, notes, addNote, editNote, deleteNote }) => {
  const notesForDay = notes.filter(
    (note) => note.day === day && note.month === month && note.year === year
  );

  return (
    <DayWrapper>
      {day}
      <InfoBlock>
        <HolidayInfo day={day} month={month} year={year} />
        {notesForDay.map((note) => (
          <Notes key={note.id} notes={note} deleteNote={deleteNote} editNote={editNote} />
        ))}
        <NoteForm day={day} addNote={addNote} />
      </InfoBlock>
    </DayWrapper>
  );
};

export default Day;
