import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Product } from "./dto/product.model";
import { ProductDto } from "./dto/productDto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    private products: Product[] = [];
    
    constructor() {}
    
    createProduct(product: ProductDto) {
        const prodId = uuidv4();
        const { name, price, description } = product;
        const newProduct = new Product(prodId, name, price, description);
        this.products.push(newProduct);
        
        this.logger.log(`Created new product with the following details: ${JSON.stringify(newProduct)}`);
        return prodId;
    }
    
    getProducts() {
        this.logger.log('Getting all products from backend.');
        return this.products.slice();
    }
    
    deleteProduct(productId: string){
        const prodIndex = this.findProduct(productId)[1];
        this.logger.log(`Product index is: ${prodIndex}`);
        this.products.splice(prodIndex, 1);
    }
    
    updateProduct(id: string, product: ProductDto) {
        this.logger.log(`Updating product...`)
        const { name, price, description } = product;
        const [prod, index] = this.findProduct(id);
        const updatedProduct = { ... prod };
        if(name) {
            updatedProduct.name = name;
        }
        if(price) {
            updatedProduct.price = price;
        }
        if(description) {
            updatedProduct.description = description;
        }

        this.products[index] = updatedProduct;
    }

    private findProduct(prodId: string):[Product, number] {
        const productIndex = this.products.findIndex(product => product.id === prodId);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Product not found!');
        }

        return [product, productIndex];
    }

}