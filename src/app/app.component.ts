import { Component } from '@angular/core';
import { Calculator } from './calculator'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-testing-services';

  ngOnInit(){
    const calculator =  new Calculator();
    const rta = calculator.multiply(3,3);
    const rta2 = calculator.devide(3,0);
    console.log("----->" , rta === 9);
    console.log("----->" , rta2 === null);
  }
}
