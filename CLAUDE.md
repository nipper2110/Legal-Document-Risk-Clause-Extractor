# Legal Document Risk & Clause Extractor

## Overview

Users upload contracts (PDF/DOCX). The backend extracts text, sends it to
Gemini, and returns clauses with risk levels (High/Medium/Low),
explanations, suggestions, and a summary.

## Structure

- client/ → Vite + React + TypeScript + Tailwind
- server/ → Express + TypeScript (run with tsx)

## Rules

- TypeScript strict mode everywhere. No `any`.
- GEMINI_API_KEY lives only in server/.env. Never expose it to the client.
- Use multer memoryStorage. Never write uploaded files to disk.
- Accept only PDF and DOCX, max 10MB.
- Use Gemini structured output (responseSchema) and validate with zod.
- The AI must quote clause text exactly from the document — never invent text.
- Show "This tool does not provide legal advice" on every results page.
- Business logic goes in server/src/services, not in routes.
- One React component per file. Keep components under ~150 lines.
- Before saying a task is done, run lint and build in both client and server.

## Commands

- client: cd client && npm run dev (port 5173)
- server: cd server && npm run dev (port 3001)
