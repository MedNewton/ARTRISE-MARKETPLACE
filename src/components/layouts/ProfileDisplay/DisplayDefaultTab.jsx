import React from 'react';

function DisplayDefaultTab() {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
      }}
    >
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <img
            style={{ width: '50%' }}
            src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
            alt=""
          />
        </div>
        <div className="row sorry">
          <div className="col-12">
            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
              Sorry, We Couldn&lsquo;t Find Any Items in This Category
            </h2>
            <h5 className="sub-title help-center mg-bt-32 ">
              Check back soon! New content appears as you continue to explore and engage.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayDefaultTab;
