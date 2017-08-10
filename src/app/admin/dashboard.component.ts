import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../user.service'
import { User } from '../user'
import { Post } from '../shared/post'
import { PostService } from '../shared/post.service'
import { AuthService } from '../shared/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[]
  users: User[]
  user: any
  activeTab: string

  constructor(
      private userService: UserService,
      private postService: PostService,
      private authService: AuthService,
      private router: Router
  ) {
      this.activeTab = 'posts'
  }

  ngOnInit(): void {
    // if (!this.authService.isLoggedIn() || !this.hasAccess()) {
    //     this.router.navigateByUrl(`/`)
    // }

    this.postService.query()
      .then(posts => this.posts = posts)

    this.userService.query()
       .then(users => this.users = users)
  }

  openNewPost(): void {
    this.router.navigateByUrl('/admin/new-post')
  }

  openNewUser(): void {
    this.router.navigateByUrl('/admin/new-user')
  }

  editPost(id: string): void {
    this.router.navigateByUrl(`/admin/posts/${id}`)
  }

  openUserDetails(id: string): void {
    this.router.navigateByUrl(`/admin/users/${id}`)
  }

  hasAccess(): boolean {
    this.user = this.authService.getUser()
    if (this.user && this.user.role) {
        return this.user.role === 'admin'
    }
  }
}
