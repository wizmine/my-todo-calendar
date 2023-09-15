import React, { useState } from "react";
import styled from "styled-components";

import { Note } from "../types";

import EditNoteForm from "./EditNoteForm";

const SingleNote = styled.div`
  padding: 2px;
  background: #ffffff39;
  border: 1px solid #ffffff63;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const NoteText = styled.div`
  width: 50%;
`;

const Buttons = styled.div``;

const EditButton = styled.button`
  background: #9b9b9b39;
  border: 1px solid #ffffff84;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #9b9b9b39;
  border: 1px solid #ffffff63;
  border-radius: 5px;
  cursor: pointer;
`;

interface INotesProps {
  notes: Note;
  editNote: (id: number, newText: string) => void;
  deleteNote: (id: number) => void;
}

const Notes: React.FC<INotesProps> = ({ notes, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteNote(notes.id);
  };

  return (
    <>
      <SingleNote className="note">
        {isEditing ? (
          <EditNoteForm notes={notes} editNote={editNote} closeEdit={closeEdit} />
        ) : (
          <>
            <NoteText>{notes.text}</NoteText>
            <Buttons>
              <EditButton onClick={handleEditClick}>Edit</EditButton>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </Buttons>
          </>
        )}
      </SingleNote>
    </>
  );
};

export default Notes;
