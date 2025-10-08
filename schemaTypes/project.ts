// schemas/project.ts

import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Klantnaam / titel', type: 'string'}),
    defineField({name: 'tagline', title: 'Projectitel / tagline', type: 'string'}),
    defineField({
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Commercial', value: 'commercial'},
          {title: 'Corporate', value: 'corporate'},
          {title: 'Fiction', value: 'fiction'},
          {title: 'Social', value: 'social'},
        ],
        // layout: 'tags' // optioneel, kies wat je fijn vindt
      },
      validation: (Rule) => Rule.max(1).error('Kies maximaal 1 categorie'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL / AWS S3 video link',
      type: 'url',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL / AWS S3 thumbnail link',
      type: 'url',
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview URL / AWS S3 preview link',
      type: 'url',
    }),
    defineField({
      name: 'stills',
      title: 'Stills / AWS S3 stills link',
      type: 'array',
      of: [{type: 'url'}],
    }),

    // ---------- Review toggle + enkel review-object ----------
    defineField({
      name: 'hasReview',
      title: 'Heeft review?',
      type: 'boolean',
      initialValue: false,
      description: 'Schakel in om een review voor dit project toe te voegen.',
    }),

    defineField({
      name: 'review',
      title: 'Review',
      type: 'object',
      hidden: ({document}) => !document?.hasReview, // alleen tonen als toggle aan
      fields: [
        defineField({
          name: 'rating',
          title: 'Aantal sterren (1–5)',
          type: 'number',
          validation: (Rule) =>
            Rule.custom((v, ctx) =>
              ctx.document?.hasReview && v == null ? 'Geef het aantal sterren op.' : true,
            )
              .min(1)
              .max(5),
        }),
        defineField({
          name: 'reviewer',
          title: 'Naam reviewer',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((v, ctx) =>
              ctx.document?.hasReview && !v ? 'Vul de naam van de reviewer in.' : true,
            ),
        }),
        defineField({
          name: 'quote',
          title: 'Review',
          type: 'text',
          rows: 4,
          validation: (Rule) =>
            Rule.custom((v, ctx) =>
              ctx.document?.hasReview && !v ? 'Vul de review in.' : true,
            ).max(600),
        }),
        defineField({
          name: 'companyLogoUrl',
          title: 'Bedrijfslogo URL (S3/CloudFront)',
          type: 'url',
          description: 'HTTPS-link naar het logo in S3/CloudFront.',
          // optioneel: validation: (Rule) => Rule.uri({scheme: ['https']})
        }),
      ],
      preview: {
        select: {title: 'reviewer', subtitle: 'quote'},
        prepare({title, subtitle}) {
          return {title: title || 'Review', subtitle}
        },
      },
    }),
    // ---------------------------------------------------------

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
  ],
})
