import React, { useState } from 'react';
import useAPI from './hooks/useAPI';
import Data from './components/Data'
import Info from './components/Info'
import FetchForm from './components/FetchForm';
import styled from 'styled-components';

const StyledApp = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:10px;
`;

const App = () => {
    const defaultUrl = 'https://hacker-news.firebaseio.com/v0';

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
        <StyledApp>
            <FetchForm onSubmit={handleSubmit} query={query} changeQuery={changeQuery} />
            <Info defaultUrl={defaultUrl} query={query} />
            <Data status={status} data={data} error={error} refetch={refetch} />
        </StyledApp >
    );
}

export default App;
