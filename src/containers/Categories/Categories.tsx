import {NavLink} from "react-router-dom";

const Categories = () => {
    return (
        <div className="d-flex flex-row align-items-center justify-content-center">
            <h1 className="mx-5">Categories</h1>
            <NavLink to="/add-categories" className="btn btn-secondary mx-5 my-3 me-auto">Add categories</NavLink>
        </div>
    );
};

export default Categories;