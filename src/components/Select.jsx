import React from 'react'
import { useId } from 'react'

function Select({
    options,
    className,
    label,
    ...props

},ref) {

    const id = useId()
  return (
   <>
    {
        label && <label htmlFor={id} className="">{label}</label>
    }
    <select className={`${className}`} {...props} id={id} ref={ref}>
        {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
   </>
  )
}

export default React.forwardRef(Select)