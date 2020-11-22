import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [data, setData] = useState(null);
    const [defaultUrl, setDefaultUrl] = useState('https://hacker-news.firebaseio.com/v0');
    const [query, setQuery] = useState('/item/2921983.json?print=pretty');

    const fetchData = async (defaultUrl, query) => {
        const response = await fetch(defaultUrl + query);
        const fetchedData = await response.json();
        setData(fetchedData);
    }

    const handleSubmit = (e) => {
        fetchData(defaultUrl, query)
        e.preventDefault();
    }

    const changeDefaultUrl = (e) => {
        setDefaultUrl(e.target.value);
    }

    const changeQuery = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className="app">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="default-url">Default url:</label>
                        <input type="url" name="default-url" id="default-url" value={defaultUrl} onChange={changeDefaultUrl} />
                    </p>
                    <p>
                        <label htmlFor="query">Query:</label>
                        <input type="text" name="query" id="query" value={query} onChange={changeQuery} />
                    </p>
                    <p>
                        <button type="submit">Fetch Data</button>
                    </p>
                </form>
            </div>
            <div>
                <h2>Your link:</h2>
                {defaultUrl + query}
            </div>
            <div>
                <h2>Your data:</h2>
                <code style={{ whiteSpace: 'pre' }}>
                    {JSON.stringify(data, null, '\t')}
                </code>
            </div>
        </div >
    );
}

export default App;
