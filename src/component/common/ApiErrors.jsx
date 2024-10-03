import React from 'react'

const ApiErrors = ({error}) => {
  return (
    <div className="text-red-500 text-sm">
      {error? error : ""}
    </div>
  )
}

export default ApiErrors