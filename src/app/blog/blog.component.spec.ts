import { AuthService } from '../shared/auth.service'
import { BlogComponent } from './blog.component'
import { DebugElement } from '@angular/core'
import { MapService } from './map.service'
import { TestBed, async, tick, fakeAsync } from '@angular/core/testing'
import { NavbarComponent } from './navbar/navbar.component'
import { Router } from '@angular/router'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class MockMapService {
  onMapResize (): void {}
}

describe('Component: Blog', () => {
  let fixture // : ComponentFixture<LoginComponent>
  let component: BlogComponent
  let element
  let mapEl: HTMLDivElement
  let sideEl: HTMLDivElement
  let navbarEl: Element

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlogComponent
      ],
      providers: [
        { provide: MapService, useClass: MockMapService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // ignore subcomponents
    }).compileComponents()

    fixture = TestBed.createComponent(BlogComponent)
    component = fixture.debugElement.componentInstance

    element = fixture.debugElement.nativeElement
    mapEl = element.querySelector('div#map-panel')
    sideEl = element.querySelector('div#side-panel')
    fixture.detectChanges()
  }))

  it('should create the component', async(() => {
    expect(component).toBeTruthy()
  }))

  it('should render map and side panels', async(() => {
    expect(mapEl).toBeTruthy()
    expect(sideEl).toBeTruthy()
  }))

  // it('side-panel should show navbar on mobile devices', () => {
  //   navbarEl = sideEl.querySelector('app-navbar')
  //   expect(component.isMobile).toBeFalsy()
  //   expect(navbarEl).toBeFalsy()
  //   window.resizeTo(320, 568) // iPhone 5 screen size
  //   window.dispatchEvent(new Event('resize', ))
  //   fixture.detectChanges()
  //   // TODO: set width
  //   expect(component.isMobile).toBeTruthy()
  // })

  // it('should assign entered values to component variables')

  // it('should disable button when no credentials given', () => {
  //   expect(buttonEl).toBeTruthy()
  //   expect(buttonEl.disabled).toBeTruthy()
  // })

  // it('should keep button disabled when only username given', () => {
  //   usernameEl.value = 'John Doe'
  //   usernameEl.dispatchEvent(new Event('input'))
  //   fixture.detectChanges()

  //   expect(buttonEl.disabled).toBeTruthy()
  // })

  // it('should keep button disabled when only password given', () => {
  //   passwordEl.value = 'some_password'
  //   passwordEl.dispatchEvent(new Event('input'))
  //   fixture.detectChanges()

  //   expect(buttonEl.disabled).toBeTruthy()
  // })

  // it('should enable button when credentials given', () => {
  //   usernameEl.value = 'John Doe'
  //   usernameEl.dispatchEvent(new Event('input'))
  //   passwordEl.value = 'some_password'
  //   passwordEl.dispatchEvent(new Event('input'))
  //   fixture.detectChanges()

  //   expect(buttonEl.disabled).toBeFalsy()
  // })

  // it('should lock login button when clicked', () => {
  //   expect(buttonEl.disabled).toBeTruthy()
  //   usernameEl.value = 'John Doe'
  //   usernameEl.dispatchEvent(new Event('input'))
  //   passwordEl.value = 'some_password'
  //   passwordEl.dispatchEvent(new Event('input'))
  //   fixture.detectChanges()
  //   expect(buttonEl.disabled).toBeFalsy()

  //   buttonEl.click()
  //   fixture.detectChanges()
  //   expect(buttonEl.disabled).toBeTruthy()
  // })



})
