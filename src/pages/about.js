import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Header from '../components/header'
import Section from '../components/section'

export default ({data}) =>
  <Layout title="About">
    <Header sections={
      { "mission": "Mission",
        "constitution": "Constitution",
        "projects": "Projects",
        "support": "Support" }} />

    <Section id="mission" title="Mission">
			<div dangerouslySetInnerHTML={{ __html: data.mission.html }}></div>
    </Section>
    <Section id="constitution" title="Constitution">
			<div dangerouslySetInnerHTML={{ __html: data.constitution.html }}></div>
    </Section>
    <Section id="projects" title="Projects">
			<div dangerouslySetInnerHTML={{ __html: data.projects.html }}></div>
    </Section>
    <Section id="support" title="Support">
			<div dangerouslySetInnerHTML={{ __html: data.support.html }}></div>
    </Section>
  </Layout>


export const pageQuery = graphql`
  query {
		mission: markdownRemark(frontmatter: { section: { eq: "about-mission"} }) {
			id
			html
		},
		constitution: markdownRemark(frontmatter: { section: { eq: "about-constitution"} }) {
			id
			html
		},
		projects: markdownRemark(frontmatter: { section: { eq: "about-projects"} }) {
			id
			html
		},
		support: markdownRemark(frontmatter: { section: { eq: "about-support"} }) {
			id
			html
		}
	}
`
