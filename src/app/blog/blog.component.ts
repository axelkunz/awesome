import { Component, OnInit } from '@angular/core'

import { MapService } from './map.service'
import { ConfigService } from '../shared/config.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isMobile: boolean
  sub: any

  constructor(
    private configService: ConfigService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.isMobile = !!(window.innerWidth <= this.configService.MOBILE_WIDTH)
  }

  onWindowResize(event): void {
    this.isMobile = !!(event.target.innerWidth <= this.configService.MOBILE_WIDTH)
    this.mapService.onMapResize()
  }
}
