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

const ProductCategoryRow = ({ category }: { category: string }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable: React.FC<ProductArray> = ({ products }) => {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
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
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </form>
  );
};

const FilterableProductTable: React.FC<ProductArray> = ({ products }) => {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
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
