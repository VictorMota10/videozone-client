import react, { useEffect, useState } from "react";
import './styles.scss'

import moment from "moment";
import dayjs from 'dayjs';

import { Controller, useFormContext } from "react-hook-form";
import { DatePicker as AntDatePicker } from "antd";
import type { RangePickerProps } from 'antd/es/date-picker';
import styled from "styled-components";

interface DatePickerProps {
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
}

export const DatePicker = (props: DatePickerProps) => {
  const [defaultDateSelected, setDefaultDateSelected] = useState<any>()
  const { control, getFieldState } = useFormContext();
  const { labelColor, name, label, required, allowClear, disabled = false, style, containerStyle, format, disabledDateCustom } = props

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current > moment(disabledDateCustom || new Date());
  };

  useEffect(() => {
   let defaultDateSelected = moment(disabledDateCustom).subtract(3, 'years').format('L');

   setDefaultDateSelected(defaultDateSelected)
   console.log(defaultDateSelected)

  }, [])
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: !disabled ?? required }}
      render={({ field }) => (
        <div style={containerStyle} className="custom-container-date-picker">
          <label style={{ color: labelColor || 'var(--text-gray)' }}>{label} {required ? <>*</> : null}</label>
          <AntDatePicker
            {...field}
            style={style}
            disabled={disabled}
            allowClear={allowClear}
            status={getFieldState(name)?.error ? "error" : ""}
            format={format || 'DD/MM/YYYY'}
            disabledDate={disabledDate}
            defaultPickerValue={dayjs(defaultDateSelected, 'DD/MM/YYYY')}
          />
          {getFieldState(name)?.error && (
            <ErrorMessage>{getFieldState(name)?.error?.message || `Required field`}</ErrorMessage>
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
