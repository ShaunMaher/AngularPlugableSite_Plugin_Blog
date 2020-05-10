import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationItem, NavigationService } from '../../shared/lib/navigation.service';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  publishedContent:Observable<string>;
  navigationService:NavigationService;

  constructor(navigationService: NavigationService, private router: Router) {
    this.navigationService = navigationService;

    // Plugins at add navigation items should do so here if possible.  Do not
    //  put navigationService.add*NavigationItem() in ngOnInit, as it will cause
    //  errors
    let newItem = new NavigationItem(7, "Blog");
    navigationService.addPrimaryNavigationItem(newItem);
  }

  ngOnInit() {
    // Nothing to do here yet
  }
  ngOnDestroy() {
    // Nothing to do here yet
  }
}
