import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '..';

describe('Footer', () => {
  it('Render correctly', () => {
    const mockfn = jest.fn();
    render(
      <Footer pageIndex={1} pageSize={10} total={100} onPageChange={mockfn} />
    );
    expect(screen.getByTestId('products_footer')).toBeInTheDocument();
  });
});

describe('Click on next page', () => {
  it('call onPageChange function', () => {
    const mockfn = jest.fn();
    render(
      <Footer pageIndex={1} pageSize={10} total={100} onPageChange={mockfn} />
    );
    const nextPageButton = screen.getByTestId('NavigateNextIcon');
    fireEvent.click(nextPageButton);
    expect(mockfn).toHaveBeenCalled();
  });
});
