import { Calculator } from './calculator';

describe('test for calculator', () =>{
    describe('test for multiply', () => {

        it('should return a nine', () =>{
            //ARRANGE
            const calculator = new Calculator();
            //ACT
            const rta = calculator.multiply(3,3);
            //ASSERT
            expect(rta).toEqual(9);
        });
    
        it('should return a four', () =>{
            //ARRANGE
            const calculator = new Calculator();
            //ACT
            const rta = calculator.multiply(1,4);
            //ASSERT
            expect(rta).toEqual(4);
        });

    });
    
    describe('test for devide', ()=>{
        it('#divide for a zero', () =>{
            //ARRANGE
            const calculator = new Calculator();
            //ACT
           expect(calculator.devide(6,0)).toBeNull();
           expect(calculator.devide(5,0)).toBeNull();
           expect(calculator.devide(5525245555,0)).toBeNull(); 
        });
    
        it('#divide', () =>{
           //ARRANGE
           const calculator = new Calculator();
           //ACT
           expect(calculator.devide(6,2)).toEqual(3);  
    
           //Matchers
            const name = 'ivan';
            let name2;
            
            expect(name).toBeDefined();
            expect(name2).toBeUndefined();
    
            expect(1 + 3 === 3).toBeFalsy(); //4
            expect(1 + 3 === 3).toBeFalsy();
    
            expect(5).toBeLessThan(10);
            expect(20).toBeGreaterThan(10);
            expect()
    
            expect(['apples', 'oranges', 'pears']).toContain('oranges');
        });
    });
    
});