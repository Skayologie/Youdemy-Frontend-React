import React from 'react'
import ContainerS from './Container'

function Layout({content}) {
  return (
    <>
        <ContainerS>
            {content}
        </ContainerS>
    </>
  )
}

export default Layout