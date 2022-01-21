let cart;
let products;
let messages;
let users;
let persistence = 'mongo';

const {default:UserMongo} = await import('./users/usersMongo.js');
users = new UserMongo();

switch (persistence) {
    case 'fileSystem':
        const {default:CartsFileSystem} = await import('./carts/cartsFileSytem.js');
        const {default:ProductsFileSystem} = await import('./products/productsFileSystem.js');
        const {default:MessagesFileSystem} = await import('./messages/messagesFyleSystem.js');
        messages = new MessagesFileSystem();
        cart = new CartsFileSystem();
        products = new ProductsFileSystem();
        break;
    case 'mongo':
        const {default:CartsMongo} = await import('./carts/cartMongo.js');
        const {default:ProductsMongo} = await import('./products/productsMongo.js');
        const {default:MessageMongo} = await import('./messages/messagesMongo.js');
        messages = new MessageMongo();
        cart = new CartsMongo();
        products = new ProductsMongo();
        break;
    case 'firebase':
        const {default:CartsFireBase} = await import('./carts/cartFireBase.js');
        const {default:ProductsFireBase} = await import('./products/productsFireBase.js');
        cart = new CartsFireBase();
        products = new ProductsFireBase();
    default:
        break;
}

export {cart, products, messages, users};