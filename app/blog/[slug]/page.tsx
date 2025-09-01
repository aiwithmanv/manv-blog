import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import { SectionRenderer } from '@/components/section-components';

import { TableOfContents } from "@/components/table-of-contents";
import { MobileTableOfContents } from "@/components/mobile-toc";
import { AuthorCard } from "@/components/author-card";
import { ReadMoreSection } from "@/components/read-more-section";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HashScrollHandler } from "@/components/hash-scroll-handler";

interface PageProps {
  params: Promise<{ slug: string }>;
}



const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return <div>Page not found</div>;
  }

  // Handle Sanity post
  let sanityPost;
  
  try {
    sanityPost = await getPostBySlug(slug);
  } catch (error) {
    console.error('Error fetching Sanity post:', error);
    return <div>Post not found</div>;
  }
  
  if (!sanityPost) {
    return <div>Post not found</div>;
  }
  
  const date = new Date(sanityPost.publishedAt);
  const formattedDate = formatDate(date);
    
    return (
      <div className="min-h-screen bg-background relative">
        <HashScrollHandler />
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

        <div className="space-y-4 border-b border-border relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
              <Button variant="outline" asChild className="h-6 w-6">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="sr-only">Back to all articles</span>
                </Link>
              </Button>
              {sanityPost.tags && Array.isArray(sanityPost.tags) && sanityPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 text-muted-foreground">
                  {sanityPost.tags.map((tag: any, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                    >
                      {typeof tag === 'string' ? tag : tag?.title || 'Tag'}
                    </span>
                  ))}
                </div>
              )}
              <time className="font-medium text-muted-foreground">
                {formattedDate}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
              {sanityPost.title}
            </h1>

            {sanityPost.description && (
              <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
                {sanityPost.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
          <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
          <main className="w-full p-0 overflow-hidden">
            {sanityPost.thumbnail && (
              <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
                <Image
                  src={urlFor(sanityPost.thumbnail).width(1200).height(500).url()}
                  alt={sanityPost.thumbnail?.alt || sanityPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="p-6 lg:p-10">
              <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
                {sanityPost.sections && Array.isArray(sanityPost.sections) ? (
                  <SectionRenderer sections={sanityPost.sections} />
                ) : (
                  <p>Content not available</p>
                )}
              </div>
            </div>
            <div className="mt-10">
              {await ReadMoreSection({
                currentSlug: [sanityPost.slug.current],
                currentTags: sanityPost.tags || []
              })}
            </div>
          </main>

          <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
            <div className="sticky top-20 space-y-8">
              {sanityPost.author && (
                <div className="border border-border rounded-lg p-6 bg-card">
                  <div className="flex items-center gap-4">
                    {sanityPost.author.image && (
                      <Image
                        src={urlFor(sanityPost.author.image).width(60).height(60).url()}
                        alt={sanityPost.author.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{sanityPost.author.name}</h3>
                      {sanityPost.author.bio && typeof sanityPost.author.bio === 'string' && (
                        <p className="text-sm text-muted-foreground">{sanityPost.author.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="border border-border rounded-lg p-6 bg-card">
                <TableOfContents />
              </div>
            </div>
          </aside>
        </div>

        <MobileTableOfContents />
      </div>
    );
}
