import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared';

import { BlogComponent } from './blog.component';
import { ContentModule } from '../content/content.module';

@NgModule({
  imports: [CommonModule, SharedModule, ContentModule],
  declarations: [BlogComponent],
  entryComponents: [BlogComponent]
})
export class BlogModule {
  static entry = BlogComponent;

  constructor() {
    console.log("blog.module: constructor", this);
  }
}
