import React, { useState } from "react";
import styled from "styled-components";

import { Note } from "../types";

const InputForm = styled.input`
  display: block;
  width: 100%;
  outline: none;
  background: none;
  border: none;
  border: 1px solid #ffffff14;
  border-bottom: 1px solid #8758ff90;
`;

const SaveButton = styled.button`
  background: #9b9b9b39;
  border: 1px solid #ffffff84;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #9b9b9b39;
  border: 1px solid #ffffff63;
  border-radius: 5px;
  cursor: pointer;
`;

interface IEditNoteProps {
  notes: Note;
  editNote: (id: number, newText: string) => void;
  closeEdit: () => void;
}

function EditNoteForm({ notes, editNote, closeEdit }: IEditNoteProps) {
  const [editedText, setEditedText] = useState(notes.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editNote(notes.id, editedText);
    closeEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        placeholder="Edit note"
      />
      <SaveButton type="submit">Save</SaveButton>
      <CancelButton type="button" onClick={closeEdit}>
        Cancel
      </CancelButton>
    </form>
  );
}

export default EditNoteForm;
