import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { InsideInfoService } from 'src/app/services/inside/inside-info.service';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  data = '';

  constructor(private authService: AuthService, 
              private insideInfo: InsideInfoService,
              private storage: Storage, private toastController: ToastController) { }

  ngOnInit() {
  }

  loadSpecialInfo(){
    this.insideInfo.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
  }

  logout(){
    this.authService.logout();
  }

  clearToken(){
    //Only for testing
    console.log(this.storage.get('access_token'));
    this.storage.remove('access_token');

    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }





}
