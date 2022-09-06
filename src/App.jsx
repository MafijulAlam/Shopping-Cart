import React, { useState } from 'react';
import prodctsList from './data';
import classes from './App.module.css';

const TableRow = ({
  id,
  name,
  price,
  stock,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button disabled={quantity >= stock} onClick={() => increment(id)}>
          +
        </button>
        <button disabled={quantity <= 0} onClick={() => decrement(id)}>
          -
        </button>
      </td>
    </tr>
  );
};

const App = () => {
  const [products, setProducts] = useState(
    prodctsList.map((item) => ({ ...item, quantity: 0, total: 0 }))
  );

  const increment = (id) => {
    setProducts(
      products.map((item) => {
        if (id === item.id && item.stock > item.quantity) {
          item.quantity++;
          item.total = item.quantity * item.price;
        }
        return item;
      })
    );
  };
  const decrement = (id) => {
    const newProducts = products.map((item) => {
      if (id === item.id && item.quantity > 0) {
        item.quantity--;
        item.total = item.quantity * item.price;
      }
      return item;
    });
    setProducts(newProducts);
  };

  const total = products.reduce((pre, cur) => pre + cur.total, 0);

  return (
    <div className={classes.cart}>
      <h1>Shoping Cart</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <TableRow
              key={item.id}
              {...item}
              increment={increment}
              decrement={decrement}
            />
          ))}
        </tbody>
      </table>
      <h1>Total: {total}TK</h1>
    </div>
  );
};

export default App;
