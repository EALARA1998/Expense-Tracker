import { categories } from "../data/categories"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import { useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
type ExpenseFormProps = {
  
}

export default function ExpenseForm({}:ExpenseFormProps) {

  const { state, dispatch, remainingBudget} = useBudget()
  const [previousAmount, setPreviousAmount] = useState(0)
  
  const initialExpense = {
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date()
  }

  const [expense, setExpense] = useState<DraftExpense>(initialExpense)

  const [error, setError] = useState("")

  useEffect(()=>{
    if (state.editingId) {
      const editingExpense = state.expenses.filter( expense => expense.id === state.editingId)[0]
      const { id, ...draftExpense } = editingExpense
      setExpense(draftExpense)
      setPreviousAmount(editingExpense.amount)
    }
  },[state.editingId])

  function handleOnChangeInputs(e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) {
    setExpense({...expense, [e.target.name]: e.target.name === "amount" ? +e.target.value : e.target.value})
  }
  function handleOnChangeDate(value: Value) {
    setExpense({...expense, date: value})
  }
  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (Object.values(expense).includes("") || Object.values(expense).includes(0)) {
      setError("Faltan Datos")
      return
    }
    if ( (expense.amount - previousAmount) > remainingBudget) {
      setError("Ese gasto se sale del presupuesto.")
      return
    }
    if (state.editingId) {
      dispatch({type: "UPDATE-EXPENSE", payload: {expense: {...expense, id: state.editingId}}})
    }else{
      dispatch({type: "ADD-EXPENSE", payload: {expense: expense}})
    }
    setExpense(initialExpense)
    setPreviousAmount(0)
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleOnSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.editingId ? "Actualizando Gasto" : "Nuevo Gasto"}</legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
          <input 
            type="text"
            id="expenseName"
            name="expenseName"
            className="bg-slate-100 p-2"
            placeholder="Añade el nombre del gasto."
            value={expense.expenseName}
            onChange={handleOnChangeInputs}
            />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">Cantidad:</label>
          <input 
            type="number"
            id="amount"
            name="amount"
            className="bg-slate-100 p-2"
            placeholder="Añade la cantidad del gasto: ej. 300."
            value={expense.amount}
            onChange={handleOnChangeInputs}
            />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-xl">Categoria:</label>
          <select
            id="category"
            name="category"
            className="bg-slate-100 p-2"
            value={expense.category}
            onChange={handleOnChangeInputs}
            >
              <option disabled value="">--- Seleccione ---</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">Fecha Gasto:</label>
          <DatePicker
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
            onChange={handleOnChangeDate}/>
        </div>
        <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}/>
      </form>
    </>
  )
}