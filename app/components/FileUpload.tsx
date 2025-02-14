/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import { FileUploadUI } from "@/components/ui/file-upload";
import { useFormContext } from "react-hook-form";

function FileUpload({ name }: { name: string }) {

    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";
    const privateKey = process.env.PRIVATE_KEY || "";
    const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT || "";



    const [files, setFiles] = useState<File[]>([]);
    const form = useFormContext();

    const handleFileUpload = async (files: File[]) => {
        setFiles(files);
        form.setValue(name, files);
        console.log(files, form.getValues(name));

        for (const file of files) {
            try {
                const arrayBuffer = await file.arrayBuffer();

                const response = await imagekit.upload({
                    file: Buffer.from(arrayBuffer),
                    fileName: file.name,
                    useUniqueFileName: true, // Ensure unique file names
                });
                console.log("File uploaded to ImageKit:", response);
            } catch (error) {
                console.error("Error uploading file to ImageKit:", error);
            }
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-64 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUploadUI onChange={handleFileUpload} />
        </div>
    )
}

export default FileUpload