export const validator = (field, value = null) => {
    let errorPoint = null;
    if (field.isRequired && [null, undefined, ''].includes(value))
        errorPoint = 'required';
    if (field.pattern && ![null, undefined, ''].includes(value)) {
        let reg = new RegExp(field.pattern, 'g');
        if (!reg.test(value))
            errorPoint = 'pattern';
    }
    switch (errorPoint) {
        case 'required':
            return { required: true, msg: `${field.fieldCaption} is required.` }
        case 'pattern':
            return { pattern: true, msg: field.patternMsg }
        default:
            return null;
    }
}