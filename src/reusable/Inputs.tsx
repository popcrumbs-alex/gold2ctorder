import React from "react";
import styled from "styled-components";

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  flex: 1;
`;
const Label = styled.label`
  font-size: 0.9rem;
`;
const Input = styled.input`
  padding: 15px;
  border-radius: 5px;
  background: #eee;
  border: 1px solid #ddd;
  margin-top: 5px;
`;

const SelectInput = styled.select`
  padding: 15px;
  border-radius: 5px;
  background: #eee;
  border: 1px solid #ddd;
  margin-top: 5px;
`;

export interface TextInputProps {
  label: string;
  name: string;
  value: string;
  callback: (args: any) => any;
  placeholder: string;
  type: string;
  isRequired: boolean;
}

export interface SelectInputProps extends TextInputProps {
  options: Array<any>;
}

export const TextInput = ({
  label,
  name,
  value,
  callback,
  placeholder,
  isRequired,
  type,
}: TextInputProps) => {
  return (
    <InputColumn>
      {label && <Label>{label}</Label>}
      <Input
        name={name}
        value={value}
        onChange={callback}
        placeholder={placeholder}
        type={type}
        required={isRequired ? true : false}
      />
    </InputColumn>
  );
};

export const Select = ({
  label,
  name,
  value,
  callback,
  placeholder,
  isRequired,
  type,
  options,
}) => {
  return (
    <InputColumn>
      {label && <Label>{label}</Label>}
      <SelectInput
        name={name}
        value={value}
        onChange={callback}
        placeholder={placeholder}
        required={isRequired ? true : false}
      >
        <option>{placeholder}</option>
        {options.map((opt: { name: string }, key: number) => {
          return <option key={key}>{opt.name}</option>;
        })}
      </SelectInput>
    </InputColumn>
  );
};
