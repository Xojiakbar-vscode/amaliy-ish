require('dotenv').config();
const { sequelize, SparePart } = require('./src/models');

const seedParts = [
    {
        name: 'Cooling Fan',
        part_number: 'CF-100',
        category: 'Cooling System',
        quantity: 10,
        price: 150000,
        minimum_stock: 3
    },
    {
        name: 'Thermal Paste',
        part_number: 'TP-001',
        category: 'Cooling System',
        quantity: 50,
        price: 35000,
        minimum_stock: 10
    },
    {
        name: 'Battery',
        part_number: 'BAT-HP-16',
        category: 'Power',
        quantity: 5,
        price: 450000,
        minimum_stock: 2
    },
    {
        name: 'Display Panel',
        part_number: 'DIS-156-FHD',
        category: 'Display',
        quantity: 3,
        price: 1200000,
        minimum_stock: 1
    },
    {
        name: 'Keyboard',
        part_number: 'KBD-US-01',
        category: 'Input',
        quantity: 8,
        price: 250000,
        minimum_stock: 2
    },
    {
        name: 'SSD 512GB',
        part_number: 'SSD-M2-512',
        category: 'Storage',
        quantity: 15,
        price: 400000,
        minimum_stock: 5
    },
    {
        name: 'RAM 8GB',
        part_number: 'RAM-DDR4-8',
        category: 'Memory',
        quantity: 12,
        price: 300000,
        minimum_stock: 4
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Ulanish muvaffaqiyatli.');
        
        // Jadvallarni sinxronlash (mavjudlarini buzmasdan)
        await sequelize.sync();

        for (const part of seedParts) {
            const [createdPart, created] = await SparePart.findOrCreate({
                where: { part_number: part.part_number },
                defaults: part
            });

            if (created) {
                console.log(`${part.name} bazaga qo'shildi.`);
            } else {
                console.log(`${part.name} allaqachon mavjud.`);
            }
        }

        console.log('Seed yakunlandi.');
        process.exit(0);
    } catch (error) {
        console.error('Seed davomida xatolik yuz berdi:', error);
        process.exit(1);
    }
};

seedDatabase();
