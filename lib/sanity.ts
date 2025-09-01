import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-28';

// Create the Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to get optimized image URL
export function getImageUrl(source: SanityImageSource, width?: number, height?: number) {
  let imageBuilder = urlFor(source);
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url();
}