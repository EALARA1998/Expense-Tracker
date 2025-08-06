import type { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense["id"]
  currentCategory: Category["id"]
}
export type BudgetActions = 
  | { type: "ADD-BUDGET", payload: { budget: number } }
  | { type: "SHOW-MODAL" }
  | { type: "CLOSE-MODAL" }
  | { type: "ADD-EXPENSE", payload: { expense: DraftExpense} }
  | { type: "REMOVE-EXPENSE", payload: { id: Expense["id"] } }
  | { type: "UPDATE-EXPENSE", payload: { expense: Expense } }
  | { type: "GET-EXPENSE-BY-ID", payload: { id: Expense["id"] } }
  | { type: "RESET-APP" }
  | { type: "ADD-FILTER-CATEGORY", payload: {id: Category["id"]} }

// const initialBudget-reducer = () : Type => {
//   const localStorageCart = localStorage.getItem('guitar-cart')
//   return localStorageCart ? JSON.parse(localStorageCart) : []
// }

const initialBudget = () : number => {
  const localStorageBudget = localStorage.getItem("budget")
  return localStorageBudget ? +localStorageBudget : 0
}
const initialStorageExpenses = () : Expense[] => {
  const localStorageExpense = localStorage.getItem("expenses")
  return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export const initialState : BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialStorageExpenses(),
  editingId: "",
  currentCategory: ""
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
  switch (action.type) {

    case "ADD-BUDGET": {
      return { ...state, budget: action.payload.budget }
    }
    case "SHOW-MODAL": {
      return { ...state, modal: true}
    }
    case "CLOSE-MODAL": {
      return { ...state, modal: false, editingId: ""}
    }
    case "ADD-EXPENSE": {
      const draftExpense : Expense = {
        id: uuidv4(),
        ...action.payload.expense
      }
      return { 
        ...state, 
        expenses: [...state.expenses, draftExpense], 
        modal: false}
      }
    case "REMOVE-EXPENSE": {
      const newExpense = state.expenses.filter( expense => expense.id !== action.payload.id )
      return { ...state, expenses: newExpense}
    }
    case "UPDATE-EXPENSE": {
      return { ...state, expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense ), editingId: "", modal: false}
    }
    case "GET-EXPENSE-BY-ID": {
      return { ...state, editingId: action.payload.id, modal: true}
    }
    case "RESET-APP": {
      return { initialState }
    }
    case "ADD-FILTER-CATEGORY": {
      return { ...state, currentCategory: action.payload.id }
    }
    default:
      return state
  }
}