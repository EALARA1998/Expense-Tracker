import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

type FilterByCategoryProps = {
  
}

export default function FilterByCategory({}:FilterByCategoryProps) {
  
  const { dispatch } = useBudget()
  
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-10">
        <form>
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <label htmlFor="category">Filtrar Gastos</label>
            <select 
              id="category"
              className="bg-slate-100 p-3 flex-1 rounded"
              onChange={(e)=>{dispatch({type: "ADD-FILTER-CATEGORY", payload: {id: e.target.value}})}}>
              <option value="">--- Todas las Categorias ---</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </>
  )
}