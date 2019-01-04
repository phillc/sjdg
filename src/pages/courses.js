import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Header from '../components/header'
import Section from '../components/section'

export default ({data}) =>
  <Layout title="Courses">
    <Header sections={{
      "stafford": "Stafford Woods",
      "doc": "Doc Cramer",
      "next": "Future" }} />
    <Section id="stafford" title="Stafford Woods">
			<div dangerouslySetInnerHTML={{ __html: data.staffordWoods.html }}></div>
    </Section>
    <Section id="doc" title="Doc Cramer">
			<div dangerouslySetInnerHTML={{ __html: data.docCramer.html }}></div>
    </Section>
    <Section id="next" title="Future">
			<div dangerouslySetInnerHTML={{ __html: data.future.html }}></div>
    </Section>
  </Layout>

export const pageQuery = graphql`
  query {
		staffordWoods: markdownRemark(frontmatter: { section: { eq: "courses-stafford-woods"} }) {
			id
			html
		},
		docCramer: markdownRemark(frontmatter: { section: { eq: "courses-doc-cramer"} }) {
			id
			html
		},
		future: markdownRemark(frontmatter: { section: { eq: "courses-future"} }) {
			id
			html
		}
	}
`
