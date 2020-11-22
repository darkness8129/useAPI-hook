import { useEffect, useState, useRef, useCallback } from "react";

const useAPI = (url) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    // cache
    const cachedData = useRef({});

    useEffect(() => {
        // flag to prevent request before unmounting and rerender 
        let cancelled = false;

        const fetchData = async () => {
            // if we have this key(url) in cache
            if (cachedData.current[url]) {
                const dataFromCache = cachedData.current[url];
                // set data from cache
                setData(dataFromCache);
                setStatus('success')
            }
            // if url is new
            else {
                // check for errors
                try {
                    if (!cancelled) {
                        const response = await fetch(url);
                        const fetchedData = await response.json();
                        // set data to cache 
                        cachedData.current[url] = fetchedData;
                        // set fetched data to state
                        setData(fetchedData);
                        setStatus('success');
                    }
                }
                catch (err) {
                    if (!cancelled) {
                        // set err if it is
                        setError(err);
                        setStatus('error');
                    }
                }
            }
        }

        fetchData();

        // cancel before unmounting and rerender 
        return () => {
            cancelled = true;
        };
    }, [url]);


    return [data, status, error];
}

export default useAPI;