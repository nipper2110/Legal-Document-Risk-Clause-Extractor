import type { Language, RiskLevel } from '../api/analyze'

export interface Labels {
  overallRisk: string
  noneFlagged: string
  summary: string
  whyItMatters: string
  suggestion: string
  copy: string
  copied: string
  copyFailed: string
  exportPdf: string
  analyzeAnother: string
  all: string
  /** Short level name, e.g. "High". */
  level: Record<RiskLevel, string>
  /** Level with the word "risk", e.g. "High risk". */
  levelRisk: Record<RiskLevel, string>
  counts: (high: number, medium: number, low: number) => string
  pages: (n: number) => string
  omitted: (n: number) => string
  noClauses: string
  translating: string
}

export const LABELS: Record<Language, Labels> = {
  en: {
    overallRisk: 'Overall risk',
    noneFlagged: 'None flagged',
    summary: 'Summary',
    whyItMatters: 'Why it matters',
    suggestion: 'Suggestion',
    copy: 'Copy',
    copied: 'Copied ✓',
    copyFailed: 'Copy failed',
    exportPdf: 'Export as PDF',
    analyzeAnother: 'Analyze another',
    all: 'All',
    level: { High: 'High', Medium: 'Medium', Low: 'Low' },
    levelRisk: { High: 'High risk', Medium: 'Medium risk', Low: 'Low risk' },
    counts: (h, m, l) => `${h} high · ${m} medium · ${l} low`,
    pages: (n) => ` · ${n} page(s)`,
    omitted: (n) =>
      `${n} clause(s) omitted: their text could not be verified against the document.`,
    noClauses: 'No clauses to show.',
    translating: 'Translating…',
  },
  my: {
    overallRisk: 'စုစုပေါင်း အန္တရာယ်အဆင့်',
    noneFlagged: 'မတွေ့ပါ',
    summary: 'အနှစ်ချုပ်',
    whyItMatters: 'အရေးကြီးရခြင်း အကြောင်းရင်း',
    suggestion: 'အကြံပြုချက်',
    copy: 'ကူးယူရန်',
    copied: 'ကူးယူပြီး ✓',
    copyFailed: 'ကူးယူ၍ မရပါ',
    exportPdf: 'PDF အဖြစ် သိမ်းရန်',
    analyzeAnother: 'အခြားစာချုပ် စစ်ရန်',
    all: 'အားလုံး',
    level: { High: 'မြင့်', Medium: 'အလယ်အလတ်', Low: 'နိမ့်' },
    levelRisk: {
      High: 'အန္တရာယ် မြင့်',
      Medium: 'အန္တရာယ် အလယ်အလတ်',
      Low: 'အန္တရာယ် နိမ့်',
    },
    counts: (h, m, l) => `မြင့် ${h} · အလယ်အလတ် ${m} · နိမ့် ${l}`,
    pages: (n) => ` · စာမျက်နှာ ${n}`,
    omitted: (n) =>
      `စည်းကမ်းချက် ${n} ခုကို ဖယ်ထားသည်- စာတမ်းနှင့် တိုက်ဆိုင်စစ်ဆေး၍ မရပါ။`,
    noClauses: 'ပြသရန် စည်းကမ်းချက် မရှိပါ။',
    translating: 'ဘာသာပြန်နေသည်…',
  },
}

export const DISCLAIMER_MY =
  'ဤကိရိယာသည် ဥပဒေအကြံပေးမှု မဟုတ်ပါ။ ခွဲခြမ်းစိတ်ဖြာချက်ကို AI က ထုတ်ပေးထားခြင်းဖြစ်သဖြင့် အမှားများ ပါနိုင်ပါသည်။ စာချုပ်တစ်ခုခုကို လက်မှတ်မထိုးမီ သို့မဟုတ် အားကိုးမီ အရည်အချင်းပြည့်မီသော ရှေ့နေနှင့် တိုင်ပင်ပါ။'
