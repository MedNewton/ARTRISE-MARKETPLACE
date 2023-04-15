import React from 'react';
import Header from '../components/header/HeaderStyle2';
import ItemContent from '../components/layouts/home-8/ItemContent';
import SideBar from '../components/layouts/home-8/SideBar';

const Home08 = () => {
  return (
    <div className='home-8'>
        <Header />
        <section className="tf-item tf-section all">
                <div className="themesflat-container">
                    <div className="row">
                    <div className="col-md-12">
                            <h2 className="tf-title style4 mg-bt-38 browse">
                                Browse</h2>
                        </div>
                        <div className="col-box-100">
                            <ItemContent />
                        </div>
                    </div>
                </div>
            </section>
    </div>
  );
}

export default Home08;