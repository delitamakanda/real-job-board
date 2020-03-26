import React, { Component } from 'react';
import { Button } from 'evergreen-ui';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <Button 
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}>
              Name
            </Button>
          </th>
          <th>
            <Button 
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price')}>
              Price
            </Button>
          </th>
          <th>
            <Button 
              onClick={() => requestSort('stock')}
              className={getClassNamesFor('stock')}>
              In Stock
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
      {items.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
      ))}
      </tbody>
    </table>
  );
};

class Profile extends Component {
    render() {
      return (
        <div>
          <h1>Profil</h1>
          <ProductTable products={[ { id: 1, name: 'Cheese', price: 4.9, stock: 20 }, { id: 2, name: 'Milk', price: 1.9, stock: 32 }, { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 }, { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 }, { id: 5, name: 'Butter', price: 0.9, stock: 99 }, { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 }, { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 }, { id: 11, name: 'Cheese', price: 4.9, stock: 20 }, { id: 22, name: 'Milk', price: 1.9, stock: 32 }, { id: 33, name: 'Yoghurt', price: 2.4, stock: 12 }, { id: 44, name: 'Heavy Cream', price: 3.9, stock: 9 }, { id: 55, name: 'Butter', price: 0.9, stock: 99 }, { id: 66, name: 'Sour Cream ', price: 2.9, stock: 86 }, { id: 77, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 }, { id: 111, name: 'Cheese', price: 4.9, stock: 20 }, { id: 122, name: 'Milk', price: 1.9, stock: 32 }, { id: 133, name: 'Yoghurt', price: 2.4, stock: 12 }, { id: 144, name: 'Heavy Cream', price: 3.9, stock: 9 }, { id: 155, name: 'Butter', price: 0.9, stock: 99 }, { id: 166, name: 'Sour Cream ', price: 2.9, stock: 86 }, { id: 177, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 }, ]} />
          <Button>I am using <span role="img" aria-label="">🌲</span> Evergreen!</Button>
          profile
        </div>
      )
    }
  };
  
  export default Profile;
