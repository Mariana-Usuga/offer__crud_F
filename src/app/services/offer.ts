import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/offer';
import { Observable } from 'rxjs';
import { Price } from '../models/price'

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  private url: string = "https://offer-crud.herokuapp.com/api";
  // private url: string = "https://marktpul-bk.herokuapp.com"
    // private url: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Offer[]>{
    console.log('entra en getpokemon')
    console.log('resul en get po', this.http.get<Offer[]>(`${this.url}/offer`))
    return this.http.get<Offer[]>(`${this.url}/offer`);
  }

  addOrEdit(offer: Offer){
    return this.http.post<Offer[]>(`${this.url}/offer`, offer)
  }

  updateOffer(offer: Offer){
    return this.http.put<Offer[]>(`${this.url}/offer`, offer)
  }

  deleteOffer(id: number){
    return this.http.delete<Offer[]>(`${this.url}/offer/${id}`)
  }

  getPricesByOfferId(id: number): Observable<Price[]>{
    console.log('entra en getpokemon')
    return this.http.get<Price[]>(`${this.url}/price/report/${id}`)
  }

  updatePrice(price: Price){
    return this.http.put<Offer[]>(`${this.url}/price`, price)
  }
}
