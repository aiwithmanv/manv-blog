import React from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

// Utility function to generate slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Custom Image component for Sanity images
const CustomImage = ({ value }: { value: any }) => {
  if (!value?.asset) {
    return null;
  }

  return (
    <div className="my-8">
      <Image
        src={urlFor(value).width(800).height(600).url()}
        alt={value.alt || 'Blog image'}
        width={800}
        height={600}
        className="rounded-lg object-cover w-full"
      />
      {value.caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {value.caption}
        </p>
      )}
    </div>
  );
};

// Video Embed component
const VideoEmbed = ({ value }: { value: any }) => {
  const { url, title, caption } = value;

  // YouTube embed
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    
    if (videoId) {
      return (
        <div className="my-8">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
          {caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center italic">
              {caption}
            </p>
          )}
        </div>
      );
    }
  }

  // Vimeo embed
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    
    if (videoId) {
      return (
        <div className="my-8">
          <div className="aspect-video">
            <iframe
              src={`https://player.vimeo.com/video/${videoId}`}
              title={title || 'Vimeo video'}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
          {caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center italic">
              {caption}
            </p>
          )}
        </div>
      );
    }
  }

  // Direct video file
  return (
    <div className="my-8">
      <video
        src={url}
        controls
        className="w-full rounded-lg"
        title={title || 'Video'}
      />
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
};

// File Upload component (for GIFs and other files)
const FileUpload = ({ value }: { value: any }) => {
  if (!value?.asset) {
    return null;
  }

  const fileUrl = value.asset.url;
  const fileName = value.title || value.asset.originalFilename || 'File';
  const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

  // Handle GIFs as images
  if (fileExtension === 'gif') {
    return (
      <div className="my-8">
        <Image
          src={fileUrl}
          alt={fileName}
          width={600}
          height={400}
          className="rounded-lg object-cover w-full"
          unoptimized // Important for GIFs to maintain animation
        />
        {value.description && (
          <p className="text-sm text-muted-foreground mt-2 text-center italic">
            {value.description}
          </p>
        )}
      </div>
    );
  }

  // Handle video files
  if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(fileExtension || '')) {
    return (
      <div className="my-8">
        <video
          src={fileUrl}
          controls
          className="w-full rounded-lg"
          title={fileName}
        />
        {value.description && (
          <p className="text-sm text-muted-foreground mt-2 text-center italic">
            {value.description}
          </p>
        )}
      </div>
    );
  }

  // Handle other files as download links
  return (
    <div className="my-8 p-4 border border-border rounded-lg">
      <a
        href={fileUrl}
        download
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <span>📎</span>
        <span>{fileName}</span>
      </a>
      {value.description && (
        <p className="text-sm text-muted-foreground mt-2">
          {value.description}
        </p>
      )}
    </div>
  );
};

// Portable Text components for section content
export const sectionPortableTextComponents: PortableTextComponents = {
  types: {
    image: CustomImage,
    videoEmbed: VideoEmbed,
    file: FileUpload,
  },
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h3: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const id = generateSlug(text);
      return (
        <h3 id={id} className="text-xl font-semibold mt-8 mb-4 scroll-mt-8">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const id = generateSlug(text);
      return (
        <h4 id={id} className="text-lg font-semibold mt-6 mb-3 scroll-mt-8">
          {children}
        </h4>
      );
    },
    h5: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const id = generateSlug(text);
      return (
        <h5 id={id} className="text-base font-semibold mt-4 mb-2 scroll-mt-8">
          {children}
        </h5>
      );
    },
    h6: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const id = generateSlug(text);
      return (
        <h6 id={id} className="text-sm font-semibold mt-4 mb-2 scroll-mt-8">
          {children}
        </h6>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

// Section renderer component
export const SectionRenderer = ({ sections }: { sections: any[] }) => {
  if (!sections || !Array.isArray(sections)) {
    return <p>No content available</p>;
  }

  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        const sectionId = generateSlug(section.title);
        
        return (
          <section key={index} className="scroll-mt-8">
            <h2 id={sectionId} className="text-2xl font-semibold mb-6 scroll-mt-8">
              {section.title}
            </h2>
            {section.content && Array.isArray(section.content) && (
              <div className="prose dark:prose-invert max-w-none">
                <PortableText 
                  value={section.content} 
                  components={sectionPortableTextComponents}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};