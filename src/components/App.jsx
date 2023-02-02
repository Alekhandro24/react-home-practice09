import { useState } from 'react';
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from 'redux/goodsApi';

export const App = () => {
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      // unwrap => коректна робота всіх пропів({ isError })
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
    }
  };

  const handlrDeleteProduct = async id => {
    await deleteProduct(id).unwrap();
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={e => setNewProduct(e.target.value)}
        />
        <button type="button" onClick={handleAddProduct}>
          Add product
        </button>
      </div>

      <div>
        <select value={count} onChange={e => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <ul>
        {data.map(item => (
          <li
            key={item.id}
            onClick={() => handlrDeleteProduct(item.id)}
            style={{ cursor: 'pointer' }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};
