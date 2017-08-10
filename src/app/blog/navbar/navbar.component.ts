import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() postID: string
  sub: any
  hasPost: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params)

      if (params['id']) {
        this.hasPost = true
      } else {
        this.hasPost = false
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngOnChanges(changes: any) {
    console.log(changes)
  }

  showOverview() {
    this.router.navigate(['/posts'])
  }

}
