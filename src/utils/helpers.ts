import _ from 'lodash/fp';
import format from 'date-fns/format';
import getTime from 'date-fns/get_time';

// getBrowserWindow :: void -> window
export const getBrowserWindow = () => {
  return typeof window !== 'undefined' && window;
};

// getPostLink :: IMarkdownRemarkNode -> string
export const getPostLink = (post: IMarkdownRemarkNode) => {
  const {
    fields: { slug },
  } = post;
  return slug;
};

// formatPostDate :: string -> string
export const formatPostDate = (date: string) => {
  return format(date, 'YYYY年MM月DD日');
};

// formatReadingTime :: number -> string
export const formatReadingTime = (time: number) => {
  const minutes = Math.round(time * 2);
  return `预计阅读需要 ${minutes} 分钟`;
};

// getDocumentScrollTop :: () -> number
export const getDocumentScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

// isInViewportByElementId :: string -> boolean
export const isInViewportByElementId = (id) => {
  const $el = document.getElementById(id);
  if ($el === null) {
    return false;
  }
  const rect = $el.getBoundingClientRect();
  const clientHeight = document.documentElement.clientHeight;
  return rect.top < clientHeight;
};

export const replaceUrlWithoutRefresh = (url) => {
  history.replaceState('', document.title, url);
};

// getMarkdownRemarkEdgeNode :: ImarkdownRemark -> IMarkdownRemarkNode[]
export const getMarkdownRemarkEdgeNode = _.compose(
  _.map('node'),
  _.get('allMarkdownRemark.edges'),
);

// groupByDateFromPost :: IMarkdownRemarkNode[] -> Dictionary<ImarkdownRemarkNode[]>
export const groupByDateFromNodes = _.compose(
  _.sortBy([([date]) => -getTime(date)]),
  _.entries,
  _.groupBy(
    _.compose(
      (date) => format(date, 'YYYY/MM'),
      _.get('frontmatter.date'),
    ),
  ),
);

// collectTagNamesFromNodes :: IMarkdownRemarkNode[] -> string[]
export const collectTagNamesFromNodes = _.compose(
  _.uniq,
  _.reduce(_.concat, []),
  _.map('frontmatter.tags'),
);
