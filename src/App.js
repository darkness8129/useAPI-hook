import React, { useState } from 'react';
import './App.css';
import useAPI from './useAPI';


const Data = ({ status, data, error, refetch }) => {

    if (status === 'idle') {
        return <div>Loading...</div>;
    }

    if (status === 'success') {
        return (
            <div>
                <code style={{ whiteSpace: 'pre' }}>
                    {JSON.stringify(data, null, '\t')}
                </code>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div>
                <p>Oops! Something went wrong.</p>
                <p>{error.message}</p>
                <button type="button" onClick={refetch}>
                    Retry
                </button>
            </div>
        );
    }

    return <h1>hello</h1>
}

const App = () => {
    const defaultUrl = 'https://hacker-news.firebaseio.com/v0/';

    const [query, setQuery] = useState('/item/2921983.json?print=pretty');
    const [fetchUrl, setFetchUrl] = useState(defaultUrl + query);

    const [data, status, error, refetch] = useAPI(fetchUrl);

    const handleSubmit = (e) => {
        setFetchUrl(defaultUrl + query)
        e.preventDefault();
    }

    const changeQuery = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className="app">
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="query">Query:</label>
                    <input type="text" name="query" id="query" value={query} onChange={changeQuery} />
                </p>
                <p>
                    <button type="submit">Fetch Data</button>
                </p>
            </form>

            <div>
                <h2>Default url:</h2>
                {defaultUrl}
                <h2>Query:</h2>
                {query}
                <h2>Full url:</h2>
                {defaultUrl + query}
            </div>
            <h1>Data:</h1>
            <Data status={status} data={data} error={error} refetch={refetch} />
        </div >
    );
}

export default App;
