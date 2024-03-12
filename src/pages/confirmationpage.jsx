import React from 'react';
import { useAccount } from 'wagmi';
import Footer from '../components/footer/Footer';
import 'react-tabs/style/react-tabs.css';
// import './styles/ConfirmationPageage.css';

function ConfirmationPage() {
  const { address } = useAccount();

  return (
    <div className="item-details">
      <style />
      <div className="tf-section">
        <div className="themesflat-container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div className="order_success">
              <h2>THANK YOU!</h2>
              <p className="message_order">
                Thanks for purchasing an artwork on Artrise.io Marketplace from your etherium wallet
                <strong>{address}</strong>
                {' '}
                In the meantime,
                explore the lastest artwork inspired by new trends, just head
                over to
                <br />
                <span>Artrise Marketplace</span>
              </p>
              <a href="/order/tracking">
                {' '}
                <button type="button">Order Tracking</button>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ConfirmationPage;
