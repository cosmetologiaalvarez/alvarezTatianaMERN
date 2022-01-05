let cart;
let products;
let messages;
let persistence = 'firebase';

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
        products = new ProductsMongo();
        break;
    case 'firebase':
        const {default:CartsFireBase} = await import('./cart/cartFireBase.js');
        const {default:ProductsFireBase} = await import('./products/productsFireBase.js');
        cart = new CartsFireBase();
        products = new ProductsFireBase();
    default:
        break;
}

export {cart, products, messages};