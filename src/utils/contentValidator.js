const BAD_WORDS = [
  'fuck', 'fucking', 'fucked', 'fucker', 'fck', 'fuk',
  'shit', 'shitting', 'shitty', 'shyt',
  'bitch', 'bitching', 'bitches', 'bitc',
  'ass', 'asshole', 'assholes', 'asses',
  'damn', 'damned', 'damnit',
  'hell', 'hellish',
  'crap', 'crappy',
  'dick', 'dicks', 'dickhead',
  'pussy', 'pussies', 'puss',
  'cock', 'cocks', 'cockhead',
  'whore', 'whores',
  'slut', 'sluts', 'slutty',
  'bastard', 'bastards',
  'cunt', 'cunts',
  'nigga', 'nigger', 'niggas', 'niggers',
  'faggot', 'faggots', 'fag', 'fags',
  'retard', 'retards', 'retarded',
  'spastic', 'spastics',
  'moron', 'morons', 'idiot', 'idiots',
  'dumb', 'dumbass',
  'stupid', 'stupido',
  'hate', 'hatred',
  'kill', 'kills', 'killing', 'murder', 'murders', 'murdering',
  'rape', 'rapist', 'rapists', 'raping',
  'terrorist', 'terrorists', 'terrorism',
  'child porn', 'childporn', 'pedophile', 'pedophiles',
  'incest', 'incestuous',
  'suicide', 'suicidal', 'kill yourself',
  'bomb', 'bombs', 'bombing', 'explosive',
  'weapon', 'weapons', 'gun', 'guns',
  'hitler', 'nazi',
  'isis', 'al qaeda', 'taliban',
  'spam', 'scam', 'scammer', 'fraud',
  'fake', 'fake account', 'bot',
  'hack', 'hacker', 'hacking', 'crack', 'cracker',
  'virus', 'malware', 'trojan',
  'xxx', 'porn', 'porno', 'pornography', 'sex',
  'nude', 'naked', 'nsfw',
  'viagra', 'cialis', 'penis', 'breast',
  'lottery', 'winner', 'congratulations you won',
  'click here', 'free money', 'make money fast',
  'guaranteed', 'no risk', 'act now',
  'limited time', 'offer expires',
  'lose weight', 'weight loss',
  'enlarge', 'penis enlargement',
  'cheap', 'discount', 'discounted',
  'cialis', 'levitra', 'kamagra',
  'buy now', 'order now', 'best price',
  '100%', '100 percent',
  'miracle', 'amazing', 'incredible',
  'refund', 'money back', 'guarantee'
];

const SPAM_PATTERNS = [
  /(.)\1{5,}/i,
  /^[a-zA-Z0-9\s]{1,3}$/,
  /^[qwertyuiopasdfghjklzxcvbnm]{5,}$/i,
  /^\d+$/,
  /[A-Z]{20,}/,
  /\b(free|buy|click|order|limited|offer|discount|prize|winner|lottery|win|guarantee|money|make cash)\b.{0,5}\b(free|buy|click|order|limited|offer|discount|prize|winner|lottery|win|guarantee|money|make cash)\b/i,
  /(?:free|cheap|discount|best|top|great)\s+(?:money|cash|prize|offer|deal)/i,
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
  /(?:https?:\/\/|www\.)/i,
  /\b\w{1,2}\b.{0,3}\b\w{1,2}\b.{0,3}\b\w{1,2}\b/i,
  /^[a-zA-Z]{1,3}\d{3,}[a-zA-Z]{0,3}$/,
  /(.)\1{3,}(.)\2{3,}/,
  /\b(test|testing|tested|qwerty|asdf|zxcv|mouse|keyboard|screen|monitor)\b/i,
  /^\s*[\d\W]+\s*$/,
  /\b(mmm+|aaa+|eee+|ooo+|uuu+|iii+)\b/i,
  /^[^a-zA-Z]*$/,
  /[a-z]{30,}/i,
  /\bfrom:.*@.*\b/i,
  /\bsubject:.*\b/i,
  /\$\d+[\d,]*|\d+[\d,]*\$/,
  /100%\s*(free|guaranteed|working)/i,
  /\$\s*[\d,]+/,
  /credit card|card number|cvv|expiry date/i,
  /bank transfer|western union|moneygram/i,
  /nigerian|prince|inheritance|millions/i,
  /(?:work from home|home based business|mlm|network marketing)\b/i,
  /\b(bitcoin|cryptocurrency|crypto|btc|eth)\b/i,
  /(?:invest|investment|returns|profit)\s*(?:\d+|%\d+)/i,
  /buy\s*(?:followers|fans|likes|views)\b/i,
  /\bfree\s*(?:followers|fans|likes|views|subscribers)\b/i,
  /(?:adult|18\+|age verification)\b/i,
  /(?:watch|download|stream)\s*(?:free|movie|porn|xxx|adult)\b/i,
  /your (?:account|ip|computer) (?:has been|is) (?:blocked|suspended|closed)/i,
  /(?:verify|confirm|update)\s*your\s*(?:account|details|information)\b/i,
  /click\s*(?:here|now|below)\s*(?:to|for)/i,
  /http:\/\/[^\s]{20,}/i,
  /\.xyz|\.top|\.gq|\.tk|\.ml|\.ga\b/i
];

const MIN_LENGTH = 50;
const MAX_LENGTH = 2000;

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function containsBadWords(text) {
  const normalized = normalizeText(text);
  for (const word of BAD_WORDS) {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(normalized)) {
      return true;
    }
  }
  return false;
}

function detectSpam(text) {
  const normalized = normalizeText(text);
  
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(normalized)) {
      return true;
    }
  }

  const words = normalized.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 5) {
    return true;
  }

  const uniqueWords = new Set(words);
  const uniquenessRatio = uniqueWords.size / words.length;
  if (uniquenessRatio < 0.3 && words.length > 20) {
    return true;
  }

  const charCount = text.replace(/\s/g, '').length;
  if (charCount > 0) {
    const avgWordLength = charCount / words.length;
    if (avgWordLength < 2 || avgWordLength > 15) {
      return true;
    }
  }

  const specialChars = text.replace(/[a-zA-Z0-9\s]/g, '').length;
  const specialCharRatio = specialChars / text.length;
  if (specialCharRatio > 0.3) {
    return true;
  }

  return false;
}

export function validateContent(text) {
  if (!text || typeof text !== 'string') {
    return {
      isValid: false,
      error: 'Content is required'
    };
  }

  const trimmed = text.trim();
  const length = trimmed.length;

  if (length < MIN_LENGTH) {
    return {
      isValid: false,
      error: `storyMinLength`
    };
  }

  if (length > MAX_LENGTH) {
    return {
      isValid: false,
      error: `storyMaxLength`
    };
  }

  if (containsBadWords(trimmed)) {
    return {
      isValid: false,
      error: `storyInvalidContent`
    };
  }

  if (detectSpam(trimmed)) {
    return {
      isValid: false,
      error: `storySpamContent`
    };
  }

  return {
    isValid: true,
    error: null
  };
}

export function validateContentFrontend(text) {
  const result = validateContent(text);
  
  if (!result.isValid) {
    if (result.error === 'storyMinLength') {
      return { valid: false, message: 'Minimum 50 characters required' };
    }
    if (result.error === 'storyMaxLength') {
      return { valid: false, message: 'Maximum 2000 characters allowed' };
    }
    if (result.error === 'storyInvalidContent') {
      return { valid: false, message: 'Content contains inappropriate words' };
    }
    if (result.error === 'storySpamContent') {
      return { valid: false, message: 'Content appears to be spam or invalid' };
    }
    return { valid: false, message: result.error };
  }
  
  return { valid: true, message: '' };
}

export { MIN_LENGTH, MAX_LENGTH };
