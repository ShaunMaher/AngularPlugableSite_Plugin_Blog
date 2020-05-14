import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared';

import { BlogComponent } from './blog.component';
import { ContentModule } from '../content/content.module';

// This pipe allows us to pass raw HTML into a page and have it trusted (bypass
//  Angular's sanitizer).  This might *NOT* actually be a good idea.
import { SafePipe } from '../../shared/lib/safe.pipe';

@NgModule({
  imports: [CommonModule, SharedModule, ContentModule],
  declarations: [BlogComponent, SafePipe],
  entryComponents: [BlogComponent]
})
export class BlogModule {
  static entry = BlogComponent;

  constructor() {
    console.log("blog.module: constructor", this);
  }
}
