import { InputHTMLAttributes, FC } from 'react'
import { FormInputLabel, Input, Group} from './form-input.styles'

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
}
const FormInput:FC<FormInputProps> = ({label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value ==='string' && otherProps?.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput;

// <div> 
//   <label htmlFor="displayName">Display Name</label>
//   <input type="text" onChange={handleChange} name="displayName" value=         {displayName} required />
// </div>