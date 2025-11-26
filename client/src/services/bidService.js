/**
 * Bid Service - Places bids on auctions
 * Consumes: POST /api/auctions/{id}/bid from backend-api-service
 * 
 * This file makes auctioneer a consumer of the bid endpoint.
 * When backend adds required paymentMethod parameter, this will be detected as affected.
 */

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000/api';

/**
 * Place a bid on an auction
 * @param {string} auctionId - The auction ID
 * @param {object} bidData - { bidAmount, bidderId }
 */
export const placeBid = async (auctionId, bidData) => {
  // This fetch call contains the API path /api/auctions/{id}/bid
  // CodePulse AI will detect this as a consumer
  const response = await fetch(`${API_BASE_URL}/auctions/${auctionId}/bid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bidAmount: bidData.bidAmount,
      bidderId: bidData.bidderId,
    })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to place bid: ${response.statusText}`);
  }
  
  return await response.json();
};
