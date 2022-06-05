import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer';
import { Offer } from '../models/offer';
import { Price } from '../models/price'
import { PriceService } from '../services/price';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.sass']
})

export class OfferComponent implements OnInit {

  offers: Offer[] = [
    {id:1, name:"offer"},
  ];

  prices: Price[] = [
    {id:1, name:"price", description:"description price", price_value:20, offer_id:2},
  ];

  selectedOffer: Offer = new Offer()
  selectedPrice: Price = new Price()

  popupSwitch!: boolean;
  inputEdit!: boolean;
  error: boolean = true;

  constructor(private offerService : OfferService, private priceService:PriceService ) { }

  ngOnInit(): void {
    this.offers = JSON.parse(localStorage.getItem('offers') || '');

    if(localStorage.getItem('offers') === ''){
      console.log('if 1')
      this.offerService.getOffers().subscribe(
        {
          next: data => {
            this.offers = data;
            localStorage.setItem('offers',  JSON.stringify( this.offers ));
            this.error = false;
          },
          error: (err) => {
            console.log('errr',err.error.msg )
          }
        })
    }else if(this.error){
      localStorage.setItem('offers',  JSON.stringify( this.offers ));
    }
  }

  createOffer(){

    this.offerService.addOffer(this.selectedOffer).subscribe(
      {
        next: data => {
          this.offers.push(this.selectedOffer)
          this.error = false;
        },
        error: (err) => {
          console.log('errr',err.error.msg )
        }
      });

      if(this.error){
        this.offers.push(this.selectedOffer);
        localStorage.setItem('offers',  JSON.stringify( this.offers ));
      }
    this.selectedOffer = new Offer();
  }

  removeOffer(offer: Offer){
    if(confirm('Are you sure you want to delete it?')){
      this.offerService.deleteOffer(offer.id).subscribe()
      this.selectedOffer = offer
      this.offers = this.offers.filter(offer => offer != this.selectedOffer)
      localStorage.setItem('offers',  JSON.stringify( this.offers ));
      this.selectedOffer = new Offer();
    }
  }

  editPrice(){
    if(this.selectedPrice.id === 0 && this.prices.length > 5){
      this.priceService.updatePrice(this.selectedPrice).subscribe(data => {
        console.log('data', data)
    })
  }else if(this.selectedPrice.id === 0){
    this.offers.push(this.selectedPrice)
  }
  localStorage.setItem('prices',  JSON.stringify( this.prices ))
    this.selectedPrice = new Price();
  }

  openEditPrice(price: Price){
    this.openInputEdit();
    this.selectedPrice = price
  }

  getPricesByOffer(offer: Offer){
    this.openPopup()
    if(localStorage.getItem('prices') === null){
      this.priceService.getPricesByOfferId(offer.id).subscribe(data => {
        this.prices = data;
      })
      localStorage.setItem('prices',  JSON.stringify( this.prices ))
    }else{
      this.prices = JSON.parse(localStorage.getItem('prices') || '{}');
    }
  }

  openPopup(){
    this.popupSwitch = !this.popupSwitch
  }

  openInputEdit(){
    this.inputEdit = !this.inputEdit
  }
}


