import { Injectable } from '@angular/core'
import { Map, GeoJSON, Layer } from 'leaflet'

import { LayerService } from './layer.service'

@Injectable()
export class MapService {
  map: Map
  overviewLayer: GeoJSON
  postLayer: GeoJSON

  constructor(private layerService: LayerService) { }

  private initMap(mobile = false): void {
    const MAP_ID = mobile ? 'mobile-map' : 'map'
    this.map = L.map(MAP_ID, {
        center: [50.004716, 8.263407],
        zoom: 2,
        minZoom: 2,
        maxBoundsViscosity: 0.5
    })

    // force users to stay in bounds
    // this.map.setMaxBounds([[180, -180], [-180, 180]])

    this.layerService.basemaps.light.addTo(this.map)
  }

  public showOverview(): void {
    if (!this.map) {
      this.initMap()
    }

    if (this.overviewLayer) {  // only load once
      this.map.addLayer(this.overviewLayer)
      this.flyToLayer(this.overviewLayer)
    } else {
      this.layerService.getOverview().then(layer => {
        this.overviewLayer = layer
        this.map.addLayer(this.overviewLayer)
        this.flyToLayer(this.overviewLayer) // TODO: fix zoom bug
      })
    }

    if (this.postLayer) {
      this.map.removeLayer(this.postLayer)
    }
  }

  public showPost(postID: string): void {
    if (!this.map) {
      this.initMap()
    }

    this.layerService.getPostLayer(postID).then(layer => {
      this.postLayer = layer
      this.map.addLayer(this.postLayer)

      if (this.overviewLayer && this.map.hasLayer(this.overviewLayer)) {  // navigated from overview
        this.flyToLayer(this.postLayer)
        this.map.removeLayer(this.overviewLayer)
      } else {  // new map
        this.fitToLayer(this.postLayer)  // TODO: fix zoom bug
      }
    })
  }

  public flyToFeature(featureID: string): void {
    if (!this.map || !this.postLayer) {
      console.log('map not instantiated or layer not defined')
      return
    }

    let marker = this.getMarkerFromLayer(this.postLayer, featureID)
    if (marker) {
      this.map.flyTo(marker.getLatLng(), 13)
      setTimeout(() => marker.openPopup(), 500)
    }
  }

  private getMarkerFromLayer(layer: any, featureID: string) {
    for (let marker of layer.getLayers()) {
      if (marker.feature._id === featureID) { return marker }
    }
  }

  private fitToLayer(layer: GeoJSON): void {
    let bounds = layer.getBounds()
    if (this.map && bounds) {
      this.map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 14
      })
    }
  }

  private flyToLayer(layer: GeoJSON): void {
    this.map.flyToBounds(layer.getBounds(), {
      padding: [60, 60],
      duration: 3
    })
  }

  onMapResize(): void {
    if (this.map) {
      this.map.invalidateSize(false)
    }
  }
}
