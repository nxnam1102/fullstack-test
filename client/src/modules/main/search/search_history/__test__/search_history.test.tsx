import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchHistory } from '..';

describe('Search History', () => {
  it('Render correctly', () => {
    const clickfn = jest.fn();
    const deletefn = jest.fn();
    render(
      <SearchHistory
        history={['test']}
        onClickChip={clickfn}
        onDeleteChip={deletefn}
        searchKey=''
        total={100}
      />
    );
    expect(screen.getByTestId('search_history')).toBeInTheDocument();
  });
});

describe('Delete chip', () => {
  it('Call delete function', () => {
    const clickfn = jest.fn();
    const deletefn = jest.fn();
    render(
      <SearchHistory
        history={['test']}
        onClickChip={clickfn}
        onDeleteChip={deletefn}
        searchKey=''
        total={100}
      />
    );
    const deleteButton = screen.getByTestId('CancelIcon');
    fireEvent.click(deleteButton);
    expect(deletefn).toHaveBeenCalled();
  });
});

describe('Click chip', () => {
  it('Call click function', () => {
    const clickfn = jest.fn();
    const deletefn = jest.fn();
    render(
      <SearchHistory
        history={['test']}
        onClickChip={clickfn}
        onDeleteChip={deletefn}
        searchKey=''
        total={100}
      />
    );
    const chipButton = screen.getByTestId('chip_button');
    fireEvent.click(chipButton);
    expect(clickfn).toHaveBeenCalled();
  });
});

describe('Have search key', () => {
  it('Show search key', () => {
    const clickfn = jest.fn();
    const deletefn = jest.fn();
    const testSearchKey = 'test search key';
    render(
      <SearchHistory
        history={['test']}
        onClickChip={clickfn}
        onDeleteChip={deletefn}
        searchKey={testSearchKey}
        total={100}
      />
    );
    expect(screen.getByTestId('search_history_search_key')).toBeInTheDocument();
  });
});
