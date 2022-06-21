import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string;
  cartData: CartModelServer;

  constructor(
    private localAuth: LocalAuthService,
    private cartService: CartService,
  ) {
    const user = this.localAuth.userObj;
    if (user && user.auth_token) {
      this.userName = user.first_name;
      this.isLoggedIn = true;
    } else {
      this.userName = null;
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data =>{
      this.cartData = data;
    })
  }

  logout() {
    this.localAuth.logout()
  }
}
