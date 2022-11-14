import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../shared/validator'
import './Textbox.scss'
function Textbox({ field }) {
    const [value, setValue] = useState(() => {
        if ([null, undefined].includes(field.value))
            return ""
        else
            return field.value
    })
    const [error, setError] = useState(() => {
        let validatorErr = validator(field, field.value);
        field.error = validatorErr;
        return validatorErr;
    })
    const [isTouched, setIsTouched] = useState(false)

    const valueChanges = (e) => {
        let validatorErr = null;
        if (e && e.target) {
            let { value } = e.target
            field.value = (![null, undefined, ''].includes(value)) ? value : null
            validatorErr = validator(field, value);
            setError(validatorErr)
            setValue(value)
        }
        field.error = validatorErr;
    }

    return (
        <div className="fx-column fx-start-stretch">
            <label htmlFor={field.fieldCaption}>{field.fieldCaption}</label>
            <input type={field.type} name={field.fieldColumn} value={value} onChange={valueChanges} onBlur={() => setIsTouched(true)} />
            {
                (error && isTouched) ? <span>{error.msg}</span> : ''
            }
        </div>
    )
}

Textbox.propTypes = {
    field: PropTypes.shape({
        fieldType: PropTypes.string.isRequired,
        fieldColumn: PropTypes.string.isRequired,
        fieldCaption: PropTypes.string,
        additionMetaData: PropTypes.object,
        type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
        pattern: PropTypes.string,
        patternMsg: PropTypes.string,
        value: PropTypes.any,
        isRequired: PropTypes.bool,
        isReadonly: PropTypes.bool,
        isHidden: PropTypes.bool,
        error: PropTypes.any
    })
}

export default Textbox

