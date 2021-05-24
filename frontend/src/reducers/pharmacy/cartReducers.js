import {
	CART_ADD_ITEM,
	CART_GET_SHIPPING_ADDRESS_FAILURE,
	CART_GET_SHIPPING_ADDRESS_REQUEST,
	CART_GET_SHIPPING_ADDRESS_SUCCESS,
	CART_REMOVE_ITEM,
} from '../../constants/cartConstants';

// cart reduecr checks if item already exists in the cart
// and if it does then replaces it with new order specs

// if item does not exist then simply adds it to the cart

const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
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

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.productId !== action.payload
				),
			};

		case CART_GET_SHIPPING_ADDRESS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CART_GET_SHIPPING_ADDRESS_SUCCESS:
			return {
				...state,
				loading: false,
				shippingAddress: action.payload,
			};
		case CART_GET_SHIPPING_ADDRESS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export { cartReducer };
