import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, ToastController } from 'ionic-angular';
// import { ProductDetails } from '../product-details/product-details';
import { RestProvider } from '../../providers/rest/rest';

// import { SearchPage } from "../search/search";

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  searchQuery: string = "";

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private rest: RestProvider) {

    this.page = 2;

    

    this.loadMoreProducts(null);

    this.rest.getproducts().subscribe(
      resp => {
        
        this.products = JSON.parse(resp['_body']).data;
        console.log(this.products);
      },
      error => {
       
        var body =JSON.parse(error['_body']);
        this.toastCtrl.create({
          message: body.message,
          showCloseButton: true
        }).present();
      }

    );

  }

  // ionViewDidLoad(){
  //   setInterval(()=> {

  //     if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
  //       this.productSlides.slideTo(0);

  //     this.productSlides.slideNext();
  //   }, 3000)
  // }

  loadMoreProducts(event){
    console.log(event);
    if(event == null)
    {
      this.page = 2;
      this.moreProducts = [];
    }
    else
      this.page++;
  }

  openProductPage(product){
    this.navCtrl.push('ProductDetails', {"product": product} );
  }

  onSearch(event){
    if(this.searchQuery.length > 0){
      this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
    }
  }

}
