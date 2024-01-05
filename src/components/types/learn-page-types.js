import PropTypes from 'prop-types';

export const paragraphShape = {
  paragraphId: PropTypes.string,
  paragraphHeading: PropTypes.string,
  paragraphImageUrl: PropTypes.string,
  paragraphDescription: PropTypes.string,
};

export const resourceArticleShape = {
  articleId: PropTypes.string,
  resourceSlug: PropTypes.string,
  articleSlug: PropTypes.string,
  articleTitle: PropTypes.string,
  publishDate: PropTypes.string,
  articleImageUrl: PropTypes.string,
  articleParagraphs: PropTypes.arrayOf(
    PropTypes.shape(paragraphShape),
  ),
};

export const resourceShape = {
  resourceId: PropTypes.string,
  resourceSlug: PropTypes.string,
  resourceTitle: PropTypes.string,
  resourceSubTitle: PropTypes.string,
  resourceArticles: PropTypes.arrayOf(
    PropTypes.shape(resourceArticleShape),
  ),
};
