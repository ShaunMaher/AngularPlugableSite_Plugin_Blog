import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared';

import { BlogComponent } from './blog.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BlogComponent],
  entryComponents: [BlogComponent]
})
export class BlogModule {
  static entry = BlogComponent;

  constructor() {
    console.log("blog.module: constructor", this);
  }
}
