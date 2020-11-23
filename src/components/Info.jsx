import React from 'react';
import styled from 'styled-components';

const StyledInfo = styled.div`
    width: 100%;
    max-width: 50%;
`;

const Info = ({ defaultUrl, query }) => {
    return (
        <StyledInfo>
            <h2>Default url:</h2>
            {defaultUrl}
            <h2>Query:</h2>
            {query}
            <h2>Full url:</h2>
            {defaultUrl + query}
        </StyledInfo>
    );
};

export default Info;
