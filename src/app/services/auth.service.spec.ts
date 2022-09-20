import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { AuthService } from './auth.service';
import { TokenService } from './token-service';


describe('AuthService', () => {
    let authService: AuthService;
    let httpControler: HttpTestingController;
    let tokenService: TokenService;

    beforeEach( () =>{
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers : [
                AuthService,
                TokenService
            ]
        });
        authService = TestBed.inject(AuthService);
        httpControler = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    });

    afterEach(()=> {
        httpControler.verify();
    });

    it('should be create', () => {
        expect(authService).toBeTruthy();
    });

    describe('test for login', ()=>{
        it('should return a token', () => {
            const mockData: Auth = {
                access_token: '121212'
            };
            const email = 'ivan@gmail.com';
            const password = '123456';

            authService.login(email,password).subscribe((data)=> {
                expect(data).toEqual(mockData);
            });
            //http config
            const url = `${environment.API_URL}/api/v1/auth/login`;
            const req = httpControler.expectOne(url);
            req.flush(mockData);
        });

        it('should call to saveToken', () => {
            const mockData: Auth = {
                access_token: '121212'
            };
            const email = 'ivan@gmail.com';
            const password = '123456';
            spyOn(tokenService, 'saveToken').and.callThrough();

            authService.login(email,password).subscribe((data)=> {
                expect(data).toEqual(mockData);
                expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
                expect(tokenService.saveToken).toHaveBeenCalledOnceWith('121212');
            });
            //http config
            const url = `${environment.API_URL}/api/v1/auth/login`;
            const req = httpControler.expectOne(url);
            expect(req.request.method).toEqual('POST');
            req.flush(mockData);
        });
    })
});
