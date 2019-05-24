const CART = 'cart';

export class CartUtil {
    public static addToCart(productId: string) {
        const existingCart = localStorage.getItem(CART) || '{}';
        var cart = JSON.parse(existingCart);
        if (!(productId in cart)) {
            cart[productId] = 1;
        } else {
            cart[productId]++;
        }
        localStorage.setItem(CART, JSON.stringify(cart));
    }

    public static removeFromCart(productId: string) {
        const existingCart = localStorage.getItem(CART) || '{}';
        var cart = JSON.parse(existingCart);
        if (productId in cart) {
            delete cart[productId];
        }
        localStorage.setItem(CART, JSON.stringify(cart));
    }

    public static decrementItemQuantity(productId: string) {
        const existingCart = localStorage.getItem(CART) || '{}';
        var cart = JSON.parse(existingCart);
        if (productId in cart) {
            cart[productId]--;
        }

        if (cart[productId] <= 0) {
            delete cart[productId];
        }
        localStorage.setItem(CART, JSON.stringify(cart));
    }

    public static getCart(): { string: number } {
        const existingCart = localStorage.getItem(CART) || '{}';
        var cart = JSON.parse(existingCart);
        return cart;
    }
}