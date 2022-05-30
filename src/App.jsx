import { useState } from "react";

const productList = [
  {
    id: "1111222",
    productName: "Keyboard",
    stock: 10,
    price: 2000,
  },
  {
    id: "1111223",
    productName: "Mouse",
    stock: 5,
    price: 1500,
  },
  {
    id: "1111224",
    productName: "Headphone",
    stock: 8,
    price: 2500,
  },
];

const App = () => {
  const [products, setProducts] = useState(
    productList.map((item) => ({
      ...item,
      quantity: 0,
      total: 0,
    }))
  );

  const incrementQuantity = (id) => {
    const newProducts = products.map((product) => {
      if (id == product.id && product.stock > product.quantity) {
        product.quantity++;
        product.total = product.quantity * product.price;
      }
      return product;
    });

    setProducts(newProducts);
  };

  const decrementQuantity = (id) => {
    const newProducts = products.map((product) => {
      if (id == product.id && product.quantity > 0) {
        product.quantity--;
        product.total = product.quantity * product.price;
      }
      return product;
    });

    setProducts(newProducts);
  };

  const total = products.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <div>
      <h1>Product List Beta</h1>
      <table
        style={{
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              {...product}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            ></TableRow>
          ))}
        </tbody>
      </table>
      {total > 0 && <p>Total: {total} BDT</p>}
    </div>
  );
};

const TableRow = ({
  id,
  productName,
  stock,
  price,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button onClick={() => increment(id)} disabled={quantity == stock}>
          +
        </button>
        <button onClick={() => decrement(id)} disabled={quantity == 0}>
          -
        </button>
      </td>
    </tr>
  );
};

export default App;
