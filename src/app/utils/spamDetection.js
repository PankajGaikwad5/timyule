export function isGibberish(text) {
  if (!text || text.length < 3) return false;

  const consecutiveConsonants = /[bcdfghjklmnpqrstvwxyz]{6,}/i;
  if (consecutiveConsonants.test(text)) return true;

  const randomCasePattern = /[a-z][A-Z][a-z][A-Z][a-z][A-Z]/;
  if (randomCasePattern.test(text)) return true;

  const vowels = text.match(/[aeiou]/gi) || [];
  const consonants = text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
  const vowelRatio = vowels.length / (vowels.length + consonants.length);
  if (consonants.length > 5 && vowelRatio < 0.15) return true;

  const specialChars = text.match(/[^a-zA-Z0-9\s.,!?'-]/g) || [];
  if (specialChars.length / text.length > 0.3) return true;

  return false;
}

export function validateName(name) {
  if (!name || name.trim().length < 2) return { valid: false, reason: 'Name is too short' };
  if (isGibberish(name)) return { valid: false, reason: 'Name appears to be invalid' };
  if (!/[aeiou]/i.test(name)) return { valid: false, reason: 'Name appears to be invalid' };
  return { valid: true };
}

export function validateMessage(message) {
  if (!message || message.trim().length < 5) return { valid: false, reason: 'Message is too short' };
  if (isGibberish(message)) return { valid: false, reason: 'Message appears to be spam' };
  const words = message.trim().split(/\s+/);
  if (words.length < 2 && message.length > 20) return { valid: false, reason: 'Message appears to be invalid' };
  return { valid: true };
}

export function validateEmail(email) {
  if (!email) return { valid: false, reason: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, reason: 'Invalid email format' };
  const localPart = email.split('@')[0];
  if (isGibberish(localPart)) return { valid: false, reason: 'Email appears to be invalid' };
  return { valid: true };
}

const submissionTracker = new Map();

export function checkRateLimit(identifier, maxAttempts = 3, windowMs = 3600000) {
  const now = Date.now();

  if (!submissionTracker.has(identifier)) {
    submissionTracker.set(identifier, []);
  }

  const attempts = submissionTracker.get(identifier);
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    return { allowed: false, reason: 'Too many submissions. Please try again later.' };
  }

  recentAttempts.push(now);
  submissionTracker.set(identifier, recentAttempts);
  return { allowed: true };
}

export function cleanupRateLimiter() {
  const now = Date.now();
  const oneHour = 3600000;
  for (const [key, attempts] of submissionTracker.entries()) {
    const recentAttempts = attempts.filter((time) => now - time < oneHour);
    if (recentAttempts.length === 0) {
      submissionTracker.delete(key);
    } else {
      submissionTracker.set(key, recentAttempts);
    }
  }
}

setInterval(cleanupRateLimiter, 600000);
