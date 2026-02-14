export const coinFormater = (value: number) => {
    const realFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return realFormat.format(value);
}