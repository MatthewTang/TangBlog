import type { Express } from "express";
import { createServer, type Server } from "http";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { storage } from "./storage";

interface BlogPost {
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
  tags?: string;
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

// Load all blog posts from markdown files
function loadBlogPosts(): BlogPost[] {
  const blogDir = join(process.cwd(), 'content', 'blog');
  
  try {
    const files = readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    return files.map(file => {
      const filePath = join(blogDir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      const { frontmatter, content } = parseFrontmatter(fileContent);
      const slug = file.replace('.md', '');
      
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        content,
        tags: frontmatter.tags ? frontmatter.tags.split(',').map((tag: string) => tag.trim()) : undefined
      };
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog API endpoints
  app.get('/api/blog', (req, res) => {
    try {
      const posts = loadBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to load blog posts' });
    }
  });

  app.get('/api/blog/:slug', (req, res) => {
    try {
      const posts = loadBlogPosts();
      const post = posts.find(p => p.slug === req.params.slug);
      
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to load blog post' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
