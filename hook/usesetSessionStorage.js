
import { useState, useEffect } from "react";

const useSessionStorage = (name,values) => {
    const [value, setValue] = useState('')

    useEffect(() => {
      setValue(sessionStorage.setItem(name,values))
    }, [])
  
    return value
}

export default useSessionStorage