import { useState, useMemo, useCallback } from 'react'

/**
 * useSort
 * Returns a sorted copy of the expenses array.
 * Supports sorting by amount, date, category, or title.
 * @param {Array} expenses
 * @returns {{ sorted, sortKey, sortDir, setSort, toggleDir }}
 */
export function useSort(expenses) {
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const setSort = useCallback((key) => {
    setSortKey(prev => {
      if (prev === key) {
        setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        return prev
      }
      setSortDir('desc')
      return key
    })
  }, [])

  const sorted = useMemo(() => {
    const arr = [...expenses]
    arr.sort((a, b) => {
      let aVal = a[sortKey]
      let bVal = b[sortKey]
      if (sortKey === 'amount') {
        aVal = parseFloat(aVal)
        bVal = parseFloat(bVal)
      } else if (sortKey === 'date') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      } else {
        aVal = String(aVal).toLowerCase()
        bVal = String(bVal).toLowerCase()
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return arr
  }, [expenses, sortKey, sortDir])

  return { sorted, sortKey, sortDir, setSort }
}
