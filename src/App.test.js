import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup)

it('displays transaction form by default', async () => {
    const { getByTestId } = render(<App />);
    await waitForElement(()=>getByTestId('transaction-form'));
});

it('switch to transaction table when list button clicked', async () => {
    const { getByTestId, queryByTestId, getByText } = render(<App />);
    const listButton = await waitForElement(()=>getByTestId('list-button'));
    fireEvent.click(listButton);
    await waitForElement(()=>getByTestId('transaction-list'));
    expect(queryByTestId('transaction-form')).toBeNull();
})

it('switch to transaction form when new button clicked', async () => {
    const { getByTestId, queryByTestId, getByText } = render(<App />);

    const listButton = await waitForElement(()=>getByTestId('list-button'));
    fireEvent.click(listButton);

    const newButton = await waitForElement(()=>getByTestId('new-button'));
    fireEvent.click(newButton);

    await waitForElement(()=>getByTestId('transaction-form'));
    expect(queryByTestId('transaction-list')).toBeNull();
})



