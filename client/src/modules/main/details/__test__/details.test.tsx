import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DetailsProduct } from '..';

describe('Details', () => {
  it('Render correctly', () => {
    render(<DetailsProduct />);
    expect(screen.getByTestId('product_details')).toBeInTheDocument();
  });
});
