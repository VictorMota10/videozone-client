import react from "react";
import './styles.scss'

import { Controller, useFormContext } from "react-hook-form";
import { Select as AntSelect } from "antd";
import styled from "styled-components";

interface SelectProps {
  name: string
  label?: string
  required: boolean
  allowClear?: boolean
  disabled?: boolean
  style?: any
  containerStyle?: any
  labelColor?: string
  format?: string
  disabledDateCustom?: any
  options: any
}

export const Select = (props: SelectProps) => {
  const { control, getFieldState } = useFormContext();
  const { labelColor, name, label, required, allowClear, disabled = false, style, containerStyle, options } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: !disabled ?? required }}
      render={({ field }) => (
        <div style={containerStyle} className="custom-container-select">
          <label style={{ color: labelColor || 'var(--text-gray)' }}>{label} {required ? <>*</> : null}</label>
          <AntSelect
            {...field}
            showSearch
            style={style}
            disabled={disabled}
            allowClear={allowClear}
            status={getFieldState(name)?.error ? "error" : ""}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
          />
          {getFieldState(name)?.error && (
            <ErrorMessage>{getFieldState(name)?.error?.message || `Campo obrigatório`}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};



const ErrorMessage = styled.label`
    color: red;
    font-size: 1.5vh;
    font-weight: normal;
    margin: 0;
`;
