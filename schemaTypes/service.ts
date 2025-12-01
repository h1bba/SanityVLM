import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Diensten',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-') // spaties → -
            .replace(/[^a-z0-9-]/g, '') // rare tekens weg
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Omschrijving voor de diensten pagina',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'descriptionPage',
      title: 'Omschrijving voor de dienst zelf',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'photos',
      title: 'Stills / AWS S3 stills link',
      type: 'array',
      of: [{type: 'url'}],
    }),
  ],
})
