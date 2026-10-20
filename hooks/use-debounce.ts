import React, { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay = 3000) {
    const [debouncedValue, setDebouncedValue] = useState<T>()
  useEffect(() => {
    const debouncingTimer = setTimeout(() => {
        setDebouncedValue(value)
    }, delay)
    

    return () => clearTimeout(debouncingTimer)
  }, [value])

  return debouncedValue

}

export default useDebounce
