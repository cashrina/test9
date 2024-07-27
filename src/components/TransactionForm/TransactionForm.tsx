import {useAppSelector} from "../../app/hooks.ts";
import {selectCategory} from "../../store/Category/categoriesSlice.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {toast} from "react-toastify";


const TransactionForm = () => {
    const categoriesName = useAppSelector(selectCategory);
    const [formData, setFormData] = useState({
        category: '',
        amount: 0,
        createdAt: new Date().toISOString().split('T')[0],
    });

    const [selectedType, setSelectedType] = useState<string>('');

    const onFieldChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value, type } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const onTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
        setFormData(prev => ({
            ...prev,
            category: '',
        }));
    };

    const onFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const dataToSubmit = {
                ...formData,
                createdAt: new Date().toISOString().split('T')[0],
            };
            console.log('Form data:', dataToSubmit);
            toast.success("Form submitted successfully!");
        } catch (e) {
            console.error('Error:', e);
            toast.error('Could not submit the form');
        }
    };

    const filteredCategories = categoriesName.filter(cat => cat.type === selectedType);

    console.log(selectedType)

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center mb-4">Create or Update Entry</h2>
                    <form onSubmit={onFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="formType" className="form-label">Type</label>
                            <select
                                id="formType"
                                className="form-select"
                                name="type"
                                onChange={onTypeChange}
                                value={selectedType}
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formCategory" className="form-label">Category</label>
                            <select
                                id="formCategory"
                                className="form-select"
                                name="category"
                                onChange={onFieldChange}
                                value={formData.category}
                                disabled={!selectedType}
                            >
                                <option value="" disabled>Select Category</option>
                                {filteredCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formAmount" className="form-label">Amount</label>
                            <input
                                type="number"
                                id="formAmount"
                                className="form-control"
                                name="amount"
                                onChange={onFieldChange}
                                value={formData.amount}
                                placeholder="Enter amount"
                                min="0"
                                step="1"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;