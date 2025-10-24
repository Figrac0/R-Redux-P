import { cartAction } from "./cart-slice";
import { uiAction } from "./us-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://redux-http-42a1a-default-rtdb.firebaseio.com/cart.json"
            );

            if (!response.ok) {
                throw new Error("Could not fetch cart data");
            }

            const data = await response.json();

            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(cartAction.replaceCart(cartData));
        } catch (error) {
            dispatch(
                uiAction.showNotification({
                    status: "error",
                    title: "Error!!!",
                    message: "Fetching cart data failed!",
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiAction.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://redux-http-42a1a-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response) {
                throw new Error("Sending failed");
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiAction.showNotification({
                    status: "success",
                    title: "Success!!!",
                    message: "Sending cart data successfully!",
                })
            );
        } catch (error) {
            dispatch(
                uiAction.showNotification({
                    status: "error",
                    title: "Error!!!",
                    message: "Sending cart data failed!",
                })
            );
        }
    };
};
