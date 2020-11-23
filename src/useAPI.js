import { useEffect, useRef, useReducer } from "react";

// action types
const INIT = 'INIT';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const REFETCH = 'REFETCH';

// reducer
const fetchDataReducer = (state, action) => {
    switch (action.type) {
        case INIT:
            return { ...state, status: 'idle', error: null }
        case SUCCESS:
            return { ...state, status: 'success', data: action.data }
        case FAILURE:
            return { ...state, status: 'error', error: action.error }
        case REFETCH:
            return { ...state, refetchNum: state.refetchNum + 1 }
        default:
            throw new Error();
    }
}

const useAPI = (url) => {
    const initialState = {
        data: null,
        status: '',
        error: null,
        refetchNum: 0
    }
    const [state, dispatch] = useReducer(fetchDataReducer, initialState);

    // cache
    const cachedData = useRef({});

    // func for incrementing refetchNumber
    const refetch = () => {
        dispatch({ type: REFETCH });
    }

    useEffect(() => {
        // flag to prevent dispatching before unmounting
        let cancelled = false;

        const fetchData = async () => {
            dispatch({ type: INIT });

            // if we have this key(url) in cache
            if (cachedData.current[url]) {
                const dataFromCache = cachedData.current[url];

                // set data from cache
                dispatch({ type: 'SUCCESS', data: dataFromCache });
            }
            // if url is new
            else {
                // check for errors
                try {
                    const response = await fetch(url);
                    const fetchedData = await response.json();

                    // set data to cache 
                    cachedData.current[url] = fetchedData;

                    if (!cancelled) {
                        // set fetched data to state
                        dispatch({ type: SUCCESS, data: fetchedData });
                    }
                }
                catch (err) {
                    if (!cancelled) {
                        // set err if it is
                        dispatch({ type: FAILURE, error: err });
                    }
                }
            }
        }

        fetchData();

        // cancel before unmounting
        return () => {
            cancelled = true;
        };
    }, [url, state.refetchNum]);

    return [state.data, state.status, state.error, refetch];
}

export default useAPI;