'use client'

import { useState, useEffect, useRef } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Keep track of initial mount
  const isFirstRender = useRef(true)
  
  // Initialize state
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Only sync to localStorage after initial render
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  // State setter with value comparison
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      
      // Only update if value has changed
      if (JSON.stringify(newValue) !== JSON.stringify(storedValue)) {
        setStoredValue(newValue)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
} 