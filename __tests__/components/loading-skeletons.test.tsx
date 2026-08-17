import { describe, it, expect } from '@jest/globals'
import React from 'react'
import { render } from '@testing-library/react'
import { PostCardSkeleton, PostListSkeleton, HeroSkeleton } from '../../components/loading-skeletons'

describe('Loading Skeletons', () => {
  it('renders PostCardSkeleton', () => {
    const { container } = render(<PostCardSkeleton />)
    expect(container).toBeTruthy()
  })

  it('renders PostListSkeleton with count', () => {
    const { container } = render(<PostListSkeleton count={2} />)
    expect(container).toBeTruthy()
  })

  it('renders PostListSkeleton with default count', () => {
    const { container } = render(<PostListSkeleton />)
    expect(container).toBeTruthy()
  })

  it('renders HeroSkeleton', () => {
    const { container } = render(<HeroSkeleton />)
    expect(container).toBeTruthy()
  })
})
