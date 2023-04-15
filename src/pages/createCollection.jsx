import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import img1 from '../assets/images/box-item/image-box-6.jpg'
import avt from '../assets/images/avatar/avt-9.jpg'
import Swal from 'sweetalert2';
import { useAddress, useContract, useMintNFT, useMetamask, useConnect } from "@thirdweb-dev/react";
import { useSDK } from '@thirdweb-dev/react';
import { useAccount } from 'wagmi'

const CreateCollection = () => {

    const { contract } = useContract('0x91FBfcDDa7FE1aD979C34dF707D2691FcD5663B0');
    const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);

    const sdk = useSDK();


    const connect = useMetamask();

    useEffect(()=>{
        connect()
    },[])

    const adr = useAddress();


    const {address, isConnected} = useAccount();

    function checkDeployMetadataError(){
        connect();
        let errorsExist;
        if(!title || (title == "") || (title == " ") || (title.length < 2)){
            Swal.fire({
                icon: "error",
                title: "Collection name error !",
                text: "The collection name cna\'t be empty.",
            });  
            errorsExist = true; 
        }else if(!symbol || (symbol == "") || (symbol == " ")){
            Swal.fire({
                icon: "error",
                title: "Collection symbol error !",
                text: "The collection symbol cna\'t be empty.",
            });  
            errorsExist = true; 
        }else if(!royaltiesRecipient || (royaltiesRecipient == "") || (royaltiesRecipient == " ")){
            Swal.fire({
                icon: "error",
                title: "Royalties recipient error !",
                text: "The royalties recipient address cna\'t be empty.",
            });  
            errorsExist = true; 
        }else if(!royaltiesPercentage || (royaltiesPercentage == "") || (royaltiesPercentage == " ")){
            Swal.fire({
                icon: "error",
                title: "Royalties percentage error !",
                text: "The royalties percentage cna\'t be empty.",
            });  
            errorsExist = true; 
        }else if (!isConnected || !adr){
            Swal.fire({
                icon: "error",
                title: "No connected wallet !",
                text: "You need to connect a wallet in order to deploy the collection smart contrat.",
            });  
            errorsExist = true; 
        }else{
            errorsExist = false;
        }
        
        return errorsExist;
        
    }

    async function deployNFTCollection(){

        connect();
        let metadataErrors = checkDeployMetadataError();

        if(metadataErrors == false){
            await sdk.deployer.deployNFTCollection({
                name: title,
                description: description,
                symbol: symbol,
                image: URL.createObjectURL(media),
                primary_sale_recipient: "0x18C41549ee05F893B5eA6ede6f8dccC1a9C16f44",
                platform_fee_recipient: "0x18C41549ee05F893B5eA6ede6f8dccC1a9C16f44",
                platform_fee_basis_points: 15,
                fee_recipient: royaltiesRecipient,
                seller_fee_basis_points: Number(royaltiesPercentage),
            })
        }

        //await sdk.deployer.deployNFTCollection()
    }
    
    async function mintingSingleNFT() {
        /*const metadata = {
            name: title,
            description: description,
            Image: media
        }

        console.log(metadata)
        console.log(address)
        if(address){
            const tx = await contract.erc721.mintTo(address,metadata);
            const rec = tx.receipt;
        }*/
        Swal.fire({
            icon: "error",
            title: "Waiting for approval !",
            text: "Unfortunately, Your wallet address hasn\t been approved for minting on shared collection yet.\nContact support for further information.",
            confirmButtonText: "Let\'s go !"
        });

    }


    const [title, setTitle] = useState("Collection name")
    const [symbol, setSymbol] = useState("")
    const [description, setDescription] = useState()
    const [media, setMedia] = useState()
    const [mediaPreview, setMediaPreview] = useState(img1)
    const [primarySalesRecipient, setPrimarySalesRecipient] = useState()
    const [royaltiesRecipient, setRoyaltiesRecipient] = useState()
    const [royaltiesPercentage, setRoyaltiesPercentage] = useState()






    return (
        <div className='create-item'>
            <HeaderStyle2 />

            <div className="tf-create-item tf-section">
                <div className="themesflat-container">

                    <div className="row " style={{ padding: "0px 3%" }}>
                        <div className="col-md-12" style={{ marginBottom: '5%', marginTop: '2%' }}>
                            <h2 className="tf-title style4 mg-bt-38 ourArtists">
                                Create a collection</h2>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                            <div className="sc-card-product">
                                <div className="card-media collectionCoverPreview">
                                    <img src={mediaPreview} alt="" />

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                            <div className="form-create-item">
                                <form action="#">
                                    <h4 className="title-create-item">Upload cover picture</h4>
                                    <label className="uploadFile">
                                        <span className="filename">PNG, JPG, WEBP or AVIF. Max 200mb.</span>
                                        <input type="file" className="inputfile form-control uploadNFTMediaBtn" name="file" onChange={(e) => { setMedia(e.target.files[0]); setMediaPreview(URL.createObjectURL(e.target.files[0])) }} />
                                    </label>
                                </form>
                                <div className="flat-tabs tab-create-item">
                                    <Tabs>


                                        <TabPanel>
                                            <form action="#">
                                                <h4 className="title-create-item">Name</h4>
                                                <input type="text" placeholder="Collection name" onChange={(e) => { setTitle(e.target.value) }} />

                                                <h4 className="title-create-item">Symbol</h4>
                                                <input type="text" placeholder="Collection symbol" onChange={(e) => { setSymbol(e.target.value) }} />

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is a single NFT ...”" onChange={(e) => { setDescription(e.target.value) }}></textarea>

                                                <div className="row">
                                                    <div className="col-8">
                                                        <h4 className="title-create-item">Royalties recipient address</h4>
                                                        <input type="text" placeholder="The address that will recieve royalties on secondary sales." onChange={(e) => { setRoyaltiesRecipient(e.target.value) }} />
                                                    </div>
                                                    <div className="col-4">
                                                        <h4 className="title-create-item">Royalties percentage</h4>
                                                        <input type="number" placeholder="Percentage of royalties on every secondary sale" className='percentageInput' onChange={(e) => { setRoyaltiesPercentage(e.target.value) }} />
                                                    </div>
                                                </div>

                                                <div id='mintBtn' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close" onClick={() => { deployNFTCollection() }}>Deploy and create collection</div>
                                            </form>
                                        </TabPanel>
                                        <TabPanel>
                                            <form action="#">
                                                <h4 className="title-create-item">Minimum bid</h4>
                                                <input type="text" placeholder="enter minimum bid" />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5 className="title-create-item">Starting date</h5>
                                                        <input type="date" name="bid_starting_date" id="bid_starting_date" className="form-control" min="1997-01-01" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4 className="title-create-item">Expiration date</h4>
                                                        <input type="date" name="bid_expiration_date" id="bid_expiration_date" className="form-control" />
                                                    </div>
                                                </div>

                                                <h4 className="title-create-item">Title</h4>
                                                <input type="text" placeholder="Item Name" />

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is very limited item”"></textarea>
                                            </form>
                                        </TabPanel>
                                        <TabPanel>
                                            <form action="#">
                                                <h4 className="title-create-item">Price</h4>
                                                <input type="text" placeholder="Enter price for one item (ETH)" />

                                                <h4 className="title-create-item">Minimum bid</h4>
                                                <input type="text" placeholder="enter minimum bid" />

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5 className="title-create-item">Starting date</h5>
                                                        <input type="date" name="bid_starting_date" id="bid_starting_date2" className="form-control" min="1997-01-01" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4 className="title-create-item">Expiration date</h4>
                                                        <input type="date" name="bid_expiration_date" id="bid_expiration_date2" className="form-control" />
                                                    </div>
                                                </div>

                                                <h4 className="title-create-item">Title</h4>
                                                <input type="text" placeholder="Item Name" />

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is very limited item”"></textarea>
                                            </form>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateCollection;
