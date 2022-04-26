import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../context/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState(false);
  const [OrderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        setErrors(true);
      });
  }, [optionType]);

  if (errors) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const item = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2 style={{ marginTop: "20px" }}>{title}:</h2>
      <p>€{pricePerItem[optionType]} /each</p>
      <p>
        {title} total: {OrderDetails.totals[optionType]}
      </p>
      <Row>{item}</Row>
    </>
  );
};

export default Options;
