import React, { useReducer } from 'react'
import { DigitButton } from '../buttons/DigitButton';
import { OperatorButton } from '../buttons/OperatorButton';
import './calculator.scss'

export const Actions = {
  ADD_DIGIT: "add-digit",
  DELTE_DIGIT: "delete-digit",
  ADD_OPERATION: "add-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate"
}

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      if (state.operator) {
        return {
          ...state,
          previousOperand: `${state.previousOperand || ""}${payload.digit}`
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
      break;
    case Actions.ADD_OPERATION:
      if (state.previousOperand === null) {
        return {
          ...state,
          operator: `${payload.operator}`
        }
      }
      return {
        ...state,
        operator: `${payload.operator}`
      }
    case Actions.CLEAR:
      if(state.currentOperand && !state.operator  && !state.previousOperand ) 
      return{
        ...state,
        currentOperand : state.currentOperand.slice(0,-1)       
      }
      if(state.currentOperand && state.operator === undefined) return {}
      else if(state.currentOperand && state.previousOperand){
        return{
          ...state,
          previousOperand : state.previousOperand.slice(0,-1)
        }
      }
      else if( state.currentOperand && state.operator && !state.previousOperand){
        return {
          ...state,
          currentOperand : state.currentOperand,
          operator : ""
        }
      }
      else{
        return {}
      }
      break;

    case Actions.EVALUATE:
      return {
        currentOperand: evaluate(state.currentOperand, state.previousOperand, state.operator)
      }
    default:
      break;
  }
}

function evaluate(currentOperand, previousOperand, operator) {
  const num1 = parseFloat(currentOperand)
  const num2 = parseFloat(previousOperand)
  if(isNaN(num1) || isNaN(num2)) return "";
  let compute = ""
  switch (operator) {
    case "+":
      compute =  num1 + num2
      break;
    case "-":
      compute =  num1 - num2
      break;
    case "*":
      compute =  num1 * num2
      break;
    case "/":
      compute =  num1 / num2
      break;
    case "%":
      compute =  num1 % num2
      break;
    
    default:
      return ""
      break;
  }
  return compute.toString();
}

function Calculator() {

  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(reducer, {})

  return (
    <div className="container">
      <h1>CalCulator</h1>
      <div className="wrapper">
        <div className="top">
          {operator ? (
          <>
          <p className="previous"> 
            {currentOperand}{operator}
          </p>
           <p className='current'>
           {previousOperand}
         </p>
         </>
          ) : (
          <p className='current'>
            {currentOperand}{operator}
          </p>
          )}
        </div>
        <div className="middle">
          <div className="button">
            <DigitButton dispatch={dispatch} digit={1} />
            <DigitButton dispatch={dispatch} digit={2} />
            <DigitButton dispatch={dispatch} digit={3} />
            <OperatorButton dispatch={dispatch} operator={"+"} />
          </div>
          <div className="button">
            <DigitButton dispatch={dispatch} digit={4} />
            <DigitButton dispatch={dispatch} digit={5} />
            <DigitButton dispatch={dispatch} digit={6} />
            <OperatorButton dispatch={dispatch} operator={"-"} />
          </div>
          <div className="button">
            <DigitButton dispatch={dispatch} digit={7} />
            <DigitButton dispatch={dispatch} digit={8} />
            <DigitButton dispatch={dispatch} digit={9} />
            <OperatorButton dispatch={dispatch} operator={"*"} />
          </div>
          <div className="button">
            <DigitButton dispatch={dispatch} digit={"0"} />
            <OperatorButton dispatch={dispatch} operator={"/"} />
            <OperatorButton dispatch={dispatch} operator={"%"} />
            <DigitButton dispatch={dispatch} digit={"."} />
          </div>
          <div className="button">
            <button onClick={() => dispatch({ type: Actions.CLEAR })} >DEL</button>
            <button onClick={() => dispatch({ type: Actions.EVALUATE })}>=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator;