import { FormInputLabel, Input, Group} from './form-input.styles'

const FormInput = ({label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
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