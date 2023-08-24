import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

export interface AuthResponse {
  broker: string;
  clientcode: string;
  email: string;
  exchanges: string[];
  feedToken: string;
  jwtToken: string;
  lastlogintime: string;
  mobileno: string;
  name: string;
  products: string[];
  refreshToken: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService) {
    this.auth = localStorage.getItem('auth');
    this.auth = JSON.parse(this.auth);
    console.log(
      '🚀 ~ file: home.component.ts:26 ~ HomeComponent ~ constructor ~ this.auth:',
      this.auth
    );
    this.refreshToken = this.auth?.refreshToken ?? '';
  }

  auth!: any;
  refreshToken!: any;
  ngOnInit(): void {
    console.log(
      '🚀 ~ file: home.component.ts:38 ~ HomeComponent ~ ngOnInit ~ this.refreshToken:',
      this.refreshToken
    );

    this.api
      .getUserProfile({ refreshToken: this.refreshToken })
      .subscribe((res) => {
        console.log(
          '🚀 ~ file: home.component.ts:33 ~ HomeComponent ~ ngOnInit ~ res:',
          res
        );
      });
  }
}
