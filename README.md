# 💰 Expense Tracker — React Custom Hooks Project

A fully-featured Personal Expense Tracker built with React, demonstrating all 5 phases of the **Custom Hooks** learning curriculum.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx        # Add expense modal with category picker
│   ├── ExpenseForm.module.css
│   ├── ExpenseList.jsx        # Sortable expense list with delete/mark
│   ├── ExpenseList.module.css
│   ├── Filters.jsx            # Search, category, date-range filters
│   ├── Filters.module.css
│   ├── Summary.jsx            # Stats, bar chart, category breakdown
│   └── Summary.module.css
│
├── hooks/                     ← All custom hooks live here
│   ├── useLocalStorage.js     # Phase 4 — persist state to localStorage
│   ├── useFormInput.js        # Phase 3 — form field & form state hooks
│   ├── useExpenses.js         # Phase 3 — CRUD for expenses list
│   ├── useFilters.js          # Phase 5 — filter & search logic
│   ├── useSort.js             # Phase 5 — sort by amount/date/category
│   └── useSummary.js          # Phase 5 — memoized totals & breakdowns
│
├── utils/
│   └── helpers.js             # Constants, formatters, seed data
│
├── App.jsx                    # Root component
├── App.module.css
├── main.jsx
└── index.css
```

---

## 🪝 Custom Hooks Reference

### `useLocalStorage(key, initialValue)`
**Phase 4** — Mirrors `useState` API but syncs to `localStorage`.
```js
const [value, setValue, removeValue] = useLocalStorage('expenses', [])
```

### `useFormInput(initialValue)`
**Phase 3** — Single field manager.
```js
const { value, onChange, reset } = useFormInput('')
```

### `useFormState(initialValues)`
**Phase 3** — Whole-form state manager.
```js
const { values, handleChange, reset, setField } = useFormState({ title: '', amount: '' })
```

### `useExpenses()`
**Phase 3 + 4** — CRUD with localStorage persistence.
```js
const { expenses, addExpense, updateExpense, removeExpense, toggleMark, clearAll } = useExpenses()
```

### `useFilters(expenses)`
**Phase 5** — Derives filtered list from raw expenses.
```js
const { filteredExpenses, filters, setFilter, resetFilters, activeCount } = useFilters(expenses)
```

### `useSort(expenses)`
**Phase 5** — Returns sorted array with toggle support.
```js
const { sorted, sortKey, sortDir, setSort } = useSort(expenses)
```

### `useSummary(expenses)`
**Phase 5** — Memoized totals, monthly data, and category breakdown.
```js
const { total, monthlyData, categoryData, highestMonth, topCategory } = useSummary(expenses)
```

---

## ✨ Features

- ✅ Add expenses with title, amount, category, date, and notes
- ✅ Delete expenses (with double-confirm UX)
- ✅ Mark expenses as paid/unpaid
- ✅ Persist data across page reloads (localStorage)
- ✅ Filter by category, date range, search text, and paid status
- ✅ Sort by date, amount, category, or title (asc/desc)
- ✅ Monthly bar chart (last 6 months)
- ✅ Per-category breakdown with progress bars
- ✅ Sample data loader to explore the app quickly

---

## 🏗️ Learning Phases Implemented

| Phase | Focus | Hooks |
|-------|-------|-------|
| 1 | Project setup & structure | — |
| 2 | Component state (raw) | `useState` |
| 3 | Extract custom hooks | `useFormInput`, `useFormState`, `useExpenses` |
| 4 | Data persistence | `useLocalStorage` |
| 5 | Filtering & advanced features | `useFilters`, `useSort`, `useSummary` |

---

## 🛠️ Tech Stack

- **React 18** with hooks
- **Vite** for fast development
- **Recharts** for charts
- **Lucide React** for icons
- CSS Modules for scoped styling
- No Redux / no global state library — just custom hooks!
