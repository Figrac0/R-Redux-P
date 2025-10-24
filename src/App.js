import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
// import { uiAction } from "./store/us-slice";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.changed) {
            dispatch(sendCartData(cart));
        }

        // const sendCartData = async () => {
        // dispatch(
        //     uiAction.showNotification({
        //         status: "pending",
        //         title: "Sending...",
        //         message: "Sending cart data!",
        //     })
        // );
        // const response = await fetch(
        //     "https://redux-http-42a1a-default-rtdb.firebaseio.com/cart.json",
        //     {
        //         method: "PUT",
        //         body: JSON.stringify(cart),
        //     }
        // );
        // if (!response) {
        //     throw new Error("Sending failed");
        // }
        // dispatch(
        //     uiAction.showNotification({
        //         status: "success",
        //         title: "Success!!!",
        //         message: "Sending cart data successfully!",
        //     })
        // );
        // };
        // if (isInitial) {
        //     isInitial = false;
        //     return;
        // }
        // sendCartData().catch((error) => {
        //     dispatch(
        //         uiAction.showNotification({
        //             status: "error",
        //             title: "Error!!!",
        //             message: "Sending cart data failed!",
        //         })
        //     );
        // });
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
