import { Backdrop, CircularProgress } from '@mui/material';

export interface Props {
  visible: boolean;
}

export const Loading = (props: Props) => {
  const { visible } = props;

  return (
    <Backdrop
      sx={{
        backgroundColor: 'transparent',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={visible}
      aria-label='app_loading'
      data-testid='app_loading'
    >
      <CircularProgress sx={{ color: (theme) => theme.palette.primary.main }} />
    </Backdrop>
  );
};
