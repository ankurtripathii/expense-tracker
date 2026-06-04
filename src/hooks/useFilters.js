import { useState, useMemo, useCallback } from 'react'

const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  dateFrom: '',
  dateTo: '',
  markedOnly: false,
}

/**
 * useFilters
 * Manages category, date-range, search, and mark filters.
 * Returns derived filtered list and filter state setters.
 * @param {Array} expenses - raw expenses array
 * @returns {{ filteredExpenses, filters, setFilter, resetFilters, activeCount }}
 */
export function useFilters(expenses) {
  const [filters, setFiltersState] = useState(DEFAULT_FILTERS)

  const setFilter = useCallback((key, value) => {
    setFiltersState(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS)
  }, [])

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (!exp.title.toLowerCase().includes(q) && !exp.note?.toLowerCase().includes(q)) {
          return false
        }
      }
      if (filters.category !== 'all' && exp.category !== filters.category) return false
      if (filters.dateFrom && exp.date < filters.dateFrom) return false
      if (filters.dateTo && exp.date > filters.dateTo) return false
      if (filters.markedOnly && !exp.marked) return false
      return true
    })
  }, [expenses, filters])

  const activeCount = useMemo(() => {
    return Object.entries(filters).filter(([k, v]) => {
      if (k === 'category') return v !== 'all'
      if (typeof v === 'boolean') return v
      return v !== ''
    }).length
  }, [filters])

  return { filteredExpenses, filters, setFilter, resetFilters, activeCount }
}
