'use strict';

const path = require('path');

const PAGE_SIZE = 10;

function createIndexPages(actions, result) {
  const { createPage, createRedirect } = actions;

  const posts = result.data.allMarkdownRemark.edges;
  const total = posts.length;

  const pageTotal = Math.round(total / PAGE_SIZE);
  for (let page = 1; page <= pageTotal; page += 1) {
    // eslint-disable-next-line no-console
    console.log(`createPage: /page/${page}`);
    createPage({
      path: page === 1 ? '/' : `/page/${page}`,
      component: path.resolve('src/templates/blog-index.tsx'),
      context: {
        page,
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        total,
      },
    });
  }

  createRedirect({
    fromPath: '/page/1',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
  });
}

function createPostPages(actions, result) {
  const { createPage } = actions;

  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({ node }) => {
    const {
      id,
      fields: { slug },
    } = node;

    // eslint-disable-next-line no-console
    console.log(`createPage: ${slug}`);
    createPage({
      path: slug,
      component: path.resolve('src/templates/blog-post.tsx'),
      context: {
        id,
      },
    });
  });
}

module.exports = ({ actions, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "YYYY/MM/DD")
              tags
            }
            fields {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      // eslint-disable-next-line no-console
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }
    createIndexPages(actions, result);
    createPostPages(actions, result);
  });
};
