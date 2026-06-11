import { Upload, X } from "lucide-react";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from "@/components/ui/file-upload";

type InputImageProps = {
    value: File[];
    onChange: (value: File[]) => void;
    maxFiles: number;
};


export default function InputImage({ value, onChange, maxFiles }: InputImageProps) {
    // console.log(value);
    return (
        <FileUpload
            value={value}
            onValueChange={onChange}
            // accept="image/*"
            maxFiles={maxFiles}
            className="w-full max-w-md"
        >
            <FileUploadDropzone>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                        <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Drag & drop files here</p>
                    <p className="text-muted-foreground text-xs">
                        Or click to browse (max 2 files)
                    </p>
                </div>
                <FileUploadTrigger>
                    <div className="mt-2 w-fit">
                        Browse files
                    </div>
                </FileUploadTrigger>
            </FileUploadDropzone>
            {value &&
                <FileUploadList>
                    {value.map((file) => (
                        <FileUploadItem key={file.name} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete>
                                <div className="size-7">
                                    <X />
                                </div>
                            </FileUploadItemDelete>
                        </FileUploadItem>
                    ))}
                </FileUploadList>
            }
        </FileUpload>
    );
}