import { twMerge } from 'tailwind-merge'
import classnames from 'classnames'

export const tw: typeof classnames = (...params) =>
  twMerge(classnames(...params))