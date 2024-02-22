import { Card, Typography, useTheme } from '@mui/material';
import { thousandFormat } from '../../helper';

export interface Props {
  data: any;
  onClick?: () => any;
  type?: 'details' | 'list';
}
export const ProductItem = (props: Props) => {
  const { data, onClick, type } = props;
  const item = data || {};
  const theme = useTheme();
  return (
    <Card
      data-testid={'product_item'}
      elevation={3}
      onClick={onClick}
      sx={
        type === 'details'
          ? { padding: '10px' }
          : {
              transition: 'transform 0.3s ease-in-out', // Add transition for smooth scaling
              '&:hover': {
                transform: 'scale(1.02)', // Scale the Paper on hover
              },
              cursor: 'pointer',
              padding: '10px',
            }
      }
    >
      <Typography data-testid={'product_item_name'} fontWeight={'bold'}>
        {item.name}
      </Typography>
      <Typography
        data-testid={'product_item_description'}
        textOverflow={'ellipsis'}
        noWrap={type === 'details' ? false : true}
        overflow={'hidden'}
      >
        {item.description}
      </Typography>

      <Typography color={'red'}>{thousandFormat(item.price)}</Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            padding: '5px 10px',
            borderRadius: '3px',
            backgroundColor: theme.palette.primary.main,
            alignItems: 'center',
            display: 'flex',
            alignSelf: 'center',
          }}
        >
          <Typography color={'white'}>{item.category}</Typography>
        </div>
      </div>
    </Card>
  );
};
