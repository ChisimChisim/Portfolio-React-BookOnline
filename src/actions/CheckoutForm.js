export const openSnackbar = (open, variant, message) => ({
    type: 'OPEN_SNACKBAR',
    payload: {
        open,
        variant,
        message,
    }
});

export const emptyCart = () => ({
    type: 'EMPTY_CART',
})