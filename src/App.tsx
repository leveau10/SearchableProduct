import { useState } from "react";
import "./App.css";

interface Products {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductRowProps {
  product: Products;
}

interface ProductArray {
  products: Products[];
}

interface ProductTableProps {
  products: Products[];
  filterText: string;
  inStockOnly: boolean;
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
}

const FilterableProductTable: React.FC<ProductArray> = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="table-container">
      <h1>Quitanda do Seu Zé</h1>
      <SearchBar
        inStockOnly={inStockOnly}
        filterText={filterText}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        inStockOnly={inStockOnly}
        filterText={filterText}
      />
    </div>
  );
};

const ProductCategoryRow = ({ category }: { category: string }) => {
  return (
    <tr>
      <th className="categories" colSpan={2}>
        {category}
      </th>
    </tr>
  );
};

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    //terá um estado controlando se renderiza isso na tela
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  filterText,
  inStockOnly,
}) => {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    product.category !== lastCategory &&
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr className="name-price">
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar: React.FC<SearchBarProps> = ({
  inStockOnly,
  filterText,
  onFilterTextChange,
  onInStockOnlyChange,
}) => {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
};

export const App = () => {
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
};

const PRODUCTS = [
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
];
