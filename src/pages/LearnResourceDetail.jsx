import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/footer/Footer';

import rightArrowIcon from '../assets/images/icon/rightArrowIcon.svg';
import image1 from '../assets/images/learnResourcesImages/1.jpg';
import image2 from '../assets/images/learnResourcesImages/2.jpg';
import image3 from '../assets/images/learnResourcesImages/3.jpg';
import image4 from '../assets/images/learnResourcesImages/4.jpg';
import image5 from '../assets/images/learnResourcesImages/5.jpg';
import image6 from '../assets/images/learnResourcesImages/6.jpg';
import image7 from '../assets/images/learnResourcesImages/7.jpg';
import image8 from '../assets/images/learnResourcesImages/8.jpg';
import image9 from '../assets/images/learnResourcesImages/9.jpg';

const imageArray = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

function ArticleDetails() {
  const paragraphDetailsRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState('fixed');
  const [allResources, setAllResources] = useState([]);
  const [resource, setResource] = useState();
  const [article, setArticle] = useState();

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  };

  const getArticleData = (secondLastSegment, lastSegment) => {
    const tempResource = allResources.find((tempRes) => secondLastSegment === tempRes.resourceSlug);
    setResource(tempResource);
    const tempArticle = tempResource?.resourceArticles?.find((tempArt) => lastSegment === tempArt.articleSlug);
    setArticle(tempArticle);
  };

  const scrollToParagraph = (index) => {
    if (paragraphDetailsRef.current) {
      const paragraph = paragraphDetailsRef.current.children[index];
      if (paragraph) {
        const navbarHeight = 120;
        const scrollPosition = paragraph.offsetTop - navbarHeight;
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    }
  };

  function splitParagraph(text) {
    const paragraphs = text.split('  ').map((paragraph) => paragraph.trim());
    return paragraphs.map((paragraph, index) => (
      <div key={paragraph[0]}>
        {paragraph.split('\n').map((line) => (
          <div className="paragraph-text-style learn-resource-padding" key={line[0]}>{line}</div>
        ))}
        {index !== paragraphs.length - 1 && <div key={`empty-${paragraph[0]}`}>&nbsp;</div>}
      </div>
    ));
  }

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      const last700pxThreshold = pageHeight - 950;
      if (scrollPosition >= last700pxThreshold) {
        setMenuPosition('absolute');
      } else {
        setMenuPosition('fixed');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch('/ResourcesData.json')
      .then((response) => response.json())
      .then((json) => setAllResources(json.resources))
      .catch(() => {

      });
  }, []);

  useEffect(() => {
    const { pathname } = window.location;
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    const secondLastSegment = segments[segments.length - 2];
    if (lastSegment && secondLastSegment) {
      getArticleData(secondLastSegment, lastSegment);
    }
  });

  return (
    <div>
      <div className="learn-resource-detail-page-wrapper">
        <div className="learn-resource-navigation">
          Learn&emsp;
          <img src={rightArrowIcon} alt="right arrow icon here" />
          {'\u2003'}
          {resource?.resourceTitle}
          <img
            src={rightArrowIcon}
            alt="right arrow icon here"
          />
          {article?.articleTitle}
        </div>
        <div className="learn-resource-detail-article-wrapper">
          <div className="learn-resource-detail-headings">
            <div
              className="learn-resource-detail-headings2"
              style={{ position: `${menuPosition}` }}
            >
              {article?.articleParagraphs?.map((paragraph, index) => (
                <button
                  type="button"
                  className="learn-resource-detail-headings-wrapper"
                  onClick={() => scrollToParagraph(index)}
                  onKeyDown={() => scrollToParagraph(index)}
                  style={{ cursor: 'pointer' }}
                >
                  {paragraph.paragraphHeading}
                </button>
              ))}
            </div>
          </div>
          <div className="learn-resource-detail-paragraph">
            <div>
              <div className="resource-article-date-text-style">
                Published
                {article?.publishDate}
              </div>
              <h3 className="mt-20">{resource?.resourceTitle}</h3>
            </div>
            <div ref={paragraphDetailsRef}>
              {article?.articleParagraphs?.map((paragraph) => (
                <div key={paragraph?.paragraphHeading}>
                  <h4 className="learn-article-title learn-resource-padding">
                    {paragraph?.paragraphHeading}
                  </h4>
                  <div>{splitParagraph(paragraph?.paragraphDescription)}</div>
                  {paragraph?.paragraphImageUrl
                                        && (
                                        <div className="resource-image-wrapper">
                                          <img
                                            className="resource-image"
                                            src={getRandomImage()}
                                            alt="Amazing Artwork"
                                          />
                                        </div>
                                        )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ArticleDetails;
