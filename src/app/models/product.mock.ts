import { faker } from '@faker-js/faker';

import { Product } from './product.model'

export const generateOneProduct = (): Product =>{
    return {
        id: faker.datatype.uuid(),
        price: parseInt(faker.commerce.price()),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: {
            id: faker.datatype.number(),
            name: faker.commerce.department()
        },
        images: [faker.image.imageUrl(),faker.image.imageUrl()]
    }
}

export const generateManyProducts = (size = 10): Product[] => {
    const products: Product[] = [];
    for (let i = 0; i < size; i++){
        products.push(generateOneProduct());
    }
    return [...products];
}