import { Chip, Grid, Stack, Typography } from '@mui/material';
import { thousandFormat } from '../../../helper';

export interface Props {
  total: any;
  searchKey: string;
  history: string[];
  onDeleteChip: (value: string, index: number) => any;
  onClickChip: (value: string, index: number) => any;
}
export const SearchHistory = (props: Props) => {
  const { history, onDeleteChip, onClickChip, total, searchKey } = props;

  return (
    <Stack direction={'row'}>
      <Grid container spacing={1}>
        {history.map((item, index) => {
          return (
            <Grid item key={index}>
              <Chip
                size='small'
                label={item}
                variant='outlined'
                onDelete={() => {
                  onDeleteChip(item, index);
                }}
                onClick={() => {
                  onClickChip(item, index);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      {searchKey && (
        <Typography
          sx={{ width: '25%', padding: '0px 10px' }}
          color={'black'}
        >{`Search text: ${searchKey}`}</Typography>
      )}
      <Typography
        sx={{ width: '25%', padding: '0px 10px' }}
        color={'black'}
      >{`Total record: ${thousandFormat(total)}`}</Typography>
    </Stack>
  );
};
