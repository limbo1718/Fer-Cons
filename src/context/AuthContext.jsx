import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'))

  const login = (datos) => {
    setUser(datos)
    localStorage.setItem('user', JSON.stringify(datos))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
AuthProvider.propTypes = { children: PropTypes.node }

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
