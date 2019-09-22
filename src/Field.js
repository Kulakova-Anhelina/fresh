import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from './fields/Select'
import Reference from './fields/Reference'
import Password from './fields/Password'
import Tags from './fields/Tags'
import TextArea from './fields/TextArea'
import Markdown from './fields/Markdown'
import Toggle from './fields/Toggle'
import { FormContext } from './state/State'

const kebabCase = str =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

const COMPLEX_FIELDS = {
  select: Select,
  password: Password,
  tags: Tags,
  markdown: Markdown,
  textarea: TextArea,
  toggle: Toggle,
  reference: Reference,
}

const Field = ({
  required,
  children,
  type,
  label,
  error,
  placeholder,
  options,
  className,
  defaultValue,
  ...rest
}) => {
  const { formState, update, registerField } = useContext(FormContext)
  const fieldId = kebabCase(children)

  useEffect(() => {
    registerField({ id: fieldId, value: defaultValue })
  }, [])

  return (
    <div className={`fresh-field-wrapper ${fieldId}`}>
      <label htmlFor={`fresh-${fieldId}`}>
        <span className="fresh-label">
          {label && children} {required && '*'}
        </span>
        {Object.keys(COMPLEX_FIELDS).includes(type) ? (
          COMPLEX_FIELDS[type]({
            options,
            children,
            className,
            fieldId,
            placeholder,
            type,
            ...rest,
          })
        ) : (
          <input
            required={required}
            className={`fresh-input fresh-input-${type} ${className}`}
            placeholder={placeholder}
            id={`fresh-${fieldId}`}
            type={type}
            value={formState[fieldId]}
            onChange={e => {
              update({ id: fieldId, value: e.target.value })
            }}
            {...rest}
          />
        )}
      </label>
      {error && <div className="fresh-error">{error}</div>}
    </div>
  )
}

Field.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  label: PropTypes.bool,
  placeholder: PropTypes.string,
}

Field.defaultProps = {
  children: '',
  className: '',
  defaultValue: null,
  options: [],
  required: false,
  label: true,
  placeholder: '',
  type: 'text',
}

export default Field
