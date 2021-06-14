import { Controller, Get, Post, Delete, Put, Body, Logger, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/productDto";

@Controller('product')
export class ProductController {
    private readonly logger = new Logger(ProductController.name);
    constructor(private readonly prodService: ProductService) {}

    @Get()
    public async getProducts(){
        this.logger.log(`Get all products`)
        return this.prodService.getProducts()
    }

    @Post()
    public async createProduct(
        @Body() product: ProductDto ){
        this.logger.log(`Creating new product ${JSON.stringify(product)}`)
        return this.prodService.createProduct(product);
    }
    
    @Delete('/:id')
    public async deleteProduct(
        @Param('id') id: string) {
        this.logger.log(`Deleting product: ${id}`)
        this.prodService.deleteProduct(id);
    }
    
    @Put('/:id')
    public async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDto){
        this.logger.log(`Updating product with id: ${id} with new values: ${JSON.stringify(product)}`)
        return this.prodService.updateProduct(id, product);
    }
}