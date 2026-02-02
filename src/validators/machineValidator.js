import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('RUNNING', 'STOPPED', 'MAINTENANCE').required()
});

export const machineStatusSchema = Joi.object({
    status: Joi.string().valid('RUNNING', 'STOPPED', 'MAINTENANCE').required()
})

export default schema;