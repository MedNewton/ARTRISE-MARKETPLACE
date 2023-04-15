import React from 'react';
import img1 from '../../../assets/images/box-item/img_cart_item.jpg'
import img2 from '../../../assets/images/box-item/img_cart_item2.jpg'
import img3 from '../../../assets/images/box-item/img_cart_item3.png'
import img4 from '../../../assets/images/box-item/img_cart_item4.jpg'
import img5 from '../../../assets/images/box-item/img_cart_item5.jpg'
import img6 from '../../../assets/images/box-item/img_cart_item6.jpg'
import img7 from '../../../assets/images/box-item/img_cart_item7.jpg'





const CardItem = () => {

    return (
        <section className="flat-cart-item">
            <div className="overlay"></div>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="wrap-cart flex">
                            <div className="cart_item">                                   
                                <div className="inner-cart">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">"A Windmill on a Polder Waterway, Known as ‘In the Month of July’, Paul Joseph Constantin Gabriël, c. 1889    carré   </a></div>
                                        <p>Mosaic</p>
                                    </div>
                                </div>
                                <div className="inner-cart">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">"De heilige Hiëronymus en de heilige Catharina van Alexandria, anoniem, anoniem, ca. 1480 -ca.   1490</a></div>
                                        <p>Mosaic</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cart_item style2">
                                <div className="inner-cart">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">A Golden Apple</a></div>
                                        <p>Statue</p>
                                    </div>   
                                    <div className="progress">
                                        <div className="progress-bar"></div>      
                                    </div>
                                </div>
                            </div>
                            <div className="cart_item">
                                <div className="inner-cart">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">"Five Prints of Flowers in Glass Vases, anonymous, after Jean Baptiste Monnoyer, 1688 - 1698       carré</a></div>
                                        <p>Mosaic</p>
                                    </div>
                                </div>
                                <div className="inner-cart">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">"Het melkmeisje, Johannes Vermeer, ca. 1660 carré</a></div>
                                        <p>Painting</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cart_item">
                                <div className="inner-cart mg-bt-30">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">"Het zieke kind, Gabriël Metsu, ca. 1664 - ca. 1666 (3)</a></div>
                                        <p>Painting</p>
                                    </div>
                                </div>
                                <div className="inner-cart">
                                    <div className="overlay"></div>
                                    <img src={img1} alt="Axies" />
                                    <div className="content">
                                        <div className="fs-16"><a href="/item-details-01">"Portret van Hortense de Beauharnais, koningin van Holland, Anne-Louis Girodet-Trioson, ca. 1805 - ca. 1809    carré</a></div>
                                        <p>Mosaic</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CardItem;
