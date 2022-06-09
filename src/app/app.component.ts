import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ConstantValueService } from './core/services/helpers/constant-values.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  

  constructor(
      private route: ActivatedRoute,
      private titleService: Title,
      private router: Router,
      private constantValues: ConstantValueService
      ) {  }

  ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
      });
      this.getRouteTitle();
  }

  getChild(route: ActivatedRoute) {
    //Get snapshot of ActivatedRoute
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    } else {
      return route;
    }
  }
  getRouteTitle(){
    //Filter and get title from the route
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      const childRoute = this.getChild(this.route);
      childRoute.data.subscribe((data) => {
        const title = data.title
        if(title){
          //Set the return title + app title
          this.titleService.setTitle(title + ' | ' + this.constantValues.APP_NAME );
        }
        //If no title found return app title only
        else if(title === undefined || title === ''){
          this.titleService.setTitle(this.constantValues.APP_NAME );
        }
      });
    });
  }

}
