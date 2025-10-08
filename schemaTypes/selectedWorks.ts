// /sanity/schemas/selectedWorks.ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'selectedWorks',
  title: 'Selected Works',
  type: 'document',
  // Maak ‘m singleton in je desk structure, of gebruik presentation plugin
  fields: [
    defineField({
      name: 'items',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'project'}],
          options: {disableNew: true},
        }),
      ],
    }),
  ],
})
