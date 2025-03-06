import type { GoogleNewsParams } from '../types';
import { ValidationError } from '../types';

// ISO 639-1言語コード
const SUPPORTED_LANGUAGES = new Set([
  'ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et',
  'fa', 'fi', 'fr', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko',
  'lt', 'lv', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr',
  'sv', 'ta', 'th', 'tr', 'uk', 'vi', 'zh'
]);

// ISO 3166-1国コード
const SUPPORTED_COUNTRIES = new Set([
  'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co',
  'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie',
  'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng',
  'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se',
  'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
]);

export function validateParams(params: GoogleNewsParams): void {
  // 言語コードのバリデーション
  if (params.language && !SUPPORTED_LANGUAGES.has(params.language.toLowerCase())) {
    throw new ValidationError(`Unsupported language code: ${params.language}`);
  }

  // 国コードのバリデーション
  if (params.country && !SUPPORTED_COUNTRIES.has(params.country.toLowerCase())) {
    throw new ValidationError(`Unsupported country code: ${params.country}`);
  }

  // 検索クエリのバリデーション
  if (params.query && params.query.length > 100) {
    throw new ValidationError('Query string is too long (max 100 characters)');
  }
}

export function sanitizeParams(params: GoogleNewsParams): GoogleNewsParams {
  const sanitized: GoogleNewsParams = {};
  
  if (params.language) {
    sanitized.language = params.language.toLowerCase();
  }
  
  if (params.country) {
    sanitized.country = params.country.toLowerCase();
  }
  
  if (params.query) {
    sanitized.query = encodeURIComponent(params.query.trim());
  }
  
  return sanitized;
}
