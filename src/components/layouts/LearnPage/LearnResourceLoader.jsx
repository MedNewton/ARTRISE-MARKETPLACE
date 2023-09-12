import carre1 from "../../../assets/images/popularCollections/carre1.jpg"
import carre2 from "../../../assets/images/12.jpg"
import carre3 from "../../../assets/images/item-background/item-1.png"

const LearnResourcesLoader = () => {
    const articles = [
        {
            title: 'Article 1',
            imageUrl: carre1,
        },
        {
            title: 'Article 2',
            imageUrl: carre2,
        },
        {
            title: 'Article 3',
            imageUrl: carre3,
        },
    ];
    return (
        <div className='learn-resource-section '>
            <div>
                <h1 className="learn-resource-heading">NFT 101</h1>
                <p className="learn-resource-subheading">Get comfortable with the basics.</p>
            </div>
            <div>
                <div className="article-container">
                    {articles.map((article, index) => (
                        <div key={index} className="article">
                            <div className="article-image-wrapper" >
                                <img src={article.imageUrl ? article.imageUrl : ""} alt={`Article ${index + 1}`} className="article-image" />
                            </div>
                                <h2 className="article-title">{article.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LearnResourcesLoader;
