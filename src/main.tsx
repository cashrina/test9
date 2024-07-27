import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ToastContainer position="bottom-right" />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
