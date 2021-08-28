const fs = require('fs');
const path = require('path');

module.exports = {
    productsData: JSON.parse(fs.readFileSync(path.join(__dirname, '/productList.json'), "utf-8")),
    categoriesData: JSON.parse(fs.readFileSync(path.join(__dirname, '/categories.json'), "utf-8")),
    subCategoriesData: JSON.parse(fs.readFileSync(path.join(__dirname, '/subcategories.json'), "utf-8")),
    usersData: JSON.parse(fs.readFileSync(path.join(__dirname, '/users.json'), "utf-8")),
    writeProductEdit : (dataBaseToEdit) => {
        fs.writeFileSync(`./src/data/productList.json`, JSON.stringify(dataBaseToEdit), "utf-8");
    }
}