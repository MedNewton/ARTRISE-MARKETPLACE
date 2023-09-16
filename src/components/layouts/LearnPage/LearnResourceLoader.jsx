import {useNavigate} from "react-router-dom";
import image1 from "../../../assets/images/learnResourcesImages/1.jpg";
import image2 from "../../../assets/images/learnResourcesImages/2.jpg";
import image3 from "../../../assets/images/learnResourcesImages/3.jpg";
import image4 from "../../../assets/images/learnResourcesImages/4.jpg";
import image5 from "../../../assets/images/learnResourcesImages/5.jpg";
import image6 from "../../../assets/images/learnResourcesImages/6.jpg";
import image7 from "../../../assets/images/learnResourcesImages/7.jpg";
import image8 from "../../../assets/images/learnResourcesImages/8.jpg";
import image9 from "../../../assets/images/learnResourcesImages/9.jpg";

const imageArray = [image1, image2, image3, image4, image5, image6, image7, image8, image9];


const LearnResourcesLoader = ({resource}) => {
    const navigate = useNavigate();
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        return imageArray[randomIndex];
    };
    const articleClickHandler = (article) => {
        navigate(`/learn/${article.resourceSlug}/${article?.articleSlug}`)
    }

    return (
        <div className='learn-resource-section '>
            <div>
                <h1 className="learn-resource-heading">{resource?.resourceTitle ? resource?.resourceTitle : ""}</h1>
                <p className="learn-resource-subheading">{resource?.resourceSubTitle ? resource?.resourceSubTitle : ""}</p>
            </div>
            <div>
                <div className="article-container">
                    {resource?.resourceArticles && resource.resourceArticles.map((article, index) => (
                        <div key={index} className="article" onClick={() => articleClickHandler(article)}>
                            <div className="article-image-wrapper">
                                <img src={getRandomImage()} alt={`Article ${index + 1}`} className="article-image"/>
                            </div>
                            <h2 className="article-title">{article?.articleTitle}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LearnResourcesLoader;
