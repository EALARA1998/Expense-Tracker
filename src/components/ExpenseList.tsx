import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

type ExpenseListProps = {
  
}

export default function ExpenseList({}:ExpenseListProps) {
  
  const { state } = useBudget()
  const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses
  const isEmpty = filteredExpenses.length === 0
  
  return (
    <>
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      { isEmpty ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> :
      <>
        <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
        {filteredExpenses.map(expense => 
          <ExpenseDetail key={expense.id} expense={expense}/>)}
      </>}
    </div>
    </>
  )
}