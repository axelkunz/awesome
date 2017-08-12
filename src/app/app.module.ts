import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { NgModule, enableProdMode } from '@angular/core'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { BlogComponent } from './blog/blog.component'
import { CommentDatePipe } from './blog/post/comments/comment-date.pipe'
import { CommentsComponent } from './blog/post/comments/comments.component'
import { DashboardComponent } from './admin/dashboard.component'
import { EditPostComponent } from './admin/edit-post/edit-post.component'
import { LimitToPipe } from './shared/limit-to.pipe'
import { LoginComponent } from './login/login.component'
import { NavbarComponent } from './blog/navbar/navbar.component'
import { NewFeatureComponent } from './admin/edit-post/new-feature/new-feature.component'
import { NewPostComponent } from './admin/new-post/new-post.component'
import { NewUserComponent } from './admin/new-user/new-user.component'
import { OrderByPipe } from './shared/order-by.pipe'
import { OverviewComponent } from './blog/overview/overview.component'
import { PanelComponent } from './blog/panel/panel.component'
import { PostComponent } from './blog/post/post.component'
import { ReferenceComponent } from './shared/reference/reference.component'
import { UserDetailsComponent } from './admin/user-details/user-details.component'
import { UsersComponent } from './admin/users/users.component'
import { ValidPostPipe } from './valid-post.pipe'

import { AuthService } from './shared/auth.service'
import { ConfigService } from './shared/config.service'
import { FeatureService } from './shared/feature.service'
import { GuardService } from './shared/guard.service'
import { IconService } from './blog/icon.service'
import { ImageService } from './image.service'
import { LayerService } from './blog/layer.service'
import { MapService } from './blog/map.service'
import { PictureService } from './shared/picture.service'
import { PostService } from './shared/post.service'
import { UserService } from './user.service'

// enableProdMode()
const routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'posts',
    component: BlogComponent,
    canActivate: [GuardService],
    children: [
      { path: '', component: OverviewComponent },
      { path: ':id', component: PostComponent }
    ]
  }, {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  }, {
    path: 'admin',
    canActivate: [GuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new-user', component: NewUserComponent },
      { path: 'new-post', component: NewPostComponent },
      { path: 'posts/:id', component: EditPostComponent },
      { path: 'posts/:id/new-feature', component: NewFeatureComponent },
      { path: 'users', component: UsersComponent, outlet: 'admin' },
      { path: 'users/:id', component: UserDetailsComponent }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    CommentDatePipe,
    CommentsComponent,
    DashboardComponent,
    EditPostComponent,
    LimitToPipe,
    LoginComponent,
    NavbarComponent,
    NewFeatureComponent,
    NewPostComponent,
    NewUserComponent,
    OrderByPipe,
    OverviewComponent,
    PanelComponent,
    PostComponent,
    ReferenceComponent,
    UserDetailsComponent,
    UsersComponent,
    ValidPostPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    ConfigService,
    FeatureService,
    GuardService,
    IconService,
    ImageService,
    LayerService,
    MapService,
    PictureService,
    PostService,
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
