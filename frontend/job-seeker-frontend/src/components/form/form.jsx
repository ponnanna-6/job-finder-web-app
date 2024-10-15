function FormField({ value, name, placeholder, label, type, onChange }) {
    return (
        <div style={{display:'flex',flexDirection:"row"}}>
            <input
                id={name}
                value={value}
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                style={{height:"20px", marginBottom: "10px"}}
            />
            {label ? (<label id={name} htmlFor={name}>{label}</label>) : null}
        </div>
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
                        label={item.label}
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