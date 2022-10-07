
export const formatPrice = (price) => {
    if (price) {
        return Intl.NumberFormat('Ru-ru', { style: 'currency', currency: 'RUB' }).format(price);
    }

    return '';
}