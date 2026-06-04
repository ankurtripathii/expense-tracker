import { useState } from 'react'
import { getCategoryMeta, formatCurrency, formatDate } from '../utils/helpers'
import { useSort } from '../hooks/useSort'
import styles from './ExpenseList.module.css'

const SORT_OPTIONS = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'category', label: 'Category' },
  { key: 'title', label: 'Title' },
]

export default function ExpenseList({ expenses, onRemove, onToggleMark }) {
  const { sorted, sortKey, sortDir, setSort } = useSort(expenses)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleDelete = (id) => {
    if (confirmDelete === id) {
      onRemove(id)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
      setTimeout(() => setConfirmDelete(null), 2500)
    }
  }

  if (expenses.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>💸</div>
        <p className={styles.emptyTitle}>No expenses yet</p>
        <p className={styles.emptyText}>Add your first expense to get started</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.sortBar}>
        <span className={styles.sortLabel}>Sort by</span>
        <div className={styles.sortBtns}>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`${styles.sortBtn} ${sortKey === opt.key ? styles.sortActive : ''}`}
              onClick={() => setSort(opt.key)}
            >
              {opt.label}
              {sortKey === opt.key && (
                <span className={styles.sortDir}>{sortDir === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          ))}
        </div>
        <span className={styles.count}>{expenses.length} items</span>
      </div>

      <div className={styles.list}>
        {sorted.map(expense => {
          const cat = getCategoryMeta(expense.category)
          return (
            <div
              key={expense.id}
              className={`${styles.item} ${expense.marked ? styles.itemMarked : ''}`}
            >
              <div className={styles.catIcon} style={{ background: cat.bg, color: cat.color }}>
                {cat.icon}
              </div>

              <div className={styles.info}>
                <div className={styles.titleRow}>
                  <span className={styles.itemTitle}>{expense.title}</span>
                  {expense.marked && <span className={styles.markedBadge}>✓ Paid</span>}
                </div>
                <div className={styles.meta}>
                  <span className={styles.catLabel} style={{ color: cat.color }}>{cat.label}</span>
                  <span className={styles.dot}>·</span>
                  <span>{formatDate(expense.date)}</span>
                  {expense.note && (
                    <>
                      <span className={styles.dot}>·</span>
                      <span className={styles.note}>{expense.note}</span>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.right}>
                <span className={styles.amount}>{formatCurrency(expense.amount)}</span>
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionBtn} ${expense.marked ? styles.actionBtnActive : ''}`}
                    onClick={() => onToggleMark(expense.id)}
                    title={expense.marked ? 'Mark as unpaid' : 'Mark as paid'}
                  >
                    {expense.marked ? '✓' : '○'}
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn} ${confirmDelete === expense.id ? styles.deleteBtnConfirm : ''}`}
                    onClick={() => handleDelete(expense.id)}
                    title={confirmDelete === expense.id ? 'Click again to confirm' : 'Delete'}
                  >
                    {confirmDelete === expense.id ? '?' : '✕'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
