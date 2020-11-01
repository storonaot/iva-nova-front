import React from 'react'

import styled from 'styled-components'

export type AspectRatios = '16:9' | '4:3' | '3:2' | '8:5' | '1:1'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  aspectRatio?: AspectRatios
  children?: React.ReactNode
}

const lib = {
  '16:9': '56.25%',
  '4:3': '75%',
  '3:2': '66.66%',
  '8:5': '62.5%',
  '1:1': '100%',
}

export const AspectRatioBox = styled.div<{ aspectRatio?: AspectRatios }>`
  height: 0;
  overflow: hidden;
  position: relative;
  padding-top: ${({ aspectRatio = '16:9' }) => lib[aspectRatio]};
  width: 100%;
`

export const AspectRatioInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ image }: Props) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const AspectRatioImage = ({ aspectRatio, image, children }: Props) => (
  <AspectRatioBox aspectRatio={aspectRatio}>
    <AspectRatioInner image={image} />
    {children}
  </AspectRatioBox>
)

export default AspectRatioImage
