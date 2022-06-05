import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/offer';
import { Observable } from 'rxjs';
import { Price } from '../models/price'

@Injectable({
  providedIn: 'root'
})

export class PriceService {

  private url: string = "https://offer-crud.herokuapp.com/api";

  constructor(private http: HttpClient) { }

  getPricesByOfferId(id: number): Observable<Price[]>{
    console.log('entra en getpokemon')
    return this.http.get<Price[]>(`${this.url}/price/report/${id}`)
  }

  updatePrice(price: Price){
    return this.http.put<Offer[]>(`${this.url}/price`, price)
  }
}
