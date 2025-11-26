/**
 * Bid Service for Auctioneer
 * 
 * This file consumes the POST /api/auctions/{id}/bid endpoint from backend-api-service
 * When the backend adds a required paymentMethod parameter, this consumer will be affected
 * 
 * API Endpoint: /api/auctions/{id}/bid
 */

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000/api';

/**
 * Place a bid on an auction
 * @param {string} auctionId - The auction ID  
 * @param {object} bidData - Bid data { bidAmount, bidderId }
 * @returns {Promise} Response from API
 */
export const placeBid = async (auctionId, bidData) => {
  try {
    // Call to POST /api/auctions/{id}/bid endpoint
    // This will be detected by CodePulse AI as a consumer
    const response = await fetch(`${API_BASE_URL}/auctions/${auctionId}/bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bidAmount: bidData.bidAmount,
        bidderId: bidData.bidderId,
        // NOTE: After breaking change in backend-api-service,
        // this will need to include paymentMethod as query parameter
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to place bid: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
};

// Alternative using axios (if auctioneer uses axios)
import axios from 'axios';

export const placeBidWithAxios = async (auctionId, bidData) => {
  // This axios.post call will also be detected
  return await axios.post(
    `${API_BASE_URL}/auctions/${auctionId}/bid`,
    {
      bidAmount: bidData.bidAmount,
      bidderId: bidData.bidderId,
    }
  );
};

