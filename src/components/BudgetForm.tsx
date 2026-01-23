import { useMemo, useState } from "react"
import { getDisplayAmount } from "../helpers/dataValidation"
import { useBudget } from "../hooks/useBudget"

type BudgetFormProps = {
  
}

export default function BudgetForm({}:BudgetFormProps) {

  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBudget(+e.target.value)
  }
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch({type: "ADD-BUDGET", payload: { budget: budget}})
  }
  const isValid = useMemo(()=> { return budget <= 0},[budget])

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label 
            className="text-4xl text-blue-600 font-bold text-center"
            htmlFor="budget" >Definir Presupuesto</label>
          <input 
            className="w-full bg-white border border-gray-200 p-2" 
            id="budget" 
            type="number" 
            name="budget" 
            placeholder="Define tu presupuesto"
            value={getDisplayAmount(budget)}
            onChange={handleChange} />
        </div>
        <input 
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10"
          type="submit"
          value="Definir Presupuesto"
          disabled={isValid} />
      </form>
    </>
  )
}