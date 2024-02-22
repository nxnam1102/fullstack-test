import { AppBar, Pagination, Toolbar, useTheme } from '@mui/material';

export interface Props {
  total: any;
  pageIndex: any;
  pageSize: any;
  onPageChange: (pageNumber: number) => any;
}
export const Footer = (props: Props) => {
  const { pageIndex, pageSize, total, onPageChange } = props;

  const totalPages =
    total && pageSize ? Math.ceil(parseInt(total) / parseInt(pageSize)) : 0;
  console.log(totalPages, total, pageSize);
  const theme = useTheme();

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{ top: 'auto', bottom: 0, zIndex: 10, backgroundColor: 'white' }}
    >
      <Toolbar style={{ justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={parseInt(pageIndex) || 1}
          size='small'
          onChange={(e, value) => {
            onPageChange(value);
          }}
        />
        {/* <TextField
          size='small'
          type='number'
          sx={{
            width: '150px',
            marginLeft: '20px',
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                '-webkit-appearance': 'none',
                margin: 0,
              },
          }}
          InputProps={{
            sx: { paddingRight: '3px' },
            endAdornment: (
              <div
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '5px',
                }}
              >
                <IconButton size='small' onClick={() => {}}>
                  <ArrowForwardIcon sx={{ color: 'white' }} />
                </IconButton>
              </div>
            ),
          }}
        /> */}
      </Toolbar>
    </AppBar>
  );
};
