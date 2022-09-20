import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token-interceptor';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { ProductsService } from './products.service';
import { TokenService } from './token-service';


describe('ProductsService', () =>{

    let productsService : ProductsService;
    let httpControler: HttpTestingController;
    let tokenService: TokenService;
    
    beforeEach( () =>{
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers : [
                ProductsService,
                TokenService,
                { 
                 provide : HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true 
                }
            ]
        });
        productsService = TestBed.inject(ProductsService);
        httpControler = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    });

    afterEach(()=> {
        httpControler.verify();
    });

    it('should be create', () => {
        expect(productsService).toBeTruthy();
    });

    describe('test for getAllSimple', () => {
        it('should return a product list', ()=>{
            //Arrange
            const mockData: Product[] = generateManyProducts(4);
            spyOn(tokenService, 'getToken').and.returnValue('123')
            //Act
            productsService.getAllSimple()
             .subscribe((data)=>{
                //Assert
                 expect(data.length).toEqual(mockData.length);
                 expect(data).toEqual(mockData);
                 expect(data).toBeUndefined();
             });

             //http config
             const url = `${environment.API_URL}/api/v1/products`;
             const req = httpControler.expectOne(url);
             const headers = req.request.headers;
             expect(headers.get('Authorization')).toEqual(`Bearer 123`);
             req.flush(mockData);
           
        })
    });

    describe('test for getAll', () => {
        it('should return a product list', ()=>{
            //Arrange
            const mockData: Product[] = generateManyProducts(3);
            //Act
            productsService.getAll()
             .subscribe((data)=>{
                //Assert
                 expect(data.length).toEqual(mockData.length);
             });

             //http config
             const url = `${environment.API_URL}/api/v1/products`;
             const req = httpControler.expectOne(url);
             req.flush(mockData);
           
        });
        it('should return product list with taxes', ()=>{
            //Arrange
            const mockData: Product[] = [
                {... generateOneProduct(),
                    price: 100, // 100* .19 = 19
                },
                {... generateOneProduct(),
                    price: 200, // 200* .19 = 38
                },
                {... generateOneProduct(),
                    price: 0, // 0* .19 = 0
                },
                {... generateOneProduct(),
                    price: -100, // = 0
                }
            ];
            //Act
            productsService.getAll()
             .subscribe((data)=>{
                //Assert
                 expect(data.length).toEqual(mockData.length);
                 expect(data[0].taxes).toEqual(19);
                 expect(data[1].taxes).toEqual(38);
             });

             //http config
             const url = `${environment.API_URL}/api/v1/products`;
             const req = httpControler.expectOne(url);
             req.flush(mockData);
        });
    });

    describe('test for create', () => {

        it('should return a new product', ()=>{
            const mockData = generateOneProduct();
            const dto: CreateProductDTO = {
                title: 'new product',
                price: 100,
                images: ['img'],
                description: 'bla bla bla',
                categoryId: 12
            }
            productsService.create({...dto}).subscribe(data => {
                expect(data).toEqual(mockData);
            });

            //http config
            const url = `${environment.API_URL}/api/v1/products`;
            const req = httpControler.expectOne(url);
            req.flush(mockData);
            expect(req.request.body).toEqual(dto);
            expect(req.request.method).toEqual('POST');
        });
    });

    describe('test for update', () => {

        it('should return a update list', ()=>{
            const mockData = generateOneProduct();
            const dto: UpdateProductDTO = {
                title: 'new product 1541222'
            }
            const id: string = faker.datatype.uuid();
            productsService.update(id,{... dto}).subscribe(data => {
                expect(data).toEqual(mockData);
            });

            //http config
            const url = `${environment.API_URL}/api/v1/products/${id}`;
            const req = httpControler.expectOne(url);
            req.flush(mockData);
            expect(req.request.body).toEqual(dto);
            expect(req.request.method).toEqual('PUT');
        });

        
    });

    describe('test for delete product', () => {
        it('should return a boolean when delete product', (doneFn)=>{
            const deleteProduct = true;
            const id: string = faker.datatype.uuid();
            productsService.delete(id).subscribe(data => {
                expect(data).toEqual(deleteProduct);
                expect(data).toBeTruthy();
                doneFn();
            });

            //http config
            const url = `${environment.API_URL}/api/v1/products/${id}`;
            const req = httpControler.expectOne(url);
            req.flush(deleteProduct);
            expect(req.request.method).toEqual('DELETE');
        });
    });

    describe('test for getOne', () => {

        it('should return a product', ()=>{
            const mockData = generateOneProduct();
            const id: string = faker.datatype.uuid();
            productsService.getOne(id).subscribe(data => {
                expect(data).toEqual(mockData);
            });

            //http config
            const url = `${environment.API_URL}/api/v1/products/${id}`;
            const req = httpControler.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(mockData);
            
        });

        it('should return the right msg when status code is 404', ()=>{

            const id: string = "1";
            const msgError = '404 message';
            const mockError = {
                status: HttpStatusCode.NotFound,
                statusText: msgError
            }
            productsService.getOne(id).subscribe({
                error: (error) =>{
                    expect(error).toEqual('El producto no existe');
                }
            });

            //http config
            const url = `${environment.API_URL}/api/v1/products/${id}`;
            const req = httpControler.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(msgError, mockError);
            
        });

        
    });

});

