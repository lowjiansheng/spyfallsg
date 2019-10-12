import React from 'react';
import { Snackbar, Slide } from '@material-ui/core';

export const GenericSnackbar = () => {
    const [state, setState] = React.useState({
        open: true,
        vertical: "top",
        horizontal: "center",
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    }

    return <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={2000}
            key={`${vertical}, ${horizontal}`}
            open={open}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby' : 'message-id',
            }}
            message={<span id="message-id">I love snacks</span>}
    />
}