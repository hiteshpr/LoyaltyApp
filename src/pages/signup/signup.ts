import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

@IonicPage({})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {


  newUser: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, private rest: RestProvider) {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup(){

    if(this.newUser.password == this.newUser.confirm_password){

      let customerData = {
        customer : {}
      }

      customerData.customer = {
        "email": this.newUser.email,
        "name": this.newUser.first_name + this.newUser.last_name,
        "password": this.newUser.password,
      }

        this.rest.signup(customerData.customer).subscribe(
          resp => {
            this.alertCtrl.create({
              title: "Account Created",
              message: "Your account has been created successfully! Please login to proceed.",
              buttons: [{
                text: "Login",
              }]
            }).present();
          },
          error => {
           
            var body =JSON.parse(error['_body']);
            this.toastCtrl.create({
              message: body.message,
              showCloseButton: true
            }).present();
          }
        );

    } else {
      this.toastCtrl.create({
        message: 'Passwords do not match',
        showCloseButton: true
      }).present();


}
  }
}