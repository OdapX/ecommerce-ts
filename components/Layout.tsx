import Header from './Header'
import { useState, createContext, useContext } from 'react'

interface ContextType {
  Search: string
  setSearch: (arg: string) => void
}
export const SearchContext = createContext<ContextType>({
  Search: '',
  setSearch: () => {},
})

export default function Layout({ children }: { children: any }) {
  const [Search, setSearch] = useState('')
  return (
    <SearchContext.Provider value={{ Search, setSearch }}>
      <Header />
      <main>{children}</main>
    </SearchContext.Provider>
  )
}
