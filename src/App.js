import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./context/OrderDetails";
import Container from "react-bootstrap/Container";

function App() {
  const [orderPhase, setOrderPhase] = useState("Progress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "Progress":
      Component = OrderEntry;
      break;
    case "Review":
      Component = OrderSummary;
      break;
    case "Completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
