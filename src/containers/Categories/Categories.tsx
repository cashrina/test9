import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCategory, selectFetchCategories} from "../../store/Category/categoriesSlice.ts";
import {useEffect} from "react";
import {deleteCategory, fetchCategory} from "../../store/Category/categoriesThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";

const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategory);
    const isFetching = useAppSelector(selectFetchCategories);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const removeCategory = async (id: string) => {
        await dispatch(deleteCategory(id));
        await dispatch(fetchCategory());
    };

    return isFetching ? (
        <Spinner />
    ) : (
        <div>
            <div className="d-flex flex-row align-items-center justify-content-center">
                <h1 className="mx-5">Categories</h1>
                <NavLink to="/add-categories" className="btn btn-secondary mx-5 my-3 me-auto">Add categories</NavLink>
            </div>

            {categories.map((category) => (
                <div key={category.id} className="card mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h3 className="card-title mb-0">{category.name}</h3>
                        <h3
                            className={`ms-auto me-5 ${
                                category.type === 'income' ? 'text-success' : 'text-danger'
                            }`}
                        >
                            {category.type}
                        </h3>
                        <div>
                            <button
                                className="btn btn-danger me-2"
                                onClick={() => removeCategory(category.id)}
                            >
                                Delete
                            </button>
                            <NavLink className="btn btn-primary" to={`/edit/${category.id}`}>
                                Edit
                            </NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;