export const openSnackbar = (open, variant, message) => ({
    type: 'OPEN_SNACKBAR',
    payload: {
        open,
        variant,
        message,
    }
});

export const closeSnackbar = (open) => ({
    type: 'CLOSE_SNACKBAR',
    payload: {
        open,
    }
});