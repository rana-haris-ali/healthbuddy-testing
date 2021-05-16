import { CART_ADD_ITEM } from '../../constants/cartConstants';

// cart reduecr checks if item already exists in the cart
// and if it does then replaces it with new order specs

// if item does not exist then simply adds it to the cart

const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const itemAlreadyInCart = state.cartItems.find(
				(cartItem) => cartItem.productId === item.productId
			);

			if (itemAlreadyInCart) {
				return {
					...state,
					cartItems: state.cartItems.map((cartItem) =>
						cartItem.productId === item.productId ? item : cartItem
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		default:
			return state;
	}
};

export { cartReducer };
