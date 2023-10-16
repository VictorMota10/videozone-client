import react, { useEffect } from "react";
import "./styles.scss";

import { Controller, useFormContext } from "react-hook-form";
import { Input as AntInput } from "antd";
import styled from "styled-components";

interface InputProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  type: string;
  onPressEnter?: () => void;
  style?: any;
  containerStyle?: any;
  defaultValue?: string;
  autoComplete?: any;
  prefix?: any;
  labelColor?: string;
  suffix?: any;
}

export const Input = (props: InputProps) => {
  const { control, getFieldState } = useFormContext();
  const {
    labelColor,
    prefix,
    suffix,
    autoComplete,
    name,
    label,
    required = false,
    placeholder,
    allowClear,
    disabled = false,
    maxLength,
    minLength,
    type,
    onPressEnter,
    style,
    containerStyle,
    defaultValue,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: !disabled ? required : false }}
      render={({ field }) => (
        <div style={containerStyle} className="custom-container-input">
          <label style={{ color: labelColor || "var(--text-gray)" }}>
            {label} {required ? <>*</> : null}
          </label>
          <AntInput
            suffix={suffix}
            prefix={prefix}
            autoComplete="do-not-autofill"
            {...field}
            style={style}
            type={type}
            disabled={disabled}
            allowClear={allowClear}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            onPressEnter={onPressEnter}
            status={getFieldState(name)?.error ? "error" : ""}
            defaultValue={defaultValue}
          />
          {getFieldState(name)?.error && (
            <ErrorMessage>
              {getFieldState(name)?.error?.message || `Required field`}
            </ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

const ErrorMessage = styled.label`
  color: red !important;
  font-size: 1.5vh;
  font-weight: normal;
  margin: 0;
`;
