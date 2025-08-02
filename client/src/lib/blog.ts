export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}

interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: BlogPostFrontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterText, markdownContent] = match;
  const frontmatter: any = {};

  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  });

  return {
    frontmatter: frontmatter as BlogPostFrontmatter,
    content: markdownContent.trim()
  };
}

// For development, we'll use the actual markdown files from the content directory
async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    // Fetch all blog posts from the server
    const response = await fetch('/api/blog');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    // Fallback to hardcoded posts for development
    return [
      {
        slug: "mobile-app-tricks",
        title: "Mobile App Tricks",
        date: "2025-06-13",
        excerpt: "Want snappier mobile apps? Drawing from AssetBozz, I'll cover React Native hacks that boosted retention by 15%, like optimizing load times and user flows. Easy tweaks for better performance!",
        content: "# Mobile App Tricks\n\nWant snappier mobile apps? Drawing from AssetBozz, I'll cover React Native hacks that boosted retention by 15%, like optimizing load times and user flows.\n\n## Performance Optimization\n\nHere are some key strategies I've learned:\n\n- **Lazy Loading**: Only load components when needed\n- **Image Optimization**: Use proper image formats and compression\n- **Bundle Splitting**: Reduce initial load times\n- **Memory Management**: Proper cleanup of listeners and timers\n\n## User Flow Improvements\n\nThe key to retention is smooth user experience:\n\n1. Minimize friction in onboarding\n2. Provide clear visual feedback\n3. Implement proper error handling\n4. Use meaningful animations\n\nThese simple tweaks can make a huge difference in user satisfaction and retention."
      },
      {
        slug: "testing-made-easy", 
        title: "Testing Made Easy",
        date: "2025-06-13",
        excerpt: "Struggling with database bugs? I'll share how I built the OceanBase tool with Python and SQL, spotting 12 sneaky issues and cutting testing time by 30%. Simple tips to make your testing smoother and smarter.",
        content: "# Testing Made Easy\n\nStruggling with database bugs? I'll share how I built the OceanBase tool with Python and SQL, spotting 12 sneaky issues and cutting testing time by 30%.\n\n## The Problem\n\nDatabase testing was taking too long and missing critical bugs. We needed a better approach.\n\n## The Solution\n\nBuilt a comprehensive testing tool with:\n\n- **Automated Test Generation**: Generate test cases from schema\n- **Data Validation**: Ensure data integrity across operations\n- **Performance Monitoring**: Track query performance\n- **Bug Detection**: Identify edge cases and race conditions\n\n## Results\n\n- Found 12 critical bugs that would have made it to production\n- Reduced testing time by 30%\n- Improved team confidence in releases\n\nSimple tips to make your testing smoother and smarter."
      },
      {
        slug: "blockchain-ticketing-101",
        title: "Blockchain Ticketing 101", 
        date: "2022-03-12",
        excerpt: "Ever wondered how NFT tickets work? From my Moongate days, I'll walk you through setting up Ethereum smart contracts, handling user adoption (like that 20% bump!), and keeping it secure. It's a fun dive into blockchain basics!",
        content: "# Blockchain Ticketing 101\n\nEver wondered how NFT tickets work? From my Moongate days, I'll walk you through setting up Ethereum smart contracts, handling user adoption (like that 20% bump!), and keeping it secure.\n\n## Why Blockchain for Ticketing?\n\nTraditional ticketing has several problems:\n\n- **Counterfeiting**: Easy to forge tickets\n- **Scalping**: No control over resale\n- **Transparency**: No clear ownership trail\n\n## Smart Contract Basics\n\nHere's what we built:\n\n```solidity\ncontract TicketNFT {\n    mapping(uint256 => address) public ticketOwner;\n    mapping(uint256 => bool) public usedTickets;\n    \n    function mintTicket(address to, uint256 ticketId) public {\n        // Mint logic\n    }\n    \n    function useTicket(uint256 ticketId) public {\n        // Validation and usage logic\n    }\n}\n```\n\n## User Adoption Strategies\n\nWe saw a 20% adoption bump by:\n\n1. **Simple Onboarding**: Abstract wallet complexity\n2. **Clear Benefits**: Show why blockchain matters\n3. **Seamless UX**: Make it feel like traditional ticketing\n4. **Education**: Help users understand the technology\n\nIt's a fun dive into blockchain basics that can revolutionize event ticketing!"
      }
    ];
  }
}

let cachedPosts: BlogPost[] | null = null;

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!cachedPosts) {
    cachedPosts = await loadBlogPosts();
  }
  return cachedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}

export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}
