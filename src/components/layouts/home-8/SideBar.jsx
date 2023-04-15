import React , { useState } from 'react';
import { Accordion } from 'react-bootstrap-accordion'

const SideBar = () => {
    const [dataCate] = useState(
        [
            {
                title: 'Categories',
                content: [
                    {
                        field: 'Paitings',
                        checked: 'checked'
                    },
                    {
                        field: 'Photography',
                        checked: ''
                    },
                    {
                        field: 'Sculptures',
                        checked: ''
                    },
                    {
                        field: 'Mosaic (10)',
                        checked: ''
                    },
                ]
            },
            {
                title: 'File Types',
                content: [
                    {
                        field: 'Image',
                        checked: 'checked'
                    },
                    {
                        field: 'Video (10)',
                        checked: ''
                    },
                ]
            },
            {
                title: 'Currencies',
                content: [
                    
                    {
                        field: 'ETH (10)',
                        checked: ''
                    },
                ]
            },
        ]
    )
  return (
    <div id="side-bar" className="side-bar style-3 item side">
        <div className="widget widget-filter style-1 mgbt-0">
            <div className="header-widget-filter">
                <h4 className="title-widget">Filter</h4>
            </div>
        </div>     
        <div className="divider"></div>    
        <div className="wrap-category">
            {
                dataCate.map((item,index)=> (
                    <div key={index} className="widget widget-category boder-bt">
                        <Accordion title={item.title} show={true}>
                            <form action="#">
                                {
                                    item.content.map((itemm , index) => (
                                        <div key={index}>
                                            <label>
                                                <span>{itemm.field}</span>
                                                <span className="pst-re">
                                                    <input type="checkbox" defaultChecked={itemm.checked} />
                                                    <span className="btn-checkbox"></span>
                                                </span>
                                            </label><br/>
                                        </div>
                                    ))
                                }                                            
                            </form>
                        </Accordion>
                    </div>
                ))
            }
            
        </div>
    </div>
  );
}

export default SideBar;