import { useState, useEffect } from 'react'

/**
 * useLocalStorage
 * Mirrors useState API but persists value to localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if key not found
 * @returns {[*, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}"`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`useLocalStorage: error writing key "${key}"`, error)
    }
  }, [key, storedValue])

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
    } catch (error) {
      console.warn(`useLocalStorage: error setting key "${key}"`, error)
    }
  }

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`useLocalStorage: error removing key "${key}"`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}
