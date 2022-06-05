import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/offer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  private url: string = "https://offer-crud.herokuapp";

  constructor(private http: HttpClient) { }

  getOffers(): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.url}/offer`);
  }

  updateOffer(offer: Offer){
    return this.http.put<Offer[]>(`${this.url}/offer`, offer)
  }

  deleteOffer(id: number){
    return this.http.delete<Offer[]>(`${this.url}/offer/${id}`)
  }

  addOffer(offer: Offer){
    return this.http.post<Offer[]>(`${this.url}/offer`, offer)
  }
}
