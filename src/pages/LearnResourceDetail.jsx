import React, {useState, useEffect} from 'react';
import {useRef} from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

import carre1 from "../assets/images/popularCollections/carre1.jpg";
import rightArrowIcon from "../assets/images/icon/rightArrowIcon.svg"

function ArticleDetails() {
    const paragraphDetailsRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState('fixed');

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
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
    const paragraphs = [
        {
            title: 'paragraph 1',
            imageUrl: carre1,
            details: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ar  chitecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? "
        },
        {
            title: 'paragraph 2',
            imageUrl: carre1,
            details: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual tea   chings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        },
        {
            title: 'paragraph 3',
            imageUrl: carre1,
            details: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupidi   cusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        },
        {
            title: 'paragraph 4',
            imageUrl: carre1,
            details: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pl     easure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse painsOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are per       fectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse painsOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail    in their duty through weakness of will, which i    s the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains"
        },
        {
                title: 'paragraph 5',
                imageUrl: carre1,
                details: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains"
            }
    ];
    const scrollToParagraph = (index) => {
        if (paragraphDetailsRef.current) {
            const paragraph = paragraphDetailsRef.current.children[index];
            if (paragraph) {
                const navbarHeight = 120;

                const scrollPosition = paragraph.offsetTop - navbarHeight;

                window.scrollTo({ top: scrollPosition, behavior: "smooth" });
            }
        }
    };


    function splitParagraph(text) {
        const paragraphs = text.split('  ').map((paragraph) => paragraph.trim());
        return paragraphs.map((paragraph, index) => (
            <div key={index}>
                {paragraph.split('\n').map((line, lineIndex) => (
                    <div className='paragraph-text-style learn-resource-padding' key={lineIndex}>{line}</div>
                ))}
                {index !== paragraphs.length - 1 && <div key={`empty-${index}`}>&nbsp;</div>}
            </div>
        ));
    }

    return (
        <div>
            <HeaderStyle2/>
            <div className="learn-resource-detail-page-wrapper">
                <div className='learn-resource-navigation small-heading-text-style'>
                    Learn&emsp;<img src={rightArrowIcon}/>&emsp;NFT 101&emsp;<img src={rightArrowIcon}/>&emsp;How to Buy an NFT
                </div>
                <div className='learn-resource-detail-article-wrapper'>
                    <div className='learn-resource-detail-headings'>
                        <div className='learn-resource-detail-headings2' style={{position:`${menuPosition}`}}>
                        {paragraphs.map((para,index) => (
                            <div className=" small-heading-text-style learn-resource-detail-headings-wrapper"
                                 onClick={() => scrollToParagraph(index)}
                                 style={{ cursor: "pointer" }} // Add pointer cursor for clickable headings
                            >{para.title}</div>
                        ))}
                        </div>
                    </div>
                    <div className='learn-resource-detail-paragraph' >
                        <div>
                            <div className='small-heading-text-style '>Published September 8, 2023</div>
                            <h3 className='mt-20'>How to Buy an NFT</h3>
                        </div>
                        <div ref={paragraphDetailsRef}>
                        {paragraphs.map((para,index) => (
                            <div key={para.title}>
                                <h4 className="learn-article-title learn-resource-padding"
                                    >{para.title}</h4>
                                <div>{splitParagraph(para.details)}</div>
                                <div className='resource-image-wrapper'>
                                    <img className='resource-image' src={para.imageUrl}/>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ArticleDetails;
