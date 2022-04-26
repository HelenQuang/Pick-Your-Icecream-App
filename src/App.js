import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        {/* <SummaryForm /> */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
