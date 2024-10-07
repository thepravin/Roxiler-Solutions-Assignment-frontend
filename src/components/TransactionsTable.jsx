import { useEffect, useState } from 'react'; 
import './TransactionsTable.css'; // Import the CSS file

const TransactionsTable = ({ month, transactions }) => {
    const [data, setData] = useState(transactions); // Initialize with transactions prop
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Filter the transactions based on the search query
        const filteredData = transactions.filter(transaction => 
            transaction.title.toLowerCase().includes(search.toLowerCase()) ||
            transaction.description.toLowerCase().includes(search.toLowerCase()) ||
            transaction.category.toLowerCase().includes(search.toLowerCase())
        );

        // Paginate the filtered results
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        setData(paginatedData);
        setTotalPages(Math.ceil(filteredData.length / 10)); // Update total pages
    }, [transactions, search, page]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        setPage(1); // Reset to the first page when searching
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    let id = 1;

    return (
        <div className="transactions-table-container">
            <div className='header-container'>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <h2>Transaction List for {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            </div>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{id++}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.price.toFixed(2)}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? '✅' : '❌'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;
