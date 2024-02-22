import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from '..';

const testSearchKey = 'test search key';

describe('Product Search', () => {
  it('Render correctly', () => {
    const searchfn = jest.fn();
    render(<Search onSearchHandle={searchfn} searchKey={''} total={1000} />);
    expect(screen.getByTestId('product_search')).toBeInTheDocument();
  });
});

describe('Exists search key', () => {
  it('Input have search key', () => {
    const searchfn = jest.fn();

    render(
      <Search
        onSearchHandle={searchfn}
        searchKey={testSearchKey}
        total={1000}
      />
    );
    expect(screen.getByLabelText('product_search_input')).toHaveValue(
      testSearchKey
    );
  });
});

describe('Click search button', () => {
  it('Call search function', () => {
    const searchfn = jest.fn();
    render(
      <Search
        onSearchHandle={searchfn}
        searchKey={testSearchKey}
        total={1000}
      />
    );
    const searchButton = screen.getByTestId('product_search_button');
    fireEvent.click(searchButton);
    expect(searchfn).toHaveBeenCalled();
  });
});

describe('Delete chip', () => {
  it('Call delete function', () => {
    const searchfn = jest.fn();
    render(
      <Search
        onSearchHandle={searchfn}
        searchKey={testSearchKey}
        total={1000}
      />
    );
    const searchButton = screen.getByTestId('product_search_button');
    fireEvent.click(searchButton);
    expect(searchfn).toHaveBeenCalled();
    const deleteButton = screen.getByTestId('CancelIcon');
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();
  });
});

describe('Click chip', () => {
  it('Call click function', () => {
    const searchfn = jest.fn();
    render(
      <Search
        onSearchHandle={searchfn}
        searchKey={testSearchKey}
        total={1000}
      />
    );
    const searchButton = screen.getByTestId('product_search_button');
    fireEvent.click(searchButton);
    expect(searchfn).toHaveBeenCalled();
    const input = screen.getByLabelText('product_search_input');
    fireEvent.change(input, { target: { value: 'Hello, World!' } });
    const chipButton = screen.getByTestId('chip_button');
    fireEvent.click(chipButton);
    expect(screen.getByLabelText('product_search_input')).toHaveValue(
      testSearchKey
    );
  });
});
