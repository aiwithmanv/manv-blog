import { Suspense } from "react";
import Image from "next/image";
import { BlogCard } from "@/components/blog-card";
import { TagFilter } from "@/components/tag-filter";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { getAllPosts } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import NewsletterSubscription from "@/components/newsletter-subscription";
import AboutSection from "@/components/about-section";
import { AnimatedShinyTextDemo } from "@/components/magicui/animated-shiny-text";

interface BlogData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  // Get Sanity posts
  let allPages: BlogPage[] = [];
  try {
    const sanityData = await getAllPosts();
    allPages = sanityData.map(post => ({
      url: `/blog/${post.slug}`,
      data: {
        title: post.title,
        description: post.description || '',
        date: post.publishedAt,
        tags: post.tags || [],
        featured: post.featured || false,
        readTime: post.readTime || '5 min read',
        author: post.author?.name || 'Anonymous',
        authorImage: post.author?.image ? urlFor(post.author.image).width(100).height(100).url() : undefined,
        thumbnail: post.thumbnail ? urlFor(post.thumbnail).width(600).height(400).url() : undefined,
      }
    }));
  } catch (error) {
    console.log('Sanity posts not available:', error);
  }
  const sortedBlogs = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredBlogs =
    selectedTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.data.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = sortedBlogs.length;
    } else {
      acc[tag] = sortedBlogs.filter((blog) =>
        blog.data.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Home Section */}
      <section id="home">
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>
      <div className="border-b border-border flex flex-col gap-6 min-h-[500px] justify-center relative z-10 bg-gradient-to-b from-purple-100 to-background dark:from-purple-900/30 dark:to-background/95">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 py-10">
            <div className="flex flex-col gap-1 md:w-1/2 text-center md:text-left md:px-6">
              <div className="flex flex-col items-center md:items-start -mb-2 pt-8">
                <AnimatedShinyTextDemo />
              </div>
              <h1 className="minecraft-font font-bold text-5xl md:text-5xl lg:text-7xl tracking-tight mb-4 whitespace-nowrap">
                AI with Manv
              </h1>
              <div className="max-w-md mx-auto md:mx-0 md:pl-0">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-1 whitespace-nowrap">Subscribe to Our Newsletter</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-0">
                  Stay updated with the latest insights on AI for parents and teachers. 
                  No spam, just valuable content delivered to your inbox.
                </p>
                <NewsletterSubscription 
                  className="bg-transparent p-0 mt-1 md:pl-0" 
                  showTitle={false} 
                  showDescription={false} 
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col items-center md:items-end gap-4">
              <Image 
                src="/manv.png" 
                alt="Manvendra Singh" 
                width={320}
                height={320}
                className="w-72 h-72 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-full shadow-xl"
              />
              <div className="flex gap-5 mt-6 md:mr-12 lg:mr-0 lg:flex lg:justify-center lg:w-full lg:translate-x-13">
                <a 
                  href="https://x.com/AIWithManv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  <span className="sr-only">X</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/manvendra-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a 
                  href="https://www.instagram.com/aiwithmanv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="blog" className="max-w-7xl mx-auto w-full px-6 lg:px-0 mt-16">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">My AI Prediction</h2>
        <p className="text-muted-foreground text-lg mb-8">Here&apos;s what I believe the future holds for artificial intelligence</p>
        {allTags.length > 0 && (
          <div className="w-full mb-8">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
        <Suspense fallback={<div>Loading articles...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredBlogs.length < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {filteredBlogs.map((blog) => {
              const date = new Date(blog.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blog.url}
                  url={blog.url}
                  title={blog.data.title}
                  description={blog.data.description}
                  date={formattedDate}
                  thumbnail={blog.data.thumbnail}
                  showRightBorder={filteredBlogs.length < 3}
                />
              );
            })}
          </div>
        </Suspense>
      </div>
        </section>

      <AboutSection />
      
      <NewsletterSubscription />
    </div>
  );
}
