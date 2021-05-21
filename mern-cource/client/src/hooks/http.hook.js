import React, { useState } from "react";

export const useHttp =() => {
    const [loaging, setLoaging] = useState(false)
    const [error, setError] = useState(null)

    const request = () =>{

    }

    return {loading, request, error}
}