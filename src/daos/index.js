let cart;
let products;
let messages;
let persistence = 'mongo';

const {default:MessagesFileSystem} = await import('./messages/messagesFyleSystem.js');
messages = new MessagesFileSystem();

switch (persistence) {
    case 'fileSystem':
        const {default:CartsFileSystem} = await import('./cart/cartsFileSytem.js');
        const {default:ProductsFileSystem} = await import('./products/productsFileSystem.js');
        cart = new CartsFileSystem();
        products = new ProductsFileSystem();
        break;
    case 'mongo':
        const {default:CartsMongo} = await import('./cart/cartMongo.js');
        const {default:ProductsMongo} = await import('./products/productsMongo.js');
        cart = new CartsMongo();
        products = new  ProductsMongo();
        break;
    default:
        break;
}

export {cart, products, messages};