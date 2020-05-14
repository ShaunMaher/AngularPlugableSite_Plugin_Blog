import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavigationItem, NavigationService } from '../../shared/lib/navigation.service';
import { ContentComponent, Content, ContentType } from '../content/content.component';

import { SafePipe } from '../../shared/lib/safe.pipe';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ SafePipe ],
})
export class BlogComponent implements OnInit {
  //TODO: We need this to be configurable
  metadataUrl: "https://shaunmaher.github.io/AngularPlugableSite/data/blog/metadata.json"

  publishedContent:Content;
  navigationService:NavigationService;
  contentComponent:ContentComponent;
  testValue: string = "test"
  private blogMetadata = mockBlogMetadata;

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

    // This should be fetched from a http location
    console.log(this.blogMetadata);

    // Prepare the ContentComponent.  Subscribe the local publishedContent
    //  object to the one provided by ContentComponent so when updates occur
    //  (e.g. when the content is loaded from the server), it automatically
    //  updates what is displayed.
    //this.contentComponent = new ContentComponent();
    //this.contentComponent.subscribe()
    //  .subscribe(Content => {
    //    console.log("Subscription updated");
    //    this.publishedContent = Content;
    //  });
  }

  ngOnInit() {
    //this.contentComponent.publishContent("");

    for (const blogContent in this.blogMetadata) {
      this.blogMetadata[blogContent].contentComponent = new ContentComponent();
      this.blogMetadata[blogContent].contentComponent.subscribe()
        .subscribe(Content => {
          console.log("Subscription Updated", blogContent, this);
          this.blogMetadata[blogContent].content = Content.content;
        });
      this.blogMetadata[blogContent].contentComponent.publishContent("");
    }
  }
  ngOnDestroy() {
    // Nothing to do here yet
  }

  keys(): string[] {
    console.log(Object.keys(this.blogMetadata).sort(this.dynamicSort(this.blogMetadata, 'publicationDate')));
    return Object.keys(this.blogMetadata).sort(this.dynamicSort(this.blogMetadata, 'publicationDate'));
  }

  dynamicSort(HashTable, property) {
    return function (a, b) {
        //console.log('a', a, 'b', b, 'this', this);
        let result = (HashTable[a][property] > HashTable[b][property]) ? -1 : (HashTable[a][property] < HashTable[b][property]) ? 1 : 0;
        return result;
    }
  }
}

export interface BlogContent extends Content {
  title?: string;
  publicationDate?: number;
  permaLink?: string;
  contentComponent?: ContentComponent;
}

export interface HashTable<T> {
    [key: string]: T;
}

export const mockBlogMetadata: HashTable<BlogContent> = {
  'b27055f0-95b5-11ea-9735-b3fca9669169': {
    contentType: ContentType.Markdown,
    title: 'Test Blog Entry',
    source: 'https://shaunmaher.github.io/AngularPlugableSite/data/blog/b27055f0-95b5-11ea-9735-b3fca9669169.md',
    publicationDate: 1589441962,
    permaLink: 'http://example.com'
  },
  'b27055f0-95b5-11ea-9735-b3fca9669170': {
    contentType: ContentType.Markdown,
    title: 'Newer Blog Entry',
    source: 'https://shaunmaher.github.io/AngularPlugableSite/data/blog/b27055f0-95b5-11ea-9735-b3fca9669170.md',
    publicationDate: 1589441970,
    permaLink: 'http://example.com'
  }
}
