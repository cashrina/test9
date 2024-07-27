import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {CategoryMutation} from "../../../types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {toast} from "react-toastify";
import {createCategory, fetchOneCategory, updateCategory} from "../../../store/Categori/categoriesThunks.ts";
import {selectCategory} from "../../../store/Categori/categoriesSlice.ts";

const AddCategories = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const selectCategories = useAppSelector(selectCategory);

    const [categories, setCategories] = useState<CategoryMutation>({
        type: '',
        name: '',
    });

    useEffect(() => {
        if (id) {
            const category = selectCategories.find(p => p.id === id);
            if (category) {
                setCategories({
                    type: category.type,
                    name: category.name,
                });
            } else {
                dispatch(fetchOneCategory(id));
            }
        } else {
            setCategories({
                type: '',
                name: '',
            });
        }
    }, [id, selectCategories, dispatch]);


    const onFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const body = {
                ...categories,
            };

            if (id !== undefined) {
                await dispatch(updateCategory({ id, apiCategory: body }));
                toast.success("Category successfully updated!");
            } else {
                await dispatch(createCategory({...categories})).unwrap();
                toast.success("Category successfully created!");
            }
            navigate("/categories");
        } catch (e) {
            console.error('Error:', e);
            toast.error('Could not save category');
        }
    };

    const onFieldChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setCategories((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">{id ? 'Edit Category' : 'Create Category'}</h2>
                    <form onSubmit={onFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="formType" className="form-label">Category Type</label>
                            <select
                                id="formType"
                                className="form-select"
                                name="type"
                                onChange={onFieldChange}
                                value={categories.type}
                                disabled={!!id}
                            >
                                <option value="" disabled className="text-muted">Chose</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formName" className="form-label">Name</label>
                            <input
                                required
                                type="text"
                                id="formName"
                                className="form-control"
                                name="name"
                                onChange={onFieldChange}
                                value={categories.name}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategories;