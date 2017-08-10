import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import * as L from 'leaflet'
import { GeoJSON } from 'leaflet'

import { ConfigService } from '../shared/config.service'
import { FeatureService } from '../shared/feature.service'
import { IconService } from './icon.service'

@Injectable()
export class LayerService {

    KEY: string = 'pk.eyJ1Ijoic2hhbnl1YW4iLCJhIjoiY2lmcWd1cnFlMDI0dXRqbHliN2FzdW9kNyJ9.wPkC7amwS2ma4qKWmmWuqQ'
    FEATURE_PATH: string = '/api/features'

    basemaps: any = {

        light: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
            noWrap: true
            // attribution: '&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors'
        }),

        light2: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
            noWrap: true
            // attribution: '&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors'
        }),

        oldLight: L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${ this.KEY }`),

        dark: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
              // attribution: '&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors'
        }),

        streets: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/' + 'tiles/256/{z}/{x}/{y}?access_token=' + this.KEY, {
              // attribution: '&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors'
        }),

        pencil: L.tileLayer('https://api.mapbox.com/v4/mapbox.pencil/page.html?access_token=' + this.KEY, {
              // attribution: '&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors'
        }),

        lightOSM: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            // noWrap: true
            // attribution: '&copy <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy <a href='http://cartodb.com/attributions'>CartoDB</a>'
        })
    }

    constructor(
        private http: Http,
        private configService: ConfigService,
        private iconService: IconService,
        private featureService: FeatureService
    ) { }

    getOverview (): Promise<GeoJSON> {
        return new Promise(resolve => {
            // get geoJSON feature collection for story
            this.featureService.query().then(features => {
                // console.log(features.length)
                let layer = L.geoJSON(features, {
                    // filter: (feature) => {
                    //     return feature.properties.category === 'chapter' || feature.properties.category === 'post'
                    // },
                    // onEachFeature: (feature, layer) => {
                    //     layer.bindPopup(feature.properties.name)
                    // }
                })
                resolve(layer)
            })
        })
    }

    getPostLayer(postID: string): Promise<GeoJSON> {
        return new Promise(resolve => {
            this.featureService.query().then(features => {
                let leafletLayer = L.geoJSON(features, {
                    // filter: feature => {
                    //     return feature.properties.category !== 'chapter' && feature.properties.category !== 'post' && feature.properties.postID === postID
                    // },
                    // onEachFeature: (feature, layer) => {
                    //     // layer.setIcon(this.iconService.hotelIcon)
                    //     layer.bindPopup(feature.properties.name)
                    // }
                })
                resolve(leafletLayer)
            })

        })
    }

    isOverview(feature): boolean {
        return feature.properties.category === 'chapter' || feature.properties.category === 'post'
    }

    isPost(feature): boolean {
        return !this.isOverview(feature)
    }

}
