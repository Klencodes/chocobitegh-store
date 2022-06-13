import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  catTitle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Categories', link: '/categories' }, { label: 'Categories Details', active: true }];
    this.route.params.subscribe((params: Params) => {
      this.catTitle = params['catName'];
      if (params['id']) {
        this.fetchCategoryProducts(params['id'])
      }
    })
  }
  fetchCategoryProducts(cat) {
    console.log(cat, 'GOT ID')
  }

  /**
 * View product details
 * @param product 
 */
  productDetails(product) {
    this.router.navigate(['/product-details', 'New Orange Flavor', 555454])
    // this.router.navigate(['/product-details', product.name, product.id])
  }
}
