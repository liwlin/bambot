const API_KEY = "api_key";
const BASE_URL = "base_url";
const MODEL = "model";

function readLocalStorage(key: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return window.localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function writeLocalStorage(key: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures in private/incognito modes or locked-down browsers.
  }
}

export function getApiKeyFromLocalStorage(): string {
  return readLocalStorage(API_KEY);
}

export function setApiKeyToLocalStorage(key: string) {
  writeLocalStorage(API_KEY, key);
}

export function getBaseURLFromLocalStorage(): string {
  return readLocalStorage(BASE_URL);
}

export function setBaseURLToLocalStorage(url: string) {
  writeLocalStorage(BASE_URL, url);
}

function systemPromptKey(robotName?: string) {
  return robotName ? `system_prompt_${robotName}` : "system_prompt";
}

export function getSystemPromptFromLocalStorage(robotName?: string): string {
  return readLocalStorage(systemPromptKey(robotName));
}

export function setSystemPromptToLocalStorage(
  prompt: string,
  robotName?: string
) {
  writeLocalStorage(systemPromptKey(robotName), prompt);
}

export function getModelFromLocalStorage(): string {
  return readLocalStorage(MODEL);
}

export function setModelToLocalStorage(model: string) {
  writeLocalStorage(MODEL, model);
}

// 后续可以添加更多设置项的 get/set 方法
