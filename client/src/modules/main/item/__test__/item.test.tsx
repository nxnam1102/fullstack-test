import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductItem } from '..';

const data = {
  id: 123,
  name: 'test name',
  description: `Lorem Ipsum is simply dummy text of the printing and 
  typesetting industry. Lorem Ipsum has been the industry's standard 
  dummy text ever since the 1500s, when an unknown printer took a galley 
  of type and scrambled it to make a type specimen book. It has survived 
  not only five centuries, but also the leap into electronic typesetting, 
  remaining essentially unchanged. It was popularised in the 1960s with the
   release of Letraset sheets containing Lorem Ipsum passages, 
   and more recently with desktop publishing software like Aldus PageMaker 
   including versions of Lorem Ipsum`,
  category: 'test category',
};

describe('Item', () => {
  it('Render correctly', () => {
    render(<ProductItem data={data} />);
    expect(screen.getByTestId('product_item')).toBeInTheDocument();
  });
  it('Render with empty data', () => {
    render(<ProductItem data={null} />);
    expect(screen.getByTestId('product_item_name').textContent).toEqual('');
  });
});

describe('Item details', () => {
  it('Show full description', () => {
    render(<ProductItem data={data} type='details' />);
    expect(screen.getByTestId('product_item_description').textContent).toEqual(
      data.description
    );
  });
});
