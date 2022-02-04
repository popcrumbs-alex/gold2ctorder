import Cleave from "cleave.js/react";
import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import Colors, { Theme } from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { ThemeContext } from "../pages";
import {
  removeFormFieldFromErrors,
  selectAlert,
} from "../redux/reducers/alert.reducer";

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
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  -moz-appearance: textfield;
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
  const context = useContext<Theme>(ThemeContext);

  const alertState = useAppSelector(selectAlert);

  const dispatch = useAppDispatch();

  //once input value is added, remove errors until next check
  useMemo(() => {
    if (value) {
      dispatch(removeFormFieldFromErrors(name));
    }
  }, [value]);

  // console.log("alert state", alertState, value);

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
        style={{
          boxShadow: `0 0 0 3px ${
            alertState.localAlertNames.includes(name)
              ? context.danger
              : "transparent"
          }`,
        }}
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
  const context = useContext<Theme>(ThemeContext);

  const alertState = useAppSelector(selectAlert);

  const dispatch = useAppDispatch();

  //once input value is added, remove errors until next check
  useMemo(() => {
    if (value) {
      dispatch(removeFormFieldFromErrors(name));
    }
  }, [value]);

  return (
    <InputColumn>
      {label && <Label>{label}</Label>}
      <SelectInput
        name={name}
        value={value}
        onChange={callback}
        placeholder={placeholder}
        required={isRequired ? true : false}
        style={{
          boxShadow: `0 0 0 3px ${
            alertState.localAlertNames.includes(name)
              ? context.danger
              : "transparent"
          }`,
        }}
      >
        <option>{placeholder}</option>
        {options.map((opt: { name: string }, key: number) => {
          return <option key={key}>{opt.name}</option>;
        })}
      </SelectInput>
    </InputColumn>
  );
};

export const CleaveInput = ({
  label,
  name,
  value,
  callback,
  placeholder,
  isRequired,
}) => (
  <InputColumn>
    {label && <Label>{label}</Label>}
    <Cleave
      placeholder="Enter your credit card number"
      options={{ creditCard: true }}
      onChange={callback}
      value={value}
      required={isRequired}
      style={{
        padding: "15px",
        borderRadius: "5px",
        background: "#eee",
        border: "1px solid #ddd",
        marginTop: "5px",
      }}
    />
  </InputColumn>
);
