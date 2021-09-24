import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productList: any=[];
  searchKey: string = '';
  public filterCategory: any=[];
  qty: number=1;

  constructor(private api: ApiService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.calcTotal();
      })

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.qty=1;
  }

  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || a.category == '') {
          return a;
        }
      })
  }

  allItems():any{
   this.ngOnInit();
  }

  keyUp() {
    this.calcTotal();
  }

  change() {
    this.calcTotal()
  }

  calcTotal(){
    this.productList.forEach((a: any) => {
      if (a.category === 'men\'s clothing' || a.category === 'women\'s clothing') {
        a.category = 'fashion';
      }
      Object.assign(a, {quantity: this.qty, total: a.price*this.qty});
    })
  }
}
