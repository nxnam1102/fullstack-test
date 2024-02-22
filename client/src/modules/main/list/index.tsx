import { Box, Grid, Snackbar } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Footer } from '../footer';
import { ProductItem } from '../item';
import { Search } from '../search';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../../interface';
import { getQuery } from '../../helper';
import { ProductsService } from '../../services/products';
import { Loading } from '../../common/loading';
import Alert from '@mui/material/Alert';

export const ListProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sp, setSP] = useSearchParams();
  const searchParamsObject: any = Object.fromEntries(sp);
  const [data, setData] = useState<any>({});
  const [visibleLoading, setVisibleLoading] = useState<boolean>(false);
  const [visibleAlert, setVisibleAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const searchParams = useMemo(() => {
    const data: SearchParams = {
      pageIndex: searchParamsObject.pageIndex,
      pageSize: searchParamsObject.pageSize,
      searchText: searchParamsObject.searchText,
    };
    return data;
  }, [
    searchParamsObject.pageIndex,
    searchParamsObject.pageSize,
    searchParamsObject.searchText,
  ]);

  useEffect(() => {
    if (location.pathname === '/' && !location.search) {
      const defaultSearchParam: SearchParams = { pageIndex: 1, pageSize: 10 };
      const queryString = getQuery(defaultSearchParam);
      navigate(`/${queryString}`);
    }
  }, [location, navigate]);

  const loadData = useCallback(async () => {
    try {
      if (!location.search) {
        return;
      }
      setVisibleLoading(true);
      const result = await ProductsService.Get(searchParams);
      setData(result);
    } catch (error: any) {
      setVisibleAlert(true);
      setAlertMessage(error.message);
    } finally {
      setVisibleLoading(false);
    }
  }, [location.search, searchParams]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSearchHandle = useCallback(
    (value: string) => {
      setSP({ ...searchParamsObject, searchText: value, pageIndex: 1 });
    },
    [searchParamsObject, setSP]
  );

  const renderSearch = useMemo(() => {
    return (
      <Search
        onSearchHandle={onSearchHandle}
        searchKey={data.searchText}
        total={data.total}
      />
    );
  }, [data.searchText, data.total, onSearchHandle]);

  const onItemClick = useCallback(
    (item: any) => {
      navigate(`/product/${item.id}`);
    },
    [navigate]
  );

  const renderItem = useCallback(
    (item: any) => {
      return (
        <ProductItem
          data={item}
          onClick={() => {
            onItemClick(item);
          }}
        />
      );
    },
    [onItemClick]
  );

  const onPageChange = useCallback(
    (pageNumber: number) => {
      setSP({ ...searchParamsObject, pageIndex: pageNumber });
    },
    [searchParamsObject, setSP]
  );

  const renderFooter = useMemo(() => {
    return (
      <Footer
        pageIndex={data.pageIndex}
        pageSize={data.pageSize}
        total={data.total}
        onPageChange={onPageChange}
      />
    );
  }, [data.pageIndex, data.pageSize, data.total, onPageChange]);

  const dataSource: any[] = useMemo(() => {
    return Array.isArray(data.data) ? data.data : [];
  }, [data.data]);

  const renderLoading = useMemo(() => {
    return <Loading visible={visibleLoading}></Loading>;
  }, [visibleLoading]);

  const renderAlert = useMemo(() => {
    return (
      <Snackbar
        open={visibleAlert}
        autoHideDuration={6000}
        onClose={() => {
          setVisibleAlert(false);
        }}
      >
        <Alert severity='error' variant='filled' sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    );
  }, [alertMessage, visibleAlert]);

  return (
    <Box
      data-testid={'product_list'}
      sx={{
        boxSizing: 'border-box',
        padding: '0px 50px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1000px',
          height: '100vh',
        }}
      >
        {renderSearch}
        <div
          style={{
            width: '100%',
            overflowY: 'auto',
            flexGrow: 1,
            display: 'flex',
            flex: 1,
            padding: '10px',
          }}
        >
          <Grid
            container
            spacing={3}
            columns={{ xs: 1, sm: 2, md: 2 }}
            sx={{ width: '100%' }}
          >
            {dataSource.map((item, index) => (
              <Grid item xs={1} sm={1} md={1} key={index}>
                {renderItem(item)}
              </Grid>
            ))}
          </Grid>
        </div>
        {renderFooter}
      </Box>
      {renderLoading}
      {renderAlert}
    </Box>
  );
};
