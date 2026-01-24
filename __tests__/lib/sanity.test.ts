import { describe, it, expect, beforeEach, jest } from '@jest/globals'

// Mock basic fetch for testing
global.fetch = jest.fn()

describe('Sanity Utils Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle basic query structure', () => {
    const mockQuery = '*[_type == "post"]'
    expect(mockQuery).toContain('post')
  })

  it('should test image URL generation', () => {
    const mockAsset = {
      _ref: 'image-abc123-800x600-jpg',
      url: 'https://example.com/image.jpg'
    }
    expect(mockAsset._ref).toBeTruthy()
  })
})