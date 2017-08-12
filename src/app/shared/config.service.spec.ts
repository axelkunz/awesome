import { ConfigService } from './config.service'

describe('Service: ConfigService', () => {
  let service: ConfigService

  beforeEach(() => {
    service = new ConfigService()
  })

  it('should have all the properties', () => {
    expect(service.HOST).toBeDefined()
    expect(service.ROLES).toBeDefined()
    expect(service.MOBILE_WIDTH).toBeDefined()
    expect(service.PICTURE_PATH).toBeDefined()
  })

})
