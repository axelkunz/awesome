import { Component, OnInit } from '@angular/core'
import { ConfigService } from '../shared/config.service'
import { MapService } from './map.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private isMobile: boolean
  private MOBILE_WIDTH = 480  // width in pixels for which the navbar gets displayed

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.isMobile = !!(window.innerWidth <= this.MOBILE_WIDTH)
  }

  onWindowResize(event): void {
    this.isMobile = !!(event.target.innerWidth <= this.MOBILE_WIDTH)
    this.mapService.onMapResize()
  }
}
