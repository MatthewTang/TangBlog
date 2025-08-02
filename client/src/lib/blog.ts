export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

// In a real Gatsby setup, this would be handled by GraphQL and gatsby-transformer-remark
// For this implementation, we'll simulate the markdown processing
const blogPosts: BlogPost[] = [
  {
    slug: "mobile-app-tricks",
    title: "Mobile App Tricks",
    date: "13/06/2025",
    excerpt: "Want snappier mobile apps? Drawing from AssetBozz, I'll cover React Native hacks that boosted retention by 15%, like optimizing load times and user flows. Easy tweaks for better performance!",
    content: `# Mobile App Tricks

Want snappier mobile apps? Drawing from AssetBozz, I'll cover React Native hacks that boosted retention by 15%, like optimizing load times and user flows.

## Performance Optimization

Here are some key strategies I've learned:

- **Lazy Loading**: Only load components when needed
- **Image Optimization**: Use proper image formats and compression
- **Bundle Splitting**: Reduce initial load times
- **Memory Management**: Proper cleanup of listeners and timers

## User Flow Improvements

The key to retention is smooth user experience:

1. Minimize friction in onboarding
2. Provide clear visual feedback
3. Implement proper error handling
4. Use meaningful animations

These simple tweaks can make a huge difference in user satisfaction and retention.`
  },
  {
    slug: "testing-made-easy", 
    title: "Testing Made Easy",
    date: "13/06/2025",
    excerpt: "Struggling with database bugs? I'll share how I built the OceanBase tool with Python and SQL, spotting 12 sneaky issues and cutting testing time by 30%. Simple tips to make your testing smoother and smarter.",
    content: `# Testing Made Easy

Struggling with database bugs? I'll share how I built the OceanBase tool with Python and SQL, spotting 12 sneaky issues and cutting testing time by 30%.

## The Problem

Database testing was taking too long and missing critical bugs. We needed a better approach.

## The Solution

Built a comprehensive testing tool with:

- **Automated Test Generation**: Generate test cases from schema
- **Data Validation**: Ensure data integrity across operations
- **Performance Monitoring**: Track query performance
- **Bug Detection**: Identify edge cases and race conditions

## Results

- Found 12 critical bugs that would have made it to production
- Reduced testing time by 30%
- Improved team confidence in releases

Simple tips to make your testing smoother and smarter.`
  },
  {
    slug: "blockchain-ticketing-101",
    title: "Blockchain Ticketing 101", 
    date: "12/03/2022",
    excerpt: "Ever wondered how NFT tickets work? From my Moongate days, I'll walk you through setting up Ethereum smart contracts, handling user adoption (like that 20% bump!), and keeping it secure. It's a fun dive into blockchain basics!",
    content: `# Blockchain Ticketing 101

Ever wondered how NFT tickets work? From my Moongate days, I'll walk you through setting up Ethereum smart contracts, handling user adoption (like that 20% bump!), and keeping it secure.

## Why Blockchain for Ticketing?

Traditional ticketing has several problems:

- **Counterfeiting**: Easy to forge tickets
- **Scalping**: No control over resale
- **Transparency**: No clear ownership trail

## Smart Contract Basics

Here's what we built:

\`\`\`solidity
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
\`\`\`

## User Adoption Strategies

We saw a 20% adoption bump by:

1. **Simple Onboarding**: Abstract wallet complexity
2. **Clear Benefits**: Show why blockchain matters
3. **Seamless UX**: Make it feel like traditional ticketing
4. **Education**: Help users understand the technology

It's a fun dive into blockchain basics that can revolutionize event ticketing!`
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecentPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
