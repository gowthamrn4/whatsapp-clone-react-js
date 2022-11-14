export const temp = () => {
    console.log('temp')
}

export const formValueProcess = (fields = [], form = null) => {
    let formValues = {};
    let isValid = true;
    if (form) {
        let formdata = new FormData(form);
        for (const field of fields) {
            if (field) {
                if (isValid)
                    isValid = !(field.error && Object.keys(field.error).length > 0)
                let value = formdata.getAll(field.fieldColumn)
                switch (field.fieldType) {
                    case 'textbox':
                        if (Array.isArray(value) && value.length > 0)
                            if (value.length > 1)
                                formValues[field.fieldColumn] = value;
                            else
                                formValues[field.fieldColumn] = value[0];
                        break;

                    default:
                        break;
                }
            }
        }
    }
    return {
        isValid,
        values: formValues
    };
}