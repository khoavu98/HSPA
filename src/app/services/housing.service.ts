import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { IProperty } from '../property/property-list/IProperty.interface';
import { IPropertyBase } from '../model/ipropertybase.interface';
import { Property } from '../model/property.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getProperty(id: number): Observable<Property> {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === +id) as Property;
      })
    )
  }

  getAllProperties(SellRent?: number) : Observable<Property[]>{
    return this.http.get<Property[]>('data/properties.json').pipe(
      map(data => {
        let localPropertiesArray = [];
        let PropertiesArray = [];
        let localPropertiesArr = [];
        const jsonData = JSON.stringify(data);
        let propertiesArray: Array<Property> = JSON.parse(jsonData);
        if(SellRent)
          propertiesArray = propertiesArray.filter(x => x.SellRent == SellRent);

        localPropertiesArray = JSON.parse(localStorage.getItem('newProp') || '{}');
        if(localPropertiesArray){
          if(SellRent)
            localPropertiesArr = localPropertiesArray.filter((x: { SellRent: number; }) => x.SellRent == SellRent);
          localPropertiesArr.forEach((element: any) => {
            propertiesArray.push(element);
          });
        }
        return propertiesArray;
      })
    );
  }
  addProperty(property: Property){
    let newP = [];
    if(localStorage.getItem('newProp')){
      newP = JSON.parse(localStorage.getItem('newProp') || '{}');
      // newP.forEach(element => {
      //   newProp.push(element);
      // });
    }
    newP.push(property);
    localStorage.setItem('newProp', JSON.stringify(newP))
  }

  newPropID() : number{
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID', String(parseInt(localStorage.getItem('PID') || '0') + 1));
      return + (localStorage.getItem('PID')||'0')
    }else{
      localStorage.setItem('PID', '101');
      return 101
    }
  }
}
