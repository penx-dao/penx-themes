import React, { FC, forwardRef } from 'react'
import { Box, FowerHTMLProps } from '@fower/react'

export interface SkeletonProps extends FowerHTMLProps<'div'> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    return (
      <Box
        className={`uikit-skeleton`}
        ref={ref}
        bgNeutral200
        animatePulse
        rounded
        w-100p
        minH-16
        {...props}
      ></Box>
    )
  },
)
