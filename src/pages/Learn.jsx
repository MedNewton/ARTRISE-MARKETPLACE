import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import LearnHeader from '../components/layouts/LearnPage/LearnHeader';
import LearnResourcesLoader from '../components/layouts/LearnPage/LearnResourceLoader';

function Learn() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/ResourcesData.json')
      .then((response) => response.json())
      .then((json) => setResources(json.resources))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <LearnHeader />
      {resources && resources.map((resource) => (
        <LearnResourcesLoader resource={resource} />
      ))}
      <Footer />
    </div>
  );
}

export default Learn;
