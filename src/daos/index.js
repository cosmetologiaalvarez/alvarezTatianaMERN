let messages;
let carts;
let products;
let persistence = 'fileSystem';

const {default:CartsFileSystem} = await import('./cartsFileSystem.js');
carts = new CartsFileSystem();
const {default:ProductsFileSystem} = await import('./productsFileSystem.js');
products = new ProductsFileSystem();

switch (persistence) {
    case 'fileSystem':
        const {default:MessagesFileSystem} = await import('./messagesFyleSystem.js');
        messages = new MessagesFileSystem();
        break;
    case 'mongo':
        const {default:MessagesMongo} = await import('./messagesMongo.js');
        messages = new MessagesMongo();
        break;
    default:
        break;
}

export {messages, products, carts}; 