import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description of the blog post',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: {type: 'author'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Post',
      description: 'Mark this post as featured',
      initialValue: false,
    }),
    defineField({
      name: 'readTime',
      type: 'string',
      title: 'Read Time',
      description: 'Estimated read time (e.g., "5 min read")',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Content Sections',
      description: 'Add multiple sections to organize your content. Each section will appear in the table of contents.',
      of: [{
        type: 'section'
      }],
      validation: (rule) => rule.min(1).error('At least one section is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
