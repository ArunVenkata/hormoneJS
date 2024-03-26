
const settings = {
    MIDDLEWARES: [
        "UserAuthMiddleware"
    ],
    SEQUELIZE_CONFIG:{
        development: {
            dialect: 'postgres'
        }
    },
    APPS: [
    ]
};


module.exports = settings
