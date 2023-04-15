import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { useAddress, useContract, useMintNFT, useMetamask } from "@thirdweb-dev/react";
import { useAccount } from 'wagmi'
import { ref, onValue, get, update, set, child } from "firebase/database";
import db from '../firebase';

const TraitForm = (tr, v) => {
    return (
        {
            trait_type: tr,
            trait_value: v
        }
    )
}

const CreateItem = () => {

    const { contract } = useContract('0x91FBfcDDa7FE1aD979C34dF707D2691FcD5663B0');
    const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);


    const { address, isConnected } = useAccount();
    const [isCreator, setIsCreator] = useState('');

    async function getCreatorStatus(){
        const ThisUserRef = ref(db, 'users/' + address);
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            setIsCreator(dt.creator)
        })
    }

    const connect = useMetamask();

    useEffect(()=>{
        getCreatorStatus();
        connect()
    },[])

    const adr = useAddress();

    

    async function mintingSingleNFT(){
        const metadata = {
            name: title,
            description: description,
            Image: media
        }

        console.log(metadata)
        console.log(address)
        if( isConnected && address && (isCreator == "yes")){
            try {
                const tx = await contract.erc721.mintTo(address,metadata);
            const rec = tx.receipt;
            
            } catch (error) {
                let errMsg = error.toString();
                if (errMsg.includes("requires a connected wallet")) {
                    Swal.fire({
                      icon: "error",
                      title: "Connect your wallet",
                      text: "Buying and bidding operations using cruptocurrencies\nrequire a connected wallet.",
                    });
                  } else if (errMsg.includes("user rejected transaction")) {
                    Swal.fire({
                      icon: "error",
                      title: "Rejected transaction",
                      text: "No worries, the transaction was rejected by the wallet owner.",
                    });
                  } else if (errMsg.includes("insufficient funds")) {
                    Swal.fire({
                      icon: "error",
                      title: "Insufficient funds",
                      text: "It seems that you don't have sufficient funds in your wallet to perform this action.\nPlease, change or top-up your wallet with Ether.",
                    });
                  }
            }
            
        }
        else if(!isConnected || !address || (isCreator == "no") || (isCreator == "pending")){
            Swal.fire({
                icon: "error",
                title: "Waiting for approval !",
                text: "Unfortunately, Your wallet address hasn\t been approved for minting on shared collection yet.\nContact support for further information.",
                confirmButtonText: "Let\'s go !"
              });
        }

    }

    const traitsList = [TraitForm("Property", "Value")];

    const [title, setTitle] = useState("Artwork title")
    const [description, setDescription] = useState()
    const [media, setMedia] = useState()
    const [mediaPreview, setMediaPreview] = useState(img1)
    const [traits, setTraits] = useState([TraitForm("Property", "Value")])


    function addTrait() {
        //traitsList.push(TraitForm("Property", "Value"));
        setTraits([...traits,TraitForm("Property", "Value")])
        console.log(traits)
    }

    function removeTrait(index){

        console.log(index)
        setTraits(traits.filter((value, i)=> i != index))
        console.log(traits)
    }

    return (
        <div className='create-item'>
            <HeaderStyle2 />

            <div className="tf-create-item tf-section">
                <div className="themesflat-container">

                    <div className="row ">
                        <div className="col-md-12" style={{ marginBottom: '5%', marginTop: '2%' }}>
                            <h2 className="tf-title style4 mg-bt-38 ourArtists">
                                Create an artwork</h2>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                            <h4 className="title-create-item">Preview</h4>
                            <div className="sc-card-product">
                                <div className="card-media">
                                    <Link to="/item-details-01"><img src={mediaPreview} alt="" /></Link>

                                </div>
                                <div className="card-title">
                                    <h5><Link to="/item-details-01">{title}</Link></h5>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-6 col-md-12 col-12">
                            <div className="form-create-item">
                                <form action="#">
                                    <h4 className="title-create-item">Upload file</h4>
                                    <label className="uploadFile">
                                        <span className="filename">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</span>
                                        <input type="file" className="inputfile form-control uploadNFTMediaBtn" name="file" onChange={(e) => { setMedia(e.target.files[0]); setMediaPreview(URL.createObjectURL(e.target.files[0])) }} />
                                    </label>
                                </form>
                                <div className="flat-tabs tab-create-item">
                                    <Tabs>


                                        <TabPanel>
                                            <form action="#">
                                                <h4 className="title-create-item">Title</h4>
                                                <input type="text" placeholder="Artwork Title" onChange={(e) => { setTitle(e.target.value) }} />

                                                <h4 className="title-create-item">Description</h4>
                                                <textarea placeholder="e.g. “This is a single NFT ...”" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                                <div className="row traitsWrapper">
                                                    <div className="traitsHeader">
                                                        <h5>properties</h5>
                                                        <div className="addTraitBtn" onClick={() => { addTrait() }} >+</div>
                                                    </div>
                                                    <div className="traitListWrapper">
                                                        {
                                                            traits.map((property, index)=>{
                                                                return(
                                                                    <div key={index} className='trait'>
                                                                        
                                                                        <div className="traitForm row">
                                                                            <div className="col-5">
                                                                            <input type="text" placeholder='Trait type' />
                                                                            </div>
                                                                            <div className="col-5">
                                                                            <input type="text" placeholder='Trait value' />
                                                                            </div>
                                                                            <div className="col-2">
                                                                            <div className="removeTraitBtn" onClick={()=>{removeTrait(index)}} >x</div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                                <div id='mintBtn' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close" onClick={()=>{mintingSingleNFT()}}>Mint to shared collection</div>
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

export default CreateItem;
