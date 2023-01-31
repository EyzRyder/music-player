import { useEffect, useState } from "react";
import Axios from 'axios';

const useGet = (url: string, data: string) => {
    const [dataPage, setDataPage] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (data == "") {
            return () => {
                setDataPage(null);
                setIsPending(false)
                setError(null);
            }
        }
        if (data.slice(0,24) !== "https://www.youtube.com/") {
            return () => {
                setDataPage(null);
                setIsPending(false)
                setError("Coloque um link do youtube");
            }
        }
        Axios.post(url, {data})
            .then(res => {
                if (res.statusText !== "OK") {
                    throw Error('Could not get the data fot that resource');
                }
                setIsPending(false);
                setDataPage(res.data)
            })
            .catch(err => {
                setError(err.message)
                console.log(err.message);
            })
    }, [data])
    
    return { dataPage, isPending, error }

}

export default useGet;