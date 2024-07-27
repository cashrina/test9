import Toolbar from "./components/Toolbar/Toolbar.tsx";
import Transactions from "./containers/Transaction/Transactions.tsx";
import Categories from "./containers/Categories/Categories.tsx";
import {Route, Routes} from "react-router-dom";
import TransactionForm from "./components/TransactionForm/TransactionForm.tsx";
import AddCategories from "./containers/Categories/AddCategories/AddCategories.tsx";

function App() {

    return (
        <>
            <Toolbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Transactions />}/>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/add-categories" element={<AddCategories />}/>
                    <Route path="/new-transaction" element={<TransactionForm />}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                </Routes>
            </div>
        </>
)
}

export default App
