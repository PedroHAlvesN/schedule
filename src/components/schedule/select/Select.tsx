"use client"

import { FunctionComponent, PropsWithChildren, useState } from "react"
import "./Select.css"

interface Props extends PropsWithChildren {
  selected: string
}

export const Select:FunctionComponent<Props> = ({ children, selected }) => {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <>
      <div className="select-container" onClick={() => setOpen(!open)}>
        <div className="title">
            <p className="selected">{selected}</p>
            <img src="/dropdown-arrow.png" alt="" />
        </div>
        {open && 
          <div className="select-options">
            {children}
          </div>
        }
        
      </div>
    </>
  )
}
