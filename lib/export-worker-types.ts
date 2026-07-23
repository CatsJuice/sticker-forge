import type { ExportFrame, PcmAudioTrack } from "./export-encoders";

export type StickerExportFormat = "png" | "gif" | "apng" | "mov";
export type StickerExportProgressStage = "preparing" | "encoding";

export type StickerExportWorkerRequest = {
  id: string;
  format: StickerExportFormat;
  frames: ExportFrame[];
  frameRate: number;
  playbackInterval: number;
  outputScale: number;
  gifShadow: boolean;
  audio?: PcmAudioTrack;
};

export type StickerExportWorkerProgressMessage = {
  id: string;
  progress: number;
  stage: StickerExportProgressStage;
  type: "progress";
};

export type StickerExportWorkerCompleteMessage = {
  buffer: ArrayBuffer;
  id: string;
  mimeType: string;
  type: "complete";
};

export type StickerExportWorkerErrorMessage = {
  error: string;
  id: string;
  type: "error";
};

export type StickerExportWorkerMessage =
  | StickerExportWorkerProgressMessage
  | StickerExportWorkerCompleteMessage
  | StickerExportWorkerErrorMessage;
