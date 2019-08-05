import React from 'react'
import Markdown from 'markdown-to-jsx'
import useSpecialField from '../hooks/useSpecialField'

export const TextArea = ({ defaultValue = '', children, fieldId }) => {
  const { fieldState, update } = useSpecialField({ fieldId, defaultValue })
  return (
    <div style={{ display: 'flex' }}>
      <textarea
        style={{ width: '50%' }}
        value={fieldState || ''}
        defaultValue={defaultValue}
        onChange={e => update({ id: fieldId, value: e.target.value })}
      />
      <Markdown style={{ width: '50%' }} children={fieldState || ''} />
    </div>
  )
}

export default TextArea
