import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public totalItem : number=0;
  public searchKey: any='';
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProduct()
      .subscribe(res=>{
        this.totalItem=res.length;
      })
  }

  search(event: any) {
    this.searchKey=(event.target as HTMLInputElement).value;
    console.log(this.searchKey);
    this.cartService.search.next(this.searchKey);
  }
}
