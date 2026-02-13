/* eslint-disable @typescript-eslint/no-require-imports */
import type { PostWithReadTime } from '../../../lib/sanity/fetch'

// Mock the base sanity fetch function
const mockBaseSanityFetch = jest.fn()

jest.mock('../../../sanity/lib/fetch', () => ({
  sanityFetch: mockBaseSanityFetch,
}))

// Mock other dependencies
jest.mock('server-only', () => ({}))

jest.mock('../../../sanity/lib/api', () => ({
  dataset: 'test-dataset',
  projectId: 'test-project-id',
  apiVersion: '2024-02-28',
  studioUrl: '/studio',
}))

jest.mock('../../../sanity/lib/token', () => ({
  token: 'test-token',
}))

jest.mock('next-sanity', () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
  })),
}))

// Module-level variables to hold imported functions
let fetchSanityData: typeof import('../../../lib/sanity/fetch').fetchSanityData
let fetchPost: typeof import('../../../lib/sanity/fetch').fetchPost
let fetchRecentPosts: typeof import('../../../lib/sanity/fetch').fetchRecentPosts

describe('Sanity Fetch Utilities', () => {
  beforeAll(async () => {
    const module = await import('../../../lib/sanity/fetch')
    fetchSanityData = module.fetchSanityData
    fetchPost = module.fetchPost
    fetchRecentPosts = module.fetchRecentPosts
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchSanityData', () => {
    it('calls sanityFetch with correct parameters', async () => {
      const { sanityFetch } = require('../../../sanity/lib/fetch')
      const mockSanityFetch = sanityFetch as jest.MockedFunction<typeof sanityFetch>
      
      mockSanityFetch.mockResolvedValue({ test: 'data' })
      
      const result = await fetchSanityData({
        query: '*[_type == "test"]',
        params: { limit: 10 },
        stega: true,
      })
      
      expect(mockSanityFetch).toHaveBeenCalledWith({
        query: '*[_type == "test"]',
        params: { limit: 10 },
        stega: true,
      })
      
      expect(result).toEqual({ test: 'data' })
    })

    it('caches responses when useCache is true', async () => {
      const { sanityFetch } = require('../../../sanity/lib/fetch')
      const mockSanityFetch = sanityFetch as jest.MockedFunction<typeof sanityFetch>
      
      const responseData = { cached: 'data' }
      mockSanityFetch.mockResolvedValue(responseData)
      
      const result1 = await fetchSanityData({
        query: '*[_type == "test"]',
        useCache: true,
      })
      
      expect(mockSanityFetch).toHaveBeenCalledTimes(1)
      expect(result1).toEqual(responseData)
      
      const result2 = await fetchSanityData({
        query: '*[_type == "test"]',
        useCache: true,
      })
      
      expect(mockSanityFetch).toHaveBeenCalledTimes(1)
      expect(result2).toEqual(responseData)
    })
  })

  describe('fetchPost', () => {
    it('fetches a post by slug and returns it', async () => {
      const mockPost = {
        _id: 'test-id',
        _type: 'post' as const,
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'Test Post',
        slug: { _type: 'slug' as const, current: 'test-post' },
        content: [],
        excerpt: 'Test excerpt',
        coverImage: undefined,
        date: '2024-01-01',
        author: { name: 'Test Author', picture: null },
        tags: ['test'],
        readTime: 5,
      } as unknown as PostWithReadTime

      mockBaseSanityFetch.mockResolvedValue(mockPost)

      const result = await fetchPost('test-post')

      expect(mockBaseSanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.stringContaining('*[_type == "post" && slug.current == $slug][0]'),
          params: { slug: 'test-post' },
        })
      )

      expect(result).toEqual(mockPost)
    })

    it('returns null when no post found', async () => {
      mockBaseSanityFetch.mockResolvedValue(null)

      const result = await fetchPost('nonexistent-post')

      expect(result).toBeNull()
    })
  })

  describe('fetchRecentPosts', () => {
    it('fetches recent posts with correct query and limit', async () => {
      const mockPosts = [
        {
          _id: 'test-id-1',
          _type: 'post' as const,
          _createdAt: '2024-01-01T00:00:00Z',
          _updatedAt: '2024-01-01T00:00:00Z',
          _rev: 'rev-1',
          title: 'Test Post 1',
          slug: { _type: 'slug' as const, current: 'test-post-1' },
          excerpt: 'Test excerpt 1',
          coverImage: undefined,
          date: '2024-01-01',
          author: { name: 'Test Author', picture: null },
          tags: ['test'],
          readTime: 5,
        },
        {
          _id: 'test-id-2',
          _type: 'post' as const,
          _createdAt: '2024-01-02T00:00:00Z',
          _updatedAt: '2024-01-02T00:00:00Z',
          _rev: 'rev-2',
          title: 'Test Post 2',
          slug: { _type: 'slug' as const, current: 'test-post-2' },
          excerpt: 'Test excerpt 2',
          coverImage: undefined,
          date: '2024-01-02',
          author: { name: 'Test Author', picture: null },
          tags: ['test'],
          readTime: 5,
        },
      ] as unknown as PostWithReadTime[]

      mockBaseSanityFetch.mockResolvedValue(mockPosts)

      const result = await fetchRecentPosts(2)

      expect(mockBaseSanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.stringContaining('*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit]'),
          params: { limit: 2 },
        })
      )

      expect(result).toEqual(mockPosts)
    })

    it('returns empty array when no posts found', async () => {
      mockBaseSanityFetch.mockResolvedValue(null)

      const result = await fetchRecentPosts(5)

      expect(result).toEqual([])
    })

    it('uses default limit of 3 when not specified', async () => {
      const mockPosts = [] as unknown as PostWithReadTime[]
      mockBaseSanityFetch.mockResolvedValue(mockPosts)

      const result = await fetchRecentPosts()

      expect(mockBaseSanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.stringContaining('*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit]'),
          params: { limit: 3 },
        })
      )

      expect(result).toEqual([])
    })
  })
})