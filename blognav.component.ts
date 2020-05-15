import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationItem, NavigationService } from '../../shared/lib/navigation.service';
import { BlogComponent } from './blog.component';

import { SafePipe } from '../../shared/lib/safe.pipe';

@Component({
  selector: 'app-blognav',
  template: ''
})
export class BlogNavComponent implements OnInit {
  navigationService:NavigationService;

  constructor(navigationService: NavigationService, private route: ActivatedRoute, private router: Router) {
    this.navigationService = navigationService;
    console.log("blognav:constructor", router);

    let currentRoutes = router.config;
    currentRoutes.push({
      path: "blog",
      component: BlogComponent
    });
    router.resetConfig(currentRoutes);
    console.log("blognav:constructor", router);

    // Plugins that add navigation items should do so here if possible.  Do not
    //  put navigationService.add*NavigationItem() in ngOnInit, as it will cause
    //  errors
    let newNavItem: NavigationItem = {
      label: "Blog",
      routerLink: "/blog"
    };
    navigationService.addPrimaryNavigationItem(newNavItem);
  }

  ngOnInit() {

  }
}
