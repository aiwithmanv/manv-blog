import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

// Utility function to generate slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Component for rendering video embeds
export const VideoEmbed = ({ value }: { value: any }) => {
  const { url, title, caption } = value;
  
  // Check if it's a YouTube URL
  const isYouTube = url?.includes('youtube.com') || url?.includes('youtu.be');
  const isVimeo = url?.includes('vimeo.com');
  
  if (isYouTube) {
    // Extract YouTube video ID
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    
    if (videoId) {
      return (
        <div className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
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
  
  if (isVimeo) {
    // Extract Vimeo video ID
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    
    if (videoId) {
      return (
        <div className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://player.vimeo.com/video/${videoId}`}
              title={title || 'Vimeo video'}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
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
  
  // For direct video URLs
  return (
    <div className="my-8">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
        <video
          src={url}
          controls
          className="w-full h-full object-contain"
          title={title}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
};

// Component for rendering file uploads (GIFs, videos, etc.)
export const FileUpload = ({ value }: { value: any }) => {
  const { asset, title, description } = value;
  
  if (!asset) return null;
  
  const fileUrl = asset.url;
  const fileName = asset.originalFilename || title || 'File';
  const fileExtension = asset.extension?.toLowerCase();
  
  // Handle GIFs as images
  if (fileExtension === 'gif') {
    return (
      <div className="my-8">
        <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
          <img
            src={fileUrl}
            alt={title || 'GIF'}
            className="w-full h-auto"
          />
        </div>
        {(title || description) && (
          <div className="mt-2 text-center">
            {title && (
              <p className="font-medium text-sm">{title}</p>
            )}
            {description && (
              <p className="text-sm text-muted-foreground italic">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  
  // Handle video files
  if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(fileExtension || '')) {
    return (
      <div className="my-8">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          <video
            src={fileUrl}
            controls
            className="w-full h-full object-contain"
            title={title}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        {(title || description) && (
          <div className="mt-2 text-center">
            {title && (
              <p className="font-medium text-sm">{title}</p>
            )}
            {description && (
              <p className="text-sm text-muted-foreground italic">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  
  // For other file types, show a download link
  return (
    <div className="my-8 p-4 border border-border rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{title || fileName}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <a
          href={fileUrl}
          download={fileName}
          className="flex-shrink-0 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Download
        </a>
      </div>
    </div>
  );
};

// Custom image component for PortableText
export const CustomImage = ({ value }: { value: any }) => {
  const { alt, asset } = value;
  
  if (!asset) return null;
  
  return (
    <div className="my-8">
      <div className="relative w-full rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={alt || 'Image'}
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      {alt && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {alt}
        </p>
      )}
    </div>
  );
};

// PortableText components configuration
export const portableTextComponents = {
  types: {
    image: CustomImage,
    videoEmbed: VideoEmbed,
    file: FileUpload,
  },
  block: {
    // Handle different heading levels with IDs for table of contents
    h1: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const id = generateSlug(text);
      return <h1 id={id} className="text-4xl font-bold mt-8 mb-4">{children}</h1>;
    },
    h2: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const id = generateSlug(text);
      return <h2 id={id} className="text-3xl font-semibold mt-6 mb-3">{children}</h2>;
    },
    h3: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const id = generateSlug(text);
      return <h3 id={id} className="text-2xl font-semibold mt-5 mb-2">{children}</h3>;
    },
    h4: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const id = generateSlug(text);
      return <h4 id={id} className="text-xl font-semibold mt-4 mb-2">{children}</h4>;
    },
    h5: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const id = generateSlug(text);
      return <h5 id={id} className="text-lg font-semibold mt-3 mb-2">{children}</h5>;
    },
    h6: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join('') : children;
      const id = generateSlug(text);
      return <h6 id={id} className="text-base font-semibold mt-2 mb-1">{children}</h6>;
    },
    // Handle normal paragraphs
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    // Handle blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Handle bullet lists
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    // Handle numbered lists
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    // Handle list items
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
  marks: {
    // Handle links
    link: (props: any) => {
      const { children, value } = props;
      const href = value?.href;
      if (!href) return <>{children}</>;
      
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
    // Handle bold text
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    // Handle italic text
    em: ({ children }: any) => <em className="italic">{children}</em>,
    // Handle code
    code: ({ children }: any) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
  },
};