import {defineType, defineArrayMember, defineField} from 'sanity'
import {ImageIcon, PlayIcon, DocumentIcon, BlockElementIcon} from '@sanity/icons'

export const sectionType = defineType({
  name: 'section',
  title: 'Content Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'This will appear in the table of contents',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Section Content',
      of: [
        // Rich text blocks
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
        // Images
        defineArrayMember({
          type: 'image',
          icon: ImageIcon,
          title: 'Image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (rule) => rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        }),
        // Video embeds
        defineArrayMember({
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          icon: PlayIcon,
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or direct video file URL',
              validation: (rule) => rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Video Title',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          preview: {
            select: {
              title: 'title',
              url: 'url',
            },
            prepare({title, url}) {
              return {
                title: title || 'Video Embed',
                subtitle: url,
                media: PlayIcon,
              }
            },
          },
        }),
        // File uploads (GIFs, videos, etc.)
        defineArrayMember({
          type: 'file',
          icon: DocumentIcon,
          title: 'File Upload (GIF/Video)',
          options: {
            accept: '.gif,.mp4,.webm,.mov,.avi,.mkv',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'File Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Section',
        media: BlockElementIcon,
      }
    },
  },
})