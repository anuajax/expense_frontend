import { useState } from "react";
export default function useTwoStates(initialValueExpense='', initialValueIncome='')
{
    const [stateE, setStateExpense] = useState(initialValueExpense);
    const [stateI, setStateIncome] = useState(initialValueIncome);
    const setExpenseState = () => {
        setStateExpense(stateE);
    };
    const setIncomeState = () => {
        setStateIncome(stateI);
    };
    return [stateE, setExpenseState, stateI, setIncomeState];
}