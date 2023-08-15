import React from "react"
import "@hwclass/ritzy"

import BlogLayout from "gatsby-theme-blog/src/components/layout"

export default (props) => (
  <BlogLayout {...props}>
    <ritzy-player selector="#ritzy-en-content" lang="en-EN"
      appId="e101dca9-ab2b-4386-a769-b7c17dc25e0c"></ritzy-player>
    {props.children}
  </BlogLayout>
)
