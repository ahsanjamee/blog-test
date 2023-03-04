import type React from 'react';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  label?: string;
  name: string;
  placeholder?: string;
  register?: any;
  errors?: any;
  defaultValue?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<Props> = ({
  type = 'text',
  label,
  name,
  placeholder,
  register,
  errors,
  defaultValue,
  disabled,
  maxLength,
  onChange,
  value,
}) => {
  return (
    <div className='input-group'>
      <label>{label as string}</label>
      {register ? (
        <input
          type={type}
          {...register(`${name}`)}
          autoComplete='off'
          maxLength={maxLength}
          className={`input-field ${errors ? 'is-invalid' : ''}`}
          placeholder={placeholder as string}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          autoComplete='off'
          className={`input-field ${errors ? 'is-invalid' : ''}`}
          placeholder={placeholder as string as string}
          maxLength={maxLength}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          onChange={onChange}
          value={value}
          id={name}
        />
      )}
      <div className='invalid-feedback'>{errors?.message}</div>
    </div>
  );
};

export default Input;
