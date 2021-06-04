import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property.interface';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[]  = null as any;
  galleryImages: NgxGalleryImage[] = null as any;

  public propertyId: number = 0;
  property = new Property();
  constructor(private route: ActivatedRoute, private router: Router, private HousingService: HousingService) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data) => {
        this.property = data['prp']
      }
    )

    // this.route.params.subscribe(
    //   (value) => {
    //     this.propertyId = +value['id'];
    //     this.HousingService.getProperty(this.propertyId).subscribe(
    //       data => {
    //         if(data)
    //         this.property = data as Property;
    //       },
    //       err => this.router.navigate(['/'])
    //     )
    //   }
    // )
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/image/gallery/imgprop-1.jpg',
        medium: 'assets/image/gallery/imgprop-1.jpg',
        big: 'assets/image/gallery/imgprop-1.jpg',
      },
      {
        small: 'assets/image/gallery/imgprop-2.jpg',
        medium: 'assets/image/gallery/imgprop-2.jpg',
        big: 'assets/image/gallery/imgprop-2.jpg',
      },
      {
        small: 'assets/image/gallery/imgprop-3.jpg',
        medium: 'assets/image/gallery/imgprop-3.jpg',
        big: 'assets/image/gallery/imgprop-3.jpg',
      },{
        small: 'assets/image/gallery/imgprop-4.jpg',
        medium: 'assets/image/gallery/imgprop-4.jpg',
        big: 'assets/image/gallery/imgprop-4.jpg',
      },
      {
        small: 'assets/image/gallery/imgprop-1.jpg',
        medium: 'assets/image/gallery/imgprop-1.jpg',
        big: 'assets/image/gallery/imgprop-1.jpg',
      }
    ];
  }

}
