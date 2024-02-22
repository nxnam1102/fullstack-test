import { AppBar, IconButton, TextField, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchHistory } from './search_history';
import SearchIcon from '@mui/icons-material/Search';

export interface Props {
  total: any;
  searchKey: any;
  onSearchHandle: (value: string) => any;
}

export const Search = (props: Props) => {
  const { onSearchHandle, total, searchKey } = props;
  const [value, setValue] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const theme = useTheme();

  useEffect(() => {
    setValue(searchKey);
  }, [searchKey]);

  const onValueChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSearch = useCallback(
    (searchText?: string) => {
      const searchValue =
        searchText !== undefined && searchText !== null ? searchText : value;
      onSearchHandle(searchValue);
    },
    [onSearchHandle, value]
  );

  const updateHistory = useCallback(() => {
    if (!value) return;
    setHistory((data) => {
      const newData = [value, ...data.slice(0, 2)];
      return newData;
    });
  }, [value]);

  const onClickChip = useCallback(
    (item: string, index: number) => {
      setValue(item);
      setHistory((data) => {
        const updateData = [...data];
        const itemMove = updateData.splice(index, 1)[0];
        updateData.unshift(itemMove);
        return updateData;
      });
      onSearch(item);
    },
    [onSearch]
  );

  const onDeleteChip = useCallback((item: string, index: number) => {
    setHistory((data) => {
      const newData = data.filter((item, i) => {
        return i !== index;
      });
      return newData;
    });
  }, []);

  const renderSearchHistory = useMemo(() => {
    return (
      <SearchHistory
        searchKey={searchKey}
        history={history}
        onClickChip={onClickChip}
        onDeleteChip={onDeleteChip}
        total={total}
      />
    );
  }, [history, onClickChip, onDeleteChip, searchKey, total]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSearch();
        updateHistory();
      }
    },
    [onSearch, updateHistory]
  );

  const buttonSearchClick = useCallback(() => {
    onSearch();
    updateHistory();
  }, [onSearch, updateHistory]);

  return (
    <AppBar
      data-testid={'product_search'}
      position='sticky'
      elevation={0}
      sx={{ padding: '10px', backgroundColor: 'white', top: 0 }}
    >
      <TextField
        value={value}
        onKeyDown={onKeyDown}
        onChange={onValueChange}
        sx={{
          margin: '10px 0px',
          width: '100%',
        }}
        placeholder='Enter to search'
        inputProps={{
          'aria-label': 'product_search_input',
        }}
        InputProps={{
          endAdornment: (
            <div
              style={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: '5px',
              }}
            >
              <IconButton
                aria-label='search'
                onClick={buttonSearchClick}
                data-testid={'product_search_button'}
              >
                <SearchIcon sx={{ color: 'white' }} />
              </IconButton>
            </div>
          ),
        }}
      />
      {renderSearchHistory}
    </AppBar>
  );
};
