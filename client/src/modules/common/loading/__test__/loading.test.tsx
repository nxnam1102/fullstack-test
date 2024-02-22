import { render, screen } from '@testing-library/react';
import { Loading } from '..';
import '@testing-library/jest-dom';

describe('Loading', () => {
  it('Render correctly', () => {
    render(<Loading visible={true} />);
    expect(screen.getByTestId('app_loading')).toBeInTheDocument();
  });
});
