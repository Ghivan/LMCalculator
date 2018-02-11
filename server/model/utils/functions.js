module.exports = {
    transform: (model, excludedFields = []) => {
        const obj = model.toObject();
        obj.id = obj._id.toString();
        delete obj.__v;
        delete obj._id;
        excludedFields.map(field => delete obj[field]);
        return obj;
    }
};