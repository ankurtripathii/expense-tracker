import { useState } from 'react'
import { useFormState } from '../hooks/useFormInput'
import { CATEGORIES, todayString } from '../utils/helpers'
import styles from './ExpenseForm.module.css'

const INITIAL = {
  title: '',
  amount: '',
  category: 'food',
  date: todayString(),
  note: '',
}

export default function ExpenseForm({ onAdd, onClose }) {
  const { values, handleChange, reset } = useFormState(INITIAL)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.title.trim()) { setError('Title is required'); return }
    if (!values.amount || isNaN(values.amount) || parseFloat(values.amount) <= 0) {
      setError('Enter a valid amount'); return
    }
    if (!values.date) { setError('Date is required'); return }
    setError('')
    onAdd(values)
    reset()
    onClose?.()
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Expense</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. Coffee at Starbucks"
              value={values.title}
              onChange={handleChange('title')}
              autoFocus
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Amount (₹)</label>
              <input
                className={styles.input}
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={values.amount}
                onChange={handleChange('amount')}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                type="date"
                value={values.date}
                onChange={handleChange('date')}
                max={todayString()}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <div className={styles.categoryGrid}>
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat.value}
                  className={`${styles.catBtn} ${values.category === cat.value ? styles.catActive : ''}`}
                  style={values.category === cat.value ? { borderColor: cat.color, background: cat.bg, color: cat.color } : {}}
                  onClick={() => handleChange('category')(cat.value)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Note <span className={styles.optional}>(optional)</span></label>
            <textarea
              className={styles.textarea}
              placeholder="Any additional details..."
              value={values.note}
              onChange={handleChange('note')}
              rows={2}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => { reset(); onClose?.() }}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
