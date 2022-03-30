import './form-input.styles.scss'

const FormInput = ({label, ...otherProps }) => {
  return (
    <div className="group">
      <input className='form-input' {...otherProps} />
      <label 
        className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`} 
      >
        {label}
      </label>
    </div>
  )
}

export default FormInput;

// <div> 
//   <label htmlFor="displayName">Display Name</label>
//   <input type="text" onChange={handleChange} name="displayName" value=         {displayName} required />
// </div>