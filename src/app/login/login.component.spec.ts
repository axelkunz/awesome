import { AuthService } from '../shared/auth.service'
import { DebugElement } from '@angular/core'
import { LoginComponent } from './login.component'
import { Router } from '@angular/router'
import { TestBed, async, tick, fakeAsync } from '@angular/core/testing'
import { UserService } from '../user.service'

class MockAuthService {
  isLoggedIn (): Promise<any> {
    return new Promise((resolve, reject) => reject())
  }

  login (): Promise<any> {
    return new Promise((resolve, reject) => reject('some error'))
  }
}

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
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router }
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

  // it('should forward to / when already logged in', () => {
  //   MockAuthService.isLoggedIn(): Promise<any> {
  //     return new Promise((resolve, reject) => reject())
  //   }
  // })

  // it('should show error when login unsuccessful', fakeAsync(() => {
  //   spyOn(component, 'onButtonClick')
  //   usernameEl.value = 'John Doe'
  //   usernameEl.dispatchEvent(new Event('input'))
  //   passwordEl.value = 'some_password'
  //   passwordEl.dispatchEvent(new Event('input'))
  //   fixture.detectChanges()
  //   buttonEl.click()

  //   tick()
  //   fixture.detectChanges()

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     expect(usernameEl.classList).toContain('invalid')
  //     // expect(el.nativeElement.textContent.trim()).toBe('Logout');
  //   })


  // }))

})
