import {promises as fs} from "fs"

class ProductManager {
    constructor (){
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++;

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return await console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (respuesta3.find(product => product.id === id )){
            console.log("Producto no encontrado");
        } else {
            console.log(respuesta3.find(product => product.id ===id));
        }
    };

    delateProductById = async (id) =>  {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async ({id, ...producto}) => {
        await this.delateProductById(id);
        let produtOld = await this.readProducts()
        console.log(produtOld);
        let productsModif = [{...producto, id}, ...produtOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    };
}

const productos = new ProductManager ();

productos.updateProducts ({
    title: 'Titulo',
    description: 'Description3',
    price: 4500,
    imagen: 'Imagen3',
    code: 'abc125',
    stock: 15,
    id: 3
})