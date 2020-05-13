import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationItem, NavigationService } from '../../shared/lib/navigation.service';
import { ContentComponent, Content, ContentType } from '../content/content.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  publishedContent:Content;
  navigationService:NavigationService;
  contentComponent:ContentComponent;
  testValue: string = "test"

  constructor(navigationService: NavigationService, private router: Router) {
    this.navigationService = navigationService;
    console.log("blog:constructor");

    // Plugins that add navigation items should do so here if possible.  Do not
    //  put navigationService.add*NavigationItem() in ngOnInit, as it will cause
    //  errors
    let newItem = new NavigationItem(7, "Blog");
    navigationService.addPrimaryNavigationItem(newItem);

    // Initialise this component so that it exists (while being blank) when the
    //  template calls for it.
    this.publishedContent = {
      contentType: ContentType.PlainText
    }

    // Prepare the ContentComponent.  Subscribe the local publishedContent
    //  object to the one provided by ContentComponent so when updates occur
    //  (e.g. when the content is loaded from the server), it automatically
    //  updates what is displayed.
    this.contentComponent = new ContentComponent();
    this.contentComponent.subscribe()
      .subscribe(Content => {
        console.log("Subscription updated");
        this.publishedContent = Content;
      });
  }

  ngOnInit() {
    this.contentComponent.publishContent("");
  }
  ngOnDestroy() {
    // Nothing to do here yet
  }
}
