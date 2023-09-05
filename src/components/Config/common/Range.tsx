import { InputHTMLAttributes } from 'react'

const Range = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type='range' className='range range-xs range-info w-1/3' {...props} />
}

export default Range
