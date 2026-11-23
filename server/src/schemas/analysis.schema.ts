import { Type, type Schema } from '@google/genai'
import { z } from 'zod'

export const RISK_LEVELS = ['High', 'Medium', 'Low'] as const

export const clauseSchema = z.object({
  clauseType: z.string().min(1),
  text: z.string().min(1),
  riskLevel: z.enum(RISK_LEVELS),
  explanation: z.string().min(1),
  suggestion: z.string().min(1),
})

export const analysisSchema = z.object({
  summary: z.string().min(1),
  clauses: z.array(clauseSchema),
})

export type Clause = z.infer<typeof clauseSchema>
export type Analysis = z.infer<typeof analysisSchema>

/** Gemini responseSchema; mirrors the zod schema above. */
export const geminiResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A short plain-language summary of the whole document.',
    },
    clauses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clauseType: {
            type: Type.STRING,
            description:
              'Short title of the clause type (such as termination, liability or payment), written in the requested output language.',
          },
          text: {
            type: Type.STRING,
            description:
              'The clause quoted EXACTLY, character for character, from the document.',
          },
          riskLevel: { type: Type.STRING, enum: [...RISK_LEVELS] },
          explanation: {
            type: Type.STRING,
            description: 'Why this clause carries this level of risk.',
          },
          suggestion: {
            type: Type.STRING,
            description: 'How the reader could negotiate or mitigate the risk.',
          },
        },
        required: ['clauseType', 'text', 'riskLevel', 'explanation', 'suggestion'],
        propertyOrdering: [
          'clauseType',
          'text',
          'riskLevel',
          'explanation',
          'suggestion',
        ],
      },
    },
  },
  required: ['summary', 'clauses'],
  propertyOrdering: ['summary', 'clauses'],
}

export const LANGUAGES = ['en', 'my'] as const
export const languageSchema = z.enum(LANGUAGES)
export type Language = z.infer<typeof languageSchema>

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  my: 'Burmese (the Myanmar language, written in Myanmar script)',
}

const localizedClauseSchema = z.object({
  clauseType: z.string().min(1).max(500),
  explanation: z.string().min(1).max(5000),
  suggestion: z.string().min(1).max(5000),
})

/** The AI-written (translatable) parts of an analysis; quotes are excluded. */
export const localizedSchema = z.object({
  summary: z.string().min(1).max(20000),
  clauses: z.array(localizedClauseSchema).max(200),
})
export type Localized = z.infer<typeof localizedSchema>

export const translateRequestSchema = localizedSchema.extend({
  language: languageSchema,
})

export const geminiLocalizedSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    clauses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clauseType: { type: Type.STRING },
          explanation: { type: Type.STRING },
          suggestion: { type: Type.STRING },
        },
        required: ['clauseType', 'explanation', 'suggestion'],
        propertyOrdering: ['clauseType', 'explanation', 'suggestion'],
      },
    },
  },
  required: ['summary', 'clauses'],
  propertyOrdering: ['summary', 'clauses'],
}
