import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const orderDisabled = orderDetails.totals.scoops === "€0.00";

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
      <Button
        disabled={orderDisabled}
        variant="outline-info"
        onClick={() => {
          setOrderPhase("Review");
        }}
      >
        Place your order
      </Button>
    </div>
  );
};

export default OrderEntry;
