import React from 'react'
import { Actions } from '../calculator/Calculator';

export const OperatorButton = ({dispatch, operator}) => {
    return (
        <button onClick={() => dispatch({type : Actions.ADD_OPERATION , payload : {operator}})}>
        {operator}
        </button>
    )
}