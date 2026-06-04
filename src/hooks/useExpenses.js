import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { generateId } from '../utils/helpers'

/**
 * useExpenses
 * Manages the full expenses list with CRUD operations.
 * Persists data to localStorage via useLocalStorage.
 * @returns {{ expenses, addExpense, updateExpense, removeExpense, toggleMark, clearAll }}
 */
export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])

  const addExpense = useCallback((expense) => {
    const newExpense = {
      id: generateId(),
      title: expense.title.trim(),
      amount: parseFloat(expense.amount),
      category: expense.category,
      date: expense.date,
      note: expense.note?.trim() || '',
      marked: false,
      createdAt: new Date().toISOString(),
    }
    setExpenses(prev => [newExpense, ...prev])
    return newExpense
  }, [setExpenses])

  const updateExpense = useCallback((id, updates) => {
    setExpenses(prev =>
      prev.map(exp =>
        exp.id === id
          ? { ...exp, ...updates, amount: parseFloat(updates.amount || exp.amount) }
          : exp
      )
    )
  }, [setExpenses])

  const removeExpense = useCallback((id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id))
  }, [setExpenses])

  const toggleMark = useCallback((id) => {
    setExpenses(prev =>
      prev.map(exp => exp.id === id ? { ...exp, marked: !exp.marked } : exp)
    )
  }, [setExpenses])

  const clearAll = useCallback(() => {
    setExpenses([])
  }, [setExpenses])

  return { expenses, addExpense, updateExpense, removeExpense, toggleMark, clearAll }
}
