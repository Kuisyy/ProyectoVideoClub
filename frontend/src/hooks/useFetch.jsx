// hook que se encargue de realizar cualquier peticion a la API

import { useEffect } from "react";
import { useState } from "react"

export const useFetch = (fetchFunction, dependencies=[]) => {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);

   const fecthData = async () => {
    try {
        const result = await fetchFunction();
    setData(result);
    } catch (error) {
        setError(error)
    } finally{
        setLoading(false);
    }
   }

   useEffect(() => {
    //Creo un objeto para abortar la peticion
    setLoading(true);
    fecthData();
   
   }, dependencies)
   
   return {data,loading,error}
}