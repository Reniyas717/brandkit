const responseFormatter = {
    success: (data, message = 'Success', meta = {}) => {
        return {
            status: 'success',
            message,
            data,
            ...meta,
        };
    },

    error: (message, errors = null) => {
        const response = {
            status: 'error',
            message,
        };

        if (errors) {
            response.errors = errors;
        }

        return response;
    },

    paginate: (data, page, limit, total) => {
        return {
            status: 'success',
            data,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit),
            },
        };
    },
};

module.exports = responseFormatter;
