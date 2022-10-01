import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";

const SearchPanel = ({filter, setFilter}) => {
    const [query, setQuery] = React.useState('');

    const handleSubmit = () => {
        setFilter({...filter, query: query});
    }

    const handleKeydown = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit()
        }
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        fullWidth
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Поиск"
                        inputProps={{ 'aria-label': 'Поиск' }}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeydown}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: '10px' }}
                        aria-label="search"
                        onClick={handleSubmit}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
        </div>
    );
};

export default SearchPanel;