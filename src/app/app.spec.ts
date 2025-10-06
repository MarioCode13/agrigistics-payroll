import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { App } from './app'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render main layout', () => {
    const fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('.min-h-screen')).toBeTruthy()
    expect(compiled.querySelector('app-navigation-panel')).toBeTruthy()
    expect(compiled.querySelector('app-payroll-table')).toBeTruthy()
  })
})
