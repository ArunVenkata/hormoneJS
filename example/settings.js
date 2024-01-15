
const settings = {
    MIDDLEWARES: [
        "UserAuthMiddleware"
    ],
    SEQUELIZE_CONFIG:{
        development: {
            dialect: 'postgres'
        }
    }
};



module.exports = settings
