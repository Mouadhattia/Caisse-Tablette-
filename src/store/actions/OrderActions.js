import swal from "sweetalert";
import { addOrder } from "../../services/OrderService";
import { clearCartAction } from "./CartActions";
export function orderAction(order) {

  return (dispatch) => {
    addOrder(order)
      .then(() => {
        swal(
          "succès!",
          "Merci pour votre commande, nous la traiterons dès que possible !",
          "success"
        );
        dispatch(clearCartAction());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
