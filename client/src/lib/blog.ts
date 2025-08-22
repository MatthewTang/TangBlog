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

function loadBlogPosts(): BlogPost[] {
  const modules = import.meta.glob('../blog/*.md', { eager: true, import: 'default', query: '?raw' });
  return Object.entries(modules).map(([path, content]) => {
    const slugMatch = path.match(/\/blog\/([^/]+)\.md$/);
    const slug = slugMatch ? slugMatch[1] : path;
    const { frontmatter, content: markdownContent } = parseFrontmatter(content as string);
    return {
      slug,
      ...frontmatter,
      content: markdownContent
    } as BlogPost;
  });
}

let cachedPosts: BlogPost[] | null = null;

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!cachedPosts) {
    cachedPosts = loadBlogPosts();
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
