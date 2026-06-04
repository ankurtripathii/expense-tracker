import { useState, useCallback } from 'react'

/**
 * useFormInput
 * Manages a single form field's state with value, onChange, and reset.
 * @param {*} initialValue - default value for the field
 * @returns {{ value, onChange, reset, setValue }}
 */
export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e) => {
    const val = e && e.target !== undefined ? e.target.value : e
    setValue(val)
  }, [])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  return { value, onChange, reset, setValue }
}

/**
 * useFormState
 * Manages an entire form object with a single hook.
 * @param {object} initialValues - key/value pairs for form fields
 * @returns {{ values, handleChange, reset, setField }}
 */
export function useFormState(initialValues = {}) {
  const [values, setValues] = useState(initialValues)

  const handleChange = useCallback((field) => (e) => {
    const val = e && e.target !== undefined ? e.target.value : e
    setValues(prev => ({ ...prev, [field]: val }))
  }, [])

  const setField = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return { values, handleChange, reset, setField }
}
