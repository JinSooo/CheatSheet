import { SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultVal?: string
  items: { key: string; description: string }[]
}

const Select = ({ defaultVal, items, ...props }: Props) => {
  return (
    <select className='select select-sm select-info w-1/3' {...props}>
      {items.map((item) => (
        <option key={item.key} value={item.key} selected={defaultVal === item.key}>
          {item.description}
        </option>
      ))}
    </select>
  )
}

export default Select
