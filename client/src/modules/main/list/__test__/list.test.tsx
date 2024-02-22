import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListProduct } from '..';
import { BrowserRouter } from 'react-router-dom';

describe('List', () => {
  it('Render correctly', () => {
    render(
      <BrowserRouter>
        <ListProduct />
      </BrowserRouter>
    );
    expect(screen.getByTestId('product_list')).toBeInTheDocument();
  });
});
