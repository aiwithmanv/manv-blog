import { Metadata } from "next";
import { getPostBySlug } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const ogUrl = `${siteConfig.url}/blog/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;
    const thumbnail = post.thumbnail ? urlFor(post.thumbnail).width(1200).height(630).url() : undefined;

    return {
      title: post.title,
      description: post.description,
      keywords: [
        post.title,
        ...(post.tags || []),
        "Blog",
        "Article",
        "Web Development",
        "Programming",
        "Technology",
        "Software Engineering",
      ],
      authors: [
        {
          name: post.author?.name || "Magic UI",
          url: siteConfig.url,
        },
      ],
      creator: post.author?.name || "Magic UI",
      publisher: "Magic UI",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        url: ogUrl,
        publishedTime: post.publishedAt,
        authors: [post.author?.name || "Magic UI"],
        tags: post.tags,
        images: [
          {
            url: thumbnail || ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [thumbnail || ogImage],
        creator: "@dillionverma",
        site: "@dillionverma",
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}
