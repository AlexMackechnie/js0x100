import { useState } from "react";

export default function App() {
    return (
    <>
        <h2>Shop</h2>
        <FilterableProductTable />
    </>
    );
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]

function FilterableProductTable() {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar 
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable 
                products={PRODUCTS}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
    return (
        <div>
            <form>
                <input 
                    type="text"
                    placeholder="search..."
                    value={filterText}
                    onChange={(e) => onFilterTextChange(e.target.value)}
                />
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

        if (lastCategory !== product.category) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            )
            lastCategory = product.category;
        };
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
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
            <th colSpan="2">{category}</th>
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
            <td>{product.price}</td>
        </tr>
    );
}
