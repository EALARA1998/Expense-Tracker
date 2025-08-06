import { createContext, useMemo, useReducer } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budgetReducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
}
type BudgetProviderProps = {
  children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps | undefined>(undefined)

export default function BudgetProvider({children}:BudgetProviderProps) {

  const [ state, dispatch ] = useReducer(budgetReducer, initialState)

  const totalExpenses = useMemo( () => state.expenses.reduce((total, expenses) => expenses.amount + total, 0), [state.expenses])
  const remainingBudget = state.budget - totalExpenses

  return (
    <>
      <BudgetContext.Provider
        value={{
          state,
          dispatch,
          totalExpenses,
          remainingBudget
        }}>
        {children}
      </BudgetContext.Provider>
    </>
  )
}