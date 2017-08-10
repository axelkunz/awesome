import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'

import { Post } from '../../shared/post'
import { Comment } from './comments/comment'
import { PostService } from '../../shared/post.service'
import { AuthService } from '../../shared/auth.service'
import { ConfigService } from '../../shared/config.service'
import { MapService } from '../map.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  isMobile: boolean
  post: Post
  postID: string
  unsafeHtml: any
  hasLiked: boolean
  sub: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer,
    private elementRef: ElementRef,
    protected domSanitizer: DomSanitizer,
    private postService: PostService,
    private mapService: MapService,
    private authService: AuthService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.isMobile = !!(window.innerWidth <= this.configService.MOBILE_WIDTH)
    this.sub = this.route.params.subscribe(params => {
      this.postID = params['id']
      this.postService.get(this.postID).then(post => {
        this.post = post
        this.unsafeHtml = this.domSanitizer.bypassSecurityTrustHtml(this.post.text)
        let user = this.authService.getUser()

        let finds = this.post.likes.find((x) => x === user.username)
        this.hasLiked = finds ? true : false

        // load map layer
        this.mapService.showPost(this.postID)
      })
    })

    // workaround for not being able to put (click) functions into innerHml
    // Listen to click events in the component
    this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      if (event.target.attributes.class && event.target.attributes.class.value.indexOf('reference') > -1) {
        const ID = event.target.attributes.class.value.split(' ')[1]
        this.onRefClick(ID)
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  addComment(comment: Comment) {
    this.post.comments.push(comment)
    this.postService.update(this.post).then(res => {
      console.log('successfully added comment')
    })
  }

  /**
   * Workaround for formatted date strings on older safari versions
   */
  getFormattedDate(date: string) {
    let month = new Array()
    month[0] = 'Januar'
    month[1] = 'Februar'
    month[2] = 'März'
    month[3] = 'April'
    month[4] = 'Mai'
    month[5] = 'Juni'
    month[6] = 'Juli'
    month[7] = 'August'
    month[8] = 'September'
    month[9] = 'Oktober'
    month[10] = 'November'
    month[11] = 'Dezember'

    let d = new Date(date)
    return `${ d.getDate() }. ${ month[d.getMonth()] } ${ d.getFullYear() }`
  }

  like() {
    if (!this.hasLiked) {
      let user = this.authService.getUser()
      this.post.likes.push(user.username)
      this.hasLiked = true
      this.postService.update(this.post).then(res => {
          console.log('success')
      }).catch(() => this.hasLiked = false)
    }
}

  getColor() {
    return this.hasLiked ? 'IndianRed' : ''
  }

  getSeparator(index: number) {
    if (this.post.likes.length > 2 && index < this.post.likes.length - 2) {
        return ', '
    } else if (index === this.post.likes.length - 2) {
        return ' und '
    } else {
        return ''
    }
  }

  showOverview(): void {
    this.router.navigate(['/posts'])
  }

  private onRefClick(featureID: string): void {
    this.mapService.flyToFeature(featureID)
  }

  onWindowResize(event): void {
    this.isMobile = !!(event.target.innerWidth <= this.configService.MOBILE_WIDTH)
    this.mapService.onMapResize()
  }

//   closeMap() {
//     $('#myModal').modal('hide')
//   }

//   /** 
//    * Initiate a mobile map and removing the normal map.
//    */
//   showMobileMap(postID: string) {
//       $('#myModal').modal('show')

      
//   }
}
