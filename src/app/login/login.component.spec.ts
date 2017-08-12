import { TestBed, async } from '@angular/core/testing'
import { Router } from '@angular/router'
import { DebugElement } from '@angular/core'

import { UserService } from '../user.service'
import { AuthService } from '../shared/auth.service'
import { LoginComponent } from './login.component'

class AuthServiceMock {}

describe('Component: Login', () => {
  let fixture // : ComponentFixture<LoginComponent>
  let component: LoginComponent
  let element
  let buttonEl: HTMLButtonElement
  let usernameEl: HTMLInputElement
  let passwordEl: HTMLInputElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useClass: new AuthServiceMock() },
        { provide: UserService, useClass: new AuthServiceMock() }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.debugElement.componentInstance

    element = fixture.debugElement.nativeElement
    buttonEl = element.querySelector('button')
    usernameEl = element.querySelector('input#inputUsername')
    passwordEl = element.querySelector('input#inputPassword')
    fixture.detectChanges()
  }))

  it('should create the component', async(() => {
    expect(component).toBeTruthy()
  }))

  it('should render username and password fields', async(() => {
    expect(usernameEl).toBeTruthy()
    expect(usernameEl.placeholder).toContain('Benutzername')
    expect(usernameEl.value).toBe('')

    expect(passwordEl).toBeTruthy()
    expect(passwordEl.placeholder).toContain('Passwort')
    expect(passwordEl.value).toBe('')
  }))

  it('should assign entered values to component variables')

  it('should disable button when no credentials given', () => {
    expect(buttonEl).toBeTruthy()
    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should keep button disabled when only username given', () => {
    usernameEl.value = 'John Doe'
    usernameEl.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should keep button disabled when only password given', () => {
    passwordEl.value = 'some_password'
    passwordEl.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should enable button when credentials given', () => {
    usernameEl.value = 'John Doe'
    usernameEl.dispatchEvent(new Event('input'))
    passwordEl.value = 'some_password'
    passwordEl.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeFalsy()
  })

  it('should lock login button when clicked', () => {
    expect(buttonEl.disabled).toBeTruthy()
    usernameEl.value = 'John Doe'
    usernameEl.dispatchEvent(new Event('input'))
    passwordEl.value = 'some_password'
    passwordEl.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect(buttonEl.disabled).toBeFalsy()

    buttonEl.click()
    fixture.detectChanges()
    expect(buttonEl.disabled).toBeTruthy()
  })

})
