import React, {useEffect, useState} from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import LearnHeader from '../components/layouts/LearnPage/LearnHeader'
import LearnResourcesLoader from "../components/layouts/LearnPage/LearnResourceLoader";

const Learn = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetch("/ResourcesData.json")
            .then((response) => response.json())
            .then((json) => setResources(json.resources))
            .catch((error) => console.log("Error fetching data:", error));
    }, []);


    return (
        <div>
            <HeaderStyle2/>
            <LearnHeader/>
            {resources && resources.map((resource) => (
                <LearnResourcesLoader resource={resource}/>
            ))
            }
            <Footer/>
        </div>
    );
}

export default Learn;
