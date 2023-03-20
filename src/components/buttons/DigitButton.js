import React from 'react'
import { Actions } from '../calculator/Calculator'

export const DigitButton = ({dispatch , digit}) => {
  return (
     <button onClick={() => dispatch({type : Actions.ADD_DIGIT , payload : {digit}})}>
      {digit}
     </button>
  )
}