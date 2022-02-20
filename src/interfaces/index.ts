import { Slots } from "vue";

export interface Data {
  [key: string]: unknown;
}

export interface SetupContext {
  attrs: Data;
  slots: Slots;
  emit: (event: string, ...args: unknown[]) => void;
  expose: (exposed?: Record<string, any>) => void;
}

export interface Image {
  externalName: string;
  tempName: string;
  file: null | File;
  isLoaded: boolean;
}
