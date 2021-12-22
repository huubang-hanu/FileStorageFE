import { FileVersion } from "./file-version.model";


export interface File{
    id: number;
    name: string;
    mime: string;
    numberOfVersion: number;
    fileVersions: FileVersion[]
}