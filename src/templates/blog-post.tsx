import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Comment from '../components/Comment';

import { getPostLink } from '../utils/helpers';

interface IPostPageProps {
  location: Location;
  data: {
    markdownRemark: IMarkdownRemarkNode;
  };
  pageContext: {
    id: string;
  };
}

const PostPageTemplate = (props: IPostPageProps) => {
  const { location, data, pageContext } = props;

  const post = data.markdownRemark;
  const postLink = getPostLink(post);
  const postCommentId = post.frontmatter.issueId;

  const postMeta = [{
    name: 'keywords',
    content: post.fields.keywords.join(', '),
  }];

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        slug={postLink}
        meta={postMeta}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={10}>
            <Post post={data.markdownRemark} />
            <Comment id={postCommentId} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query GetBlogPost($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        tags
        issueId
      }
      fields {
        slug
        keywords,
      }
      excerpt(truncate: true)
      html
      timeToRead
    }
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`;

export default PostPageTemplate;
