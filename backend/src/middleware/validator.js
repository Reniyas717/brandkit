const { AppError } = require('./errorHandler');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));

            return next(new AppError(JSON.stringify(errors), 400));
        }

        next();
    };
};

const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));

            return next(new AppError(JSON.stringify(errors), 400));
        }

        next();
    };
};

const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));

            return next(new AppError(JSON.stringify(errors), 400));
        }

        next();
    };
};

module.exports = {
    validateRequest,
    validateParams,
    validateQuery,
};
