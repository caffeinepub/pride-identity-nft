import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PrydoIdWithPhoto {
    photo?: ExternalBlob;
    idRecord: PrydoIdRecord;
}
export interface MintOutput {
    idCount: bigint;
    record: PrydoIdWithPhoto;
}
export interface PrydoIdRecord {
    avatarType: string;
    tier: string;
    timestamp: bigint;
    wallet: string;
}
export interface backendInterface {
    getAllMintedIds(): Promise<Array<PrydoIdWithPhoto>>;
    getIdByWallet(wallet: string): Promise<PrydoIdWithPhoto>;
    getIdCount(): Promise<bigint>;
    mintId(wallet: string, tier: string, avatarType: string, photo: ExternalBlob | null): Promise<MintOutput>;
    uploadPhoto(wallet: string, photo: ExternalBlob): Promise<PrydoIdWithPhoto>;
}
