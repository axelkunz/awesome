import { TestBed, async } from '@angular/core/testing'
import { Router } from '@angular/router'

import { UserService } from '../user.service'
import { AuthService } from '../shared/auth.service'
import { LoginComponent } from './login.component'

class AuthServiceMock {}

describe('LoginComponent', () => {
  let fixture // : ComponentFixture<LoginComponent>
  let component: LoginComponent
  let element // : DebugElement
  let buttonEl // : DebugElement
  let usernameEl // : DebugElement
  let passwordEl // : DebugElement

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
    buttonEl = element.querySelector('button.btn')
    usernameEl = element.querySelector('input#inputUsername')
    passwordEl = element.querySelector('input#inputPassword')
  }))

  it('should create the component', async(() => {
    expect(component).toBeTruthy()
  }))

  it('should render username and password fields', async(() => {
    fixture.detectChanges()
    expect(usernameEl).toBeTruthy()
    expect(usernameEl.placeholder).toContain('Benutzername')

    expect(passwordEl).toBeTruthy()
    expect(passwordEl.placeholder).toContain('Passwort')
  }))

  it('should disable button when no credentials given', () => {
    fixture.detectChanges()
    expect(buttonEl).toBeTruthy()
    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should keep button disabled when only username given', () => {
    fixture.detectChanges()
    expect(buttonEl).toBeTruthy()
    expect(buttonEl.disabled).toBeTruthy()

    component.username = 'John Doe'
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should keep button disabled when only password given', () => {
    fixture.detectChanges()
    expect(buttonEl).toBeTruthy()
    expect(buttonEl.disabled).toBeTruthy()

    component.password = 'some_password'
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should enable button when credentials given', () => {
    fixture.detectChanges()
    expect(buttonEl).toBeTruthy()
    expect(buttonEl.disabled).toBeTruthy()

    component.username = 'John Doe'
    component.password = 'some_password'
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeFalsy()
  })

})
