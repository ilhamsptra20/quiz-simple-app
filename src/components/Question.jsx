import React from 'react'

const Question = (props) => {
  return (
    <div className="w-full mb-5">
        <p className="text-2xl leading-7">
            {props.text}
        </p>
    </div>
  )
}

export default Question