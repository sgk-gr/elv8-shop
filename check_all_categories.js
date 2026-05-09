const { getCategories } = require('./src/lib/woocommerce');

async function checkCategories() {
    try {
        const categories = await getCategories({ per_page: '100' });
        console.log(JSON.stringify(categories, null, 2));
    } catch (error) {
        console.error(error);
    }
}

checkCategories();
