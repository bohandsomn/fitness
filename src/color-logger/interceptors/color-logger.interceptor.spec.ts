import { ColorLoggerInterceptor } from './color-logger.interceptor'
import { ColorLoggerService } from '../services/color-logger.service'

describe('ColorLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new ColorLoggerInterceptor(new ColorLoggerService())).toBeDefined()
  })
})
