import React from 'react'
import { Helmet } from 'react-helmet'

const PagesTitle = (props: {title: string}) => {
  return (
    <Helmet>
        <title>{props.title}</title>
    </Helmet>
  )
}

export default PagesTitle