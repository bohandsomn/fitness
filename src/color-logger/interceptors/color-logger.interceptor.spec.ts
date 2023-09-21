import { ColorLoggerinterceptor } from './color-logger.interceptor.js'
import { ColorLoggerService } from '../services/color-logger.service.js'

describe('ColorLoggerinterceptor', () => {
  it('should be defined', () => {
    expect(new ColorLoggerinterceptor(new ColorLoggerService())).toBeDefined()
  })
})
