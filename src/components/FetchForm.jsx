import React from 'react';
import styled from 'styled-components';

export const Btn = styled.button`
    font-weight: 700;
    color: white;
    text-decoration: none;
    border-radius: 3px;
    transition: 0.2s;
    cursor: pointer;
    border: none;
`;

const SubmitBtn = styled(Btn)`
    &:hover {
        background: rgb(53, 167, 110);
    }

    background: rgb(64, 199, 129);
    box-shadow: 0 -3px rgb(53, 167, 110) inset;
    padding: 11px 10px 12px 10px;
    margin: 0 10px;
`;

const Input = styled.input.attrs((props) => ({
    type: 'text',
    name: 'query',
    id: 'query',
}))`
    padding: 10px;
    width: 300px;
    border-radius: 3px;
    border: 1px solid grey;
`;

const Paragraph = styled.p`
    display: inline-block;
`;

const Label = styled.label`
    display: block;
    font-size: 20px;
    padding-bottom: 10px;
    font-weight: bold;
`;

const FetchForm = ({ onSubmit, query, changeQuery }) => {
    return (
        <form onSubmit={onSubmit}>
            <Paragraph>
                <Label htmlFor='query'>Query:</Label>
                <Input
                    name='query'
                    id='query'
                    value={query}
                    onChange={changeQuery}
                />
            </Paragraph>
            <Paragraph>
                <SubmitBtn type='submit'>Fetch Data</SubmitBtn>
            </Paragraph>
        </form>
    );
};

export default FetchForm;
