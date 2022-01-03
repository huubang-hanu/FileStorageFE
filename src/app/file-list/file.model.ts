import { FileVersion } from "./file-version.model";


export interface CustomeFile{
    id: number;
    name: string;
    mime: string;
    numberOfVersion: number;
    updatedAt: Date
    fileVersions: FileVersion[]
}