import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { User } from '../../user'
import { Post } from '../../shared/post'
import { AuthService } from '../../shared/auth.service'
import { PostService } from '../../shared/post.service'
import { MapService } from '../map.service'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  loading: boolean
  user: User
  posts: Post[]
  limit: number

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private mapService: MapService
  ) {
    this.limit = 10
  }

  ngOnInit() {
    this.loading = true
    this.user = this.authService.getUser()
    this.postService.query()
      .then(posts => {
        this.posts = posts.filter(o => {
          return o.published || !o.published && this.user.role === 'admin'
        })
        this.loading = false

        // load overview layer in map
        // TODO: wait until map initialise is ready
        this.mapService.showOverview()

      }).catch(() => this.loading = false)



      // workaround for not being able to put (click) functions into innerHml
      // Listen to click events in the component
      // this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      //     if (event.target.attributes.class && event.target.attributes.class.value.indexOf('reference') > -1) {
      //         const id = event.target.attributes.class.value.split(' ')[1]
      //         this.onRefClick(id)
      //     }
      // })
  }

  hasMore(): boolean {
    return !!(this.posts && this.posts.length > this.limit)
  }

  raiseLimit(): void {
      this.limit = this.limit + 10
  }

  showPost(postID: string): void {
    this.router.navigate(['/posts/' + postID])

    //post.viewCount++
    //this.postService.update(post)
    //markesread
  }

  // markPostAsRead(username: string, post: Post): void {
  //   this.userService.query().then(users => {
  //       let userObj = users.find(x => x.username === username)
  //       if (!userObj) {
  //           console.log('user not found or multiple entries found!')
  //           return
  //       }
  //       let finds = userObj.readPosts.find(x => x === post._id)
  //       if (!finds) {
  //           userObj.readPosts.push(post._id)
  //           this.userService.update(userObj)
  //       }
  //   })
  // }

}
