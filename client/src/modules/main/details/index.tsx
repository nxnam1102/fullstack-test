import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ProductItem } from '../item';
import { useCallback, useEffect, useState } from 'react';
import { ProductsService } from '../../services/products';

export const DetailsProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const loadData = useCallback(async () => {
    const result = await ProductsService.GetDetails(id);
    setData(result);
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Box
      sx={{
        padding: '10px',
        justifyContent: 'center',
        display: 'flex',
      }}
      data-testid={'product_details'}
    >
      <Box sx={{ maxWidth: '1000px' }}>
        <ProductItem data={data} type={'details'} />
      </Box>
    </Box>
  );
};
