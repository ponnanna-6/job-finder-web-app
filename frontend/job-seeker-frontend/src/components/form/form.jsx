import SkillsInput from '../skillsInput/skillsInput';
import styles from './form.module.css'

function FormField({ value, name, placeholder, options, label, type, onChange}) {
    return (
        <div className={styles.formFieldContainer}>
            {type !== "checkbox" && label && (
                <label id={name} htmlFor={name} className={styles.labelStyle}>
                    {label}
                </label>
            )}
            {type === "dropdown" ? (
                <select
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={styles.dropdownStyle}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options?.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === "skills" ? (
                <SkillsInput
                    id={name}
                    onChange={onChange}
                    data={value}
                    skillStyle={styles.inputStyle}
                />
            ) : type === "checkbox" ? (
                <>
                    <input
                        id={name}
                        type="checkbox"
                        checked={value}
                        name={name}
                        onChange={onChange}
                        className={styles.checkboxStyle}
                    />
                    {label && (
                        <label id={name} htmlFor={name} className={styles.checkBoxlabelStyle}>
                            {label}
                        </label>
                    )}
                </>
            ) : (
                <input
                    id={name}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    className={styles.inputStyle}
                />
            )}
        </div>

    );
}

export default function Form({ formFields, error, errorMessages, onSubmit, submitButton, cancelButton, onCancel}) {
    return (
        <form onSubmit={onSubmit} className={styles.container}>
            {formFields.map((item, index) => (
                <div key={index} className={styles.itemDiv}>
                    <FormField
                        value={item.value}
                        name={item.name}
                        placeholder={item.placeholder}
                        options={item.options}
                        label={item.label}
                        type={item.type}
                        onChange={item.onChange}
                    />
                    {error[item.name] && (
                        <p className={styles.errorStyle}>{errorMessages[item.name].message}</p>
                    )}
                </div>
            ))}
            <div className={styles.buttonContainer}>
                {cancelButton && <button className={styles.cancelButton} type="button" onClick={onCancel}>{cancelButton}</button>}
                {submitButton && <button className={styles.finalButton} type="submit">{submitButton}</button>}
            </div>
        </form>
    );
}