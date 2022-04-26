import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>
        Design your favorite ice-cream for this summer!
      </h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2 style={{ marginTop: "30px" }}>
        Grand total: {orderDetails.totals.grandTotal}
      </h2>
    </div>
  );
};

export default OrderEntry;
