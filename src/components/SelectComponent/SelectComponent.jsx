import React from 'react'
import Select, { components } from 'react-select'
import './SelectComponent.css'

const customStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
  }),
}

const customSingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <span
      style={{
        background: props.data.color,
        color: 'white',
        borderRadius: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingBottom: '4px',
        paddingTop: '4px',
      }}
    >
      {children}
    </span>
  </components.SingleValue>
)

const Multiselect = ({ options, selectedOption, handleChange }) => {
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      styles={customStyles}
      components={{ SingleValue: customSingleValue }}
      className='select-object'
      isClearable
    />
  )
}

export default Multiselect
