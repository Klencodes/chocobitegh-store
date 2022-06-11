import { Component, OnInit } from '@angular/core';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private localAuth: LocalAuthService,
  ) { 
    const user = this.localAuth.userObj;
    if(user && user.auth_token){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
  }

  logout(){
    
  }
}
