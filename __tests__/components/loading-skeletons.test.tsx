import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostCardSkeleton, PostListSkeleton, HeroSkeleton } from '../../components/loading-skeletons'

describe('Loading Skeletons', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders PostCardSkeleton with correct structure', () => {
    render(<PostCardSkeleton />)
    
    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('animate-pulse')
  })

  it('renders PostListSkeleton with specified count', () => {
    render(<PostListSkeleton count={2} />)
    
    const skeletons = screen.getAllByRole('article')
    expect(skeletons).toHaveLength(2)
  })

  it('renders PostListSkeleton with default count', () => {
    render(<PostListSkeleton />)
    
    const skeletons = screen.getAllByRole('article')
    expect(skeletons).toHaveLength(3)
  })

  it('renders HeroSkeleton with correct structure', () => {
    render(<HeroSkeleton />)
    
    const heroSection = screen.getByRole('region')
    expect(heroSection).toBeInTheDocument()
    expect(heroSection).toHaveClass('animate-pulse')
  })
})