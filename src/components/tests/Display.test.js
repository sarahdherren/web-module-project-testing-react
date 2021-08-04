import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetchShow from '../../api/fetchShow';
import Display from './../Display';

jest.mock("../../api/fetchShow");

const displayFunc = jest.fn();

const testShow = {
    //add in approprate test data structure here.
    name: 'test show',
    summary: 'summary of test show',
    seasons: [
        {id: 1, name: 'season 1', episodes:[]},
        {id: 2, name: 'season 2', episodes:[]},
        {id: 3, name: 'season 3', episodes:[]},
    ]
}

test('renders Display without any passed in props', () => {
    render(<Display />)
})


test('when fetch button is pressed show cmopoennt renders', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />)
    const button = screen.queryByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(screen.getByTestId('show-container')).toBeInTheDocument()
    })

    const dropDown = screen.getByRole('combobox')
    userEvent.click(dropDown)
    expect(dropDown).toHaveLength(4)
})

test('when displayFun is passed as props that it renders when fetch button is clicked', async () => {
    render(<Display />)
    expect(displayFunc).not.toBeCalled()
    const button = screen.queryByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})











///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.