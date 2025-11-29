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
      name: 'description',
      title: 'Omschrijving voor de diensten pagina',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'descriptionPage',
      title: 'Omschrijving voor de dienst zelf',
      type: 'array',
      of: [{type: 'block'}],

      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'photoUrl',
      title: 'Photo URL / AWS S3 photo link',
      type: 'url',
    }),
  ],
})
