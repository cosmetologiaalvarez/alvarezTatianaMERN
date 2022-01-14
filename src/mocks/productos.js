import faker from 'faker';

export default generateProducts = (n = 5) => {
    let products = [];
    for (let i = 0; i < n; i++) {
        products.push({
            title: faker.commerce.productName(),
            price: faker.datatype.number({min: 10, max: 100}),
            thumbnail: faker.image.abstract(200) 
        })
        n++;
    }
    return products;
}