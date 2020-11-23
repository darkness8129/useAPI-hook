import React from 'react';
import styled from 'styled-components';
import Preloader from './common/Preloader';
import { Btn } from './FetchForm';

const StyledData = styled.div`
    width: 100%;
    max-width: 50%;
`;

const Title = styled.h1`
    text-align: center;
`;

const RefetchBtn = styled(Btn)`
    &:hover {
        background: #bd8b17;
    }

    padding: 11px 15px 12px 15px;
    background: #f5bf42;
    margin: 0;
    box-shadow: 0 -3px #bd8b17 inset;
`;

const Data = ({ status, data, error, refetch }) => {
    if (status === 'idle') {
        return (
            <StyledData>
                <Preloader />
            </StyledData>
        );
    }

    if (status === 'error') {
        return (
            <StyledData>
                <p>Oops! Something went wrong.</p>
                <p>Error: {error.message}</p>
                <RefetchBtn type='button' onClick={refetch}>
                    Retry
                </RefetchBtn>
            </StyledData>
        );
    }

    return (
        <StyledData>
            <Title>Data:</Title>
            <code>{JSON.stringify(data)}</code>
        </StyledData>
    );
};

export default Data;
