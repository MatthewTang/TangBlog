---
title: "Blockchain Ticketing 101"
date: "2022-03-12"
excerpt: "Ever wondered how NFT tickets work? From my Moongate days, I'll walk you through setting up Ethereum smart contracts, handling user adoption (like that 20% bump!), and keeping it secure. It's a fun dive into blockchain basics!"
---

# Blockchain Ticketing 101

Ever wondered how NFT tickets work? From my Moongate days, I'll walk you through setting up Ethereum smart contracts, handling user adoption (like that 20% bump!), and keeping it secure.

## Why Blockchain for Ticketing?

Traditional ticketing has several problems:

- **Counterfeiting**: Easy to forge tickets
- **Scalping**: No control over resale
- **Transparency**: No clear ownership trail

## Smart Contract Basics

Here's what we built:

```solidity
contract TicketNFT {
    mapping(uint256 => address) public ticketOwner;
    mapping(uint256 => bool) public usedTickets;
    
    function mintTicket(address to, uint256 ticketId) public {
        // Mint logic
    }
    
    function useTicket(uint256 ticketId) public {
        // Validation and usage logic
    }
}
