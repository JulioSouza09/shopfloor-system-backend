import Joi from 'joi'

const schema = Joi.object({
    product: Joi.string().min(1).required(),
    quantity: Joi.number().min(1).required(),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').required(),
});

export default schema;