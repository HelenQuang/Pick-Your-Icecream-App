import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <div>
      <h1>Design your ice-cream for this summer </h1>
      <OrderEntry />
      <SummaryForm />
    </div>
  );
}

export default App;
