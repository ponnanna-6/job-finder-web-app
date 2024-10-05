function FormField({ value, name, placeholder, type, onChange }) {
    return (
        <input
            value={value}
            name={name}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
        />
    );
}

export default function Form({ formFields, error, errorMessages, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            {formFields.map((item, index) => (
                <div key={index}>
                    <FormField
                        value={item.value}
                        name={item.name}
                        placeholder={item.placeholder}
                        type={item.type}
                        onChange={item.onChange}
                    />
                    {error[item.name] && (
                        <p style={{ color: "red" }}>{errorMessages[item.name].message}</p>
                    )}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}