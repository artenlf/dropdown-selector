import { useEffect, useState } from "react";
import "./App.css";
import listOfProducts from "./db.json";

const products = listOfProducts;

function App() {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        id: "id",
        name: "name",
        inverseName: "inverseName",
        price: "price",
        highestPrice: "highestPrice",
      };
      const sortProperty = types[type];
      const sorted = [...products].sort((a, b) => {
        return sortProperty === "name"
          ? a.name.localeCompare(b.name)
          : sortProperty === "inverseName"
          ? b.name.localeCompare(a.name)
          : sortProperty === "highestPrice"
          ? b.price - a.price
          : a[sortProperty] - b[sortProperty];
      });
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  return (
    <div className="App">
      <h1 className="title">Dynamic selector</h1>
      <div className="selectorContainer">
        <select
          className="selector"
          onChange={(event) => setSortType(event.target.value)}
        >
          <option>id</option>
          <option value="name">A-Z</option>
          <option value="inverseName">Z-A</option>
          <option value="price">Lowest price</option>
          <option value="highestPrice">Highest price</option>
        </select>
      </div>
      <div className="grid">
        {data.map((item) => {
          return (
            <div className="item" key={item.id}>
              <img src={item.picture} alt={item.name} />
              <div>{item.id}</div>
              <div>{item.name}</div>
              <div>{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
