import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm = this.fb.group({
    api_key: ['W7vuIL2g'],
    clientId: ['REUG1397'],
    pwd: ['2209'],
    token: ['3ENHXY6BSSGFFWGFOEY2GPGQPM'],
  });

  submit() {
    this.api.authenticate(this.authForm.getRawValue());
  }

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {}
}
