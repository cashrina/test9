import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchTransaction, selectTransaction} from "../../store/Transaction/transactionSlice.ts";
import {useEffect} from "react";
import {deleteTransaction, fetchTransaction} from "../../store/Transaction/transactionThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {NavLink} from "react-router-dom";
import {selectCategory} from "../../store/Category/categoriesSlice.ts";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransaction);
    const isFetching = useAppSelector(selectFetchTransaction);
    const categories = useAppSelector(selectCategory);

    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);

    useEffect(() => {
        dispatch(fetchTransaction());
    }, [dispatch]);


    const getCategoryDetails = (categoryId: string, amount: number, type: string) => {
        const category = categories.find(cat => cat.id === categoryId);
        console.log('Category found:', category);

        if (!category) {
            return { name: 'Unknown Category', displayAmount: amount.toFixed(2), colorClass: '' };
        }

        const sign = type === 'expense' ? '-' : '+';
        const colorClass = type === 'expense' ? 'text-danger' : 'text-success';

        console.log('Type:', type, 'Sign:', sign, 'Color Class:', colorClass);

        return {
            name: category.name,
            displayAmount: `${sign}${amount.toFixed(2)}`,
            colorClass,
        };
    };


    const removeTransaction = async (id: string) => {
        await dispatch(deleteTransaction(id));
        await dispatch(fetchTransaction());
    };

    return isFetching ? (
        <Spinner />
    ) : (
        <div className="container mt-5 mb-5">
            <div className="mt-4 p-3 bg-light shadow rounded text-center border border-primary" style={{ fontSize: '2rem' }}>
                Total: {totalAmount.toFixed(2)} KGS
            </div>

            {transactions.map((transaction) => {
                const { name, displayAmount, colorClass } = getCategoryDetails(transaction.category, transaction.amount);

                return (
                    <div key={transaction.id} className="card mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column me-3">
                                <h5 className="card-title mb-1">{transaction.createdAt}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
                            </div>
                            <div className="d-flex align-items-center me-3">
                                <h4 className={`mb-0 me-3 ${colorClass}`}>
                                    {displayAmount} KGS
                                </h4>
                                <div className="d-flex">
                                    <button
                                        className="btn btn-danger me-2"
                                        onClick={() => removeTransaction(transaction.id)}
                                    >
                                        Delete
                                    </button>
                                    <NavLink className="btn btn-primary" to={`/edit/${transaction.id}`}>
                                        Edit
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Transactions;