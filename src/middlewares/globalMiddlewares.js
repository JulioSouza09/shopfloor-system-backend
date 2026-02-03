export const getValidator = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        req.body = value;
        next();
    }
};

export const validateId = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    req.params.id = id;
    next();
};