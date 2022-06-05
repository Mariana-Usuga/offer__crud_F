import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer';
import { Offer } from '../models/offer';
import { Price } from '../models/price'


// localStorage.setItem("offers", JSON.stringify( saveOffers() ))
const offersLocal = localStorage.getItem('offers')

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.sass']
})

export class OfferComponent implements OnInit {

  offers: Offer[] = [
    {id:1, name:"offer"},
    {id:2, name:"offer2"}
  ];

  prices: Price[] = [
    {id:1, name:"offer", description:"description offer", price_value:20, offer_id:2},
    {id:2, name:"offer", description:"description offer2", price_value:20, offer_id:2}
  ];

  selectedOffer: Offer = new Offer()
  selectedPrice: Price = new Price()

  popupSwitch!: boolean;

  constructor(private offerService : OfferService ) { }

  // localStorage.setItem("offersLocal", JSON.stringify( this.offers ))

  ngOnInit(): void {
    if(localStorage.getItem('offers') === null){
      this.offerService.getPokemon().subscribe(data => {
        console.log('entra ngInt')
        console.log('DATA', data)
        this.offers = data;
        localStorage.setItem('offers',  JSON.stringify( this.offers ))
      })
    }else{
      this.offers = JSON.parse(localStorage.getItem('offers') || '{}');
    }
  }
  saveOffers(){
    return this.offers;
  }

  createOEdit(){
    if(this.selectedOffer.id === 0 && this.offers.length > 3){
      this.offerService.addOrEdit(this.selectedOffer).subscribe(data => {
        console.log('data', data)
        this.offers.push(this.selectedOffer)
    })
  }else if(this.selectedOffer.id === 0){
    this.offers.push(this.selectedOffer)
  }

    this.selectedOffer = new Offer();
  }

  createOrEditPrice(){
    if(this.selectedPrice.id === 0 && this.prices.length > 3){
      this.offerService.addOrEdit(this.selectedOffer).subscribe(data => {
        console.log('data', data)
        // this.offers.push(this.selectedOffer)
    })
  }else if(this.selectedPrice.id === 0){
    console.log('entra')
    this.offers.push(this.selectedPrice)
  }

    this.selectedPrice = new Price();
  }

  openEditOffer(offer: Offer){
    // this.offerService.updateOffer(this.selectedOffer).subscribe(data => {
    //   console.log('data', data)
    // })
    this.selectedOffer = offer
  }

  openEditPrice(price: Price){
    this.selectedPrice = price
  }

  delete(offer: Offer){
    if(confirm('Are you sure you want to delete it?')){
      // this.offerService.deleteOffer(id).subscribe(data => {
      //   console.log('data', data)
      // })
      this.selectedOffer = offer
      this.offers = this.offers.filter(offer => offer != this.selectedOffer)
      this.selectedOffer = new Offer();
    }
  }

  getPricesByOffer(offer: Offer){
    this.offerService.getPricesByOfferId(offer.id).subscribe(data => {
      console.log('DATA PRICES', data)
      this.prices = data;
    })
    this.openPopup()
  }

  openPopup(){
    this.popupSwitch = !this.popupSwitch
  }
}


