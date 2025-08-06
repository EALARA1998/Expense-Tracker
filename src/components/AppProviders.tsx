import BudgetProvider from "../contexts/BudgetContext"

type AppProvidersProps = {
  children: React.ReactNode
}

export default function AppProviders({children}:AppProvidersProps) {
  return (
    <>
      <BudgetProvider>
        {children}
      </BudgetProvider>
    </>
  )
}