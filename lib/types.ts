import * as React from "react"

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode
}

export type WithClassName<T = {}> = T & {
  className?: string
}

export type WithVariant<T = {}> = T & {
  variant?: string
}
