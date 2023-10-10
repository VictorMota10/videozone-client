import { Switch as AntdSwitch } from "antd";
import { SwitchProps as AntdSwitchProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

import './styles.scss'

interface SwitchProps extends AntdSwitchProps {
  name: string;
}

export const Switch = ({ name, ...props }: SwitchProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <AntdSwitch className="switch-custom" {...field} {...props} />}
    />
  );
};
