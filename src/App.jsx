import { useState } from 'react'
import { useExpenses } from './hooks/useExpenses'
import { useFilters } from './hooks/useFilters'
import { useLocalStorage } from './hooks/useLocalStorage'
import { SEED_EXPENSES } from './utils/helpers'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Filters from './components/Filters'
import Summary from './components/Summary'
import styles from './App.module.css'

export default function App() {
  const { expenses, addExpense, removeExpense, toggleMark, clearAll } = useExpenses()
  const { filteredExpenses, filters, setFilter, resetFilters, activeCount } = useFilters(expenses)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'expenses')
  const [seeded, setSeeded] = useLocalStorage('seeded', false)

  const handleSeedData = () => {
    if (expenses.length === 0) {
      SEED_EXPENSES.forEach(e => addExpense(e))
      setSeeded(true)
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>💰</span>
            <div>
              <h1 className={styles.brandName}>ExpenseTracker</h1>
              <p className={styles.brandSub}>Built with React Custom Hooks</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            {expenses.length === 0 && !seeded && (
              <button className={styles.seedBtn} onClick={handleSeedData}>
                Load sample data
              </button>
            )}
            <button className={styles.addBtn} onClick={() => setShowForm(true)}>
              + Add Expense
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.leftCol}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'expenses' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('expenses')}
              >
                Expenses
                {filteredExpenses.length !== expenses.length && (
                  <span className={styles.tabBadge}>{filteredExpenses.length}</span>
                )}
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'summary' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </button>
            </div>

            {activeTab === 'expenses' && (
              <>
                <Filters
                  filters={filters}
                  setFilter={setFilter}
                  resetFilters={resetFilters}
                  activeCount={activeCount}
                  totalExpenses={expenses.length}
                />
                <ExpenseList
                  expenses={filteredExpenses}
                  onRemove={removeExpense}
                  onToggleMark={toggleMark}
                />
                {expenses.length > 0 && (
                  <div className={styles.danger}>
                    <button className={styles.clearBtn} onClick={clearAll}>
                      Clear all expenses
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'summary' && (
              <Summary expenses={expenses} />
            )}
          </div>

          <aside className={styles.rightCol}>
            <div className={styles.sideCard}>
              <h2 className={styles.sideTitle}>Custom Hooks Used</h2>
              <div className={styles.hookList}>
                {[
                  { name: 'useLocalStorage', desc: 'Persists expenses & settings across reloads', file: 'hooks/useLocalStorage.js' },
                  { name: 'useExpenses', desc: 'CRUD operations for the expenses list', file: 'hooks/useExpenses.js' },
                  { name: 'useFormState', desc: 'Manages form field state cleanly', file: 'hooks/useFormInput.js' },
                  { name: 'useFilters', desc: 'Category, date-range & search filtering', file: 'hooks/useFilters.js' },
                  { name: 'useSort', desc: 'Sorting by amount, date, category', file: 'hooks/useSort.js' },
                  { name: 'useSummary', desc: 'Memoized totals and monthly breakdowns', file: 'hooks/useSummary.js' },
                ].map(h => (
                  <div key={h.name} className={styles.hookItem}>
                    <code className={styles.hookName}>{h.name}()</code>
                    <p className={styles.hookDesc}>{h.desc}</p>
                    <span className={styles.hookFile}>{h.file}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {showForm && (
        <ExpenseForm
          onAdd={addExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
