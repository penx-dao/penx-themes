import React, { PropsWithChildren } from 'react'
import { Box, css, FowerHTMLProps } from '@fower/react'
import { getCurrent } from '@tauri-apps/api/window'

interface DotProps extends FowerHTMLProps<'div'> {}

function Dot(props: PropsWithChildren<DotProps>) {
  return (
    <Box
      as="button"
      p0
      w-12
      h-12
      roundedFull
      outlineNone--focus
      toCenter
      cursorPointer
      transitionAll
      id="titlebar-close"
      {...props}
    ></Box>
  )
}

export default function MacTitlebar() {
  return (
    <Box className="titleBar" inlineFlex toCenter px2 data-tauri-drag-region>
      <Box toCenterY gap2>
        <Dot
          bgRed500
          bgRed600--hover
          onClick={async () => {
            await getCurrent().minimize()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#750000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css(['opacity-0', 'opacity-100--$titleBar--hover'])}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Dot>

        <Dot
          bgYellow500
          bgYellow600--hover
          onClick={async () => {
            await getCurrent().minimize()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#805b00"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css(['opacity-0', 'opacity-100--$titleBar--hover'])}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Dot>

        <Dot
          bgGreen500
          bgGreen600--hover
          onClick={async () => {
            await getCurrent().toggleMaximize()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#006400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={css(['opacity-0', 'opacity-100--$titleBar--hover'])}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 4 20 4 20 8" />
            <line x1="14" y1="10" x2="20" y2="4" />
            <polyline points="8 20 4 20 4 16" />
            <line x1="4" y1="20" x2="10" y2="14" />
          </svg>
        </Dot>
      </Box>
    </Box>
  )
}
