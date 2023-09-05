import { InputHTMLAttributes } from 'react'

const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type='checkbox' className='toggle toggle-info' {...props} />
}

export default Checkbox
