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

import AutoComplete from "react-google-autocomplete";

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
  font-size: 16px;
`;

const SelectInput = styled.select`
  padding: 15px;
  border-radius: 5px;
  background: #eee;
  border: 1px solid #ddd;
  margin-top: 5px;
  font-size: 16px;
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

export const CleaveInput = ({ label, value, callback, type, isRequired }) => (
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

//key is restricted, SO DONT TRY ANYTHING AYE?
const mapsApiKey = "AIzaSyD2NMpaoN7Rd2tLFbSPRVVRxeY5C3xcJc8";
export const AutoCompleteInput = ({ label, callback }) => {
  return (
    <InputColumn>
      {label && <Label>{label}</Label>}
      <AutoComplete
        apiKey={mapsApiKey}
        onPlaceSelected={(place) => callback(place)}
        options={{
          types: ["address"],
          componentRestrictions: { country: "us" },
        }}
        style={{
          padding: "15px",
          borderRadius: "5px",
          background: "#eee",
          border: "1px solid #ddd",
          marginTop: "5px",

          fontSize: "16px",
        }}
      />
    </InputColumn>
  );
};

export const InputSelector = ({
  label,
  name,
  value,
  callback,
  placeholder,
  isRequired,
  type,
  options,
}: TextInputProps & { options: Array<any> }) => {
  if (type === "text" || "email") {
    return (
      <TextInput
        name={name}
        value={value}
        callback={callback}
        label={label}
        type={type}
        isRequired={isRequired}
        placeholder={placeholder}
      />
    );
  }
  if (type === "select") {
    return (
      <Select
        name={name}
        value={value}
        callback={callback}
        label={label}
        isRequired={isRequired}
        placeholder={placeholder}
        options={options}
      />
    );
  }
  if (type === "autocomplete") {
    return <AutoCompleteInput label={label} callback={callback} />;
  }
  if (type === "cleaveinput") {
    return (
      <CleaveInput
        value={value}
        callback={callback}
        label={label}
        type={type}
        isRequired={isRequired}
      />
    );
  }

  return <p>No input type match</p>;
};
