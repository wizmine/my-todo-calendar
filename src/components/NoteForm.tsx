import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 2px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NoteInput = styled.input`
  outline: none;
  background: none;
  border: none;
  border: 1px solid #ffffff14;
  border-bottom: 1px solid #8758ff90;
  &::placeholder {
    color: #8758ff89;
  }

  &.active {
    border-bottom: none;
    border: 1px solid #8758ff;
    border-radius: 5px 0px 0px 5px;
  }
`;

const CreateNoteButton = styled.button`
  font-size: 14px;
  background: none;
  border: none;
  border: 1px solid #ffffff14;
  border-bottom: 1px solid #8758ff90;
  color: #8758ff;
  cursor: pointer;

  &.active {
    border-bottom: none;
    background: #8758ff;
    border: 1px solid #8758ff;
    color: #fff;
    border-radius: 0px 5px 5px 0px;
  }
`;

interface NoteFormProps {
  day: number;
  addNote: (text: string, day: number) => void;
}

function NoteForm({ day, addNote }: NoteFormProps) {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleInputStyle = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      addNote(value, day);
      setValue("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <NoteInput
        ref={inputRef}
        className={isActive ? "active" : ""}
        onClick={toggleInputStyle}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add your note"
      />
      <CreateNoteButton className={isActive ? "active" : ""} type="submit">
        Add
      </CreateNoteButton>
    </Form>
  );
}

export default NoteForm;
