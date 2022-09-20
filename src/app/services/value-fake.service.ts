import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeValueService {

  private value = 'Fake value';

  constructor() { }

  getValue(){
    return this.value;
  }

  setValue(value: string){
   
  }

  getPromiseValue(){
    return Promise.resolve('fake promise value');
  }

}
