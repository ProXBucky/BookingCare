'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_info', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            priceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            addressClinic: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            nameClinic: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            note: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            count: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_info');
    }
};