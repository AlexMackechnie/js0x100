import { useEffect, useState } from "react";

export default function App() {
    return (
        <div className="app" >
            <h2>Shop</h2>
            <FilterableProductTable />
        </div>
    );
}

function WrapperComponent({ children }) {
    return (
        <div style={{"color": "blue"}}>
            {children}
        </div>
    );
}

function InnerComponent({ children }) {
    return <h2>{children}</h2>
}

function FilterableProductTable() {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/grocery")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    return (
        <div>
            <SearchBar 
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable 
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
    return (
        <div className="searchBar">
            <form className="searchForm">
                <input 
                    type="text"
                    placeholder="search..."
                    value={filterText}
                    onChange={(e) => onFilterTextChange(e.target.value)}
                />
            </form>
            <form className="inputForm">
                <label>
                    <input 
                        type="checkbox"
                        value={inStockOnly}
                        onChange={(e) => onInStockOnlyChange(e.target.checked)}
                    />
                    {" "}
                    Only show products in stock
                </label>
            </form>
        </div>
    );
}

function ProductTable({ products, filterText, inStockOnly }) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }

        if (inStockOnly && !product.stocked) {
            return;
        }

        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );
    });

    return (
        <div className="productTableContainer">
            <table className="productTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="1">{category}</th>
        </tr>
    );
}

function ProductRow({ product }) {
    const name = product.stocked ? product.name :
        <span style={{ color: "red" }}>
            {product.name}
        </span>

    return (
        <tr>
            <td>{name}</td>
            <td>{product.category}</td>
            <td>£{product.price.toFixed(2)}</td>
        </tr>
    );
}
