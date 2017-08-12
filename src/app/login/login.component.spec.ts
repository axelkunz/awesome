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
  }))

  it('should create the component', async(() => {
    expect(component).toBeTruthy()
  }))

  it('should render username and password fields', async(() => {
    fixture.detectChanges()
    expect(usernameEl).toBeTruthy()
    expect(usernameEl.placeholder).toContain('Benutzername')
    expect(usernameEl.value).toBe('')

    expect(passwordEl).toBeTruthy()
    expect(passwordEl.placeholder).toContain('Passwort')
    expect(passwordEl.value).toBe('')
  }))

  it('should call onKey event when username is entered', async(() => {
    spyOn(component, 'onUsernameChange')
    usernameEl.value = 'John Doe'
    fixture.detectChanges()
    usernameEl.dispatchEvent(new Event('keyup'))

    fixture.whenStable().then(() => {
      expect(component.onUsernameChange).toHaveBeenCalled()
    })
  }))

  it('should call onKey event when password is entered', async(() => {
    spyOn(component, 'onPasswordChange')
    passwordEl.dispatchEvent(new Event('keyup'))

    fixture.whenStable().then(() => {
      expect(component.onPasswordChange).toHaveBeenCalled()
    })
  }))

  it('should assign entered values to component variables')

  it('should disable button when no credentials given', () => {
    fixture.detectChanges()
    expect(buttonEl).toBeTruthy()
    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should keep button disabled when only username given', () => {
    fixture.detectChanges()
    usernameEl.value = 'John Doe'
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeTruthy()
  })

  it('should keep button disabled when only password given', () => {
    fixture.detectChanges()
    passwordEl.value = 'some_password'
    fixture.detectChanges()

    expect(buttonEl.disabled).toBeTruthy()
  })

  // it('should enable button when credentials given', async(() => {
  //   fixture.detectChanges()
  //   usernameEl.value = 'John Doe'
  //   passwordEl.value = 'some_password'
  //   fixture.detectChanges()

  //   fixture.whenStable().then(() => {
  //     expect(buttonEl.disabled).toBeFalsy()
  //   })

  // }))

  it('should call onClick handler', async(() => {
    spyOn(component, 'onButtonClick')
    component.username = 'John Doe'
    component.password = 'some_password'
    buttonEl.click()

    fixture.whenStable().then(() => {
      expect(component.onButtonClick).toHaveBeenCalled()
    })
  }))

  // it('should lock login button when clicked', async(() => {
  //   component.username = 'John Doe'
  //   component.password = 'some_password'
  //   expect(buttonEl.disabled).toBeFalsy()
  //   buttonEl.click()

  //   fixture.whenStable().then(() => {
  //     expect(buttonEl.disabled).toBeTruthy()
  //   })
  // }))

})
