import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, PlayIcon, DocumentIcon} from '@sanity/icons'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    // Video embed support
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
    // File upload support (for GIFs, videos, etc.)
    defineArrayMember({
      type: 'file',
      icon: DocumentIcon,
      title: 'File Upload',
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
})
