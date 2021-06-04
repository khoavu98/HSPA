import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase.interface';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from './IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  properties: Array<IPropertyBase> = [] ;
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection: string = 'asc';
  constructor( private Housing : HousingService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
      this.sellRent = 2;
    this.Housing.getAllProperties().subscribe(
      data => {
        this.properties = data;
      },
      err => {
        console.log(err);
      });
  }

  onCityFilter(){
    this.SearchCity = this.City;
  }

  onCityFilterClear(){
    this.SearchCity = '';
    this.City = '';
  }

  onSortDiretion(){
    if(this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    }
    else{
      this.SortDirection = 'desc';
    }
  }
}
