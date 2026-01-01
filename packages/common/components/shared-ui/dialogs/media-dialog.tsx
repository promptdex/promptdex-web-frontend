'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Button,
    Input,
    Label,
    ScrollArea
} from '@repo/ui';
import {
    IconUpload,
    IconLink,
    IconBrandGoogleDrive,
    IconBrandDropbox,
    IconBrandOnedrive,
    IconPhoto,
    IconCloudUpload
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@repo/ui';
import Image from 'next/image';

interface MediaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (file: File | string) => void;
}

export const MediaDialog = ({ open, onOpenChange, onSelect }: MediaDialogProps) => {
    const [activeTab, setActiveTab] = useState('upload');
    const [url, setUrl] = useState('');

    // Mock recent uploads
    const recentUploads = [
        '/placeholder-1.jpg',
        '/placeholder-2.jpg',
        '/placeholder-3.jpg',
        '/placeholder-4.jpg'
    ];

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles?.[0]) {
            onSelect(acceptedFiles[0]);
            onOpenChange(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
        },
        maxFiles: 1
    });

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            onSelect(url);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border shadow-2xl gap-0 max-h-[85vh] flex flex-col">
                <DialogHeader className="p-6 border-b border-border shrink-0">
                    <DialogTitle className="text-xl font-bold">Import Media</DialogTitle>
                    <DialogDescription>
                        Upload an image or import from other services.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto min-h-0">
                    <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="flex flex-row w-full h-full min-h-[400px]">
                        <div className="w-64 border-r border-border bg-muted/20 p-4 shrink-0">
                            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-2 p-0">
                                <TabsTrigger
                                    value="upload"
                                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                                >
                                    <IconUpload size={18} /> Upload
                                </TabsTrigger>
                                <TabsTrigger
                                    value="link"
                                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                                >
                                    <IconLink size={18} /> From URL
                                </TabsTrigger>
                                <div className="py-2 px-3">
                                    <div className="h-[1px] bg-border w-full" />
                                </div>
                                <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Integrations</span>
                                <TabsTrigger
                                    value="drive"
                                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                                >
                                    <IconBrandGoogleDrive size={18} /> Google Drive
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dropbox"
                                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                                >
                                    <IconBrandDropbox size={18} /> Dropbox
                                </TabsTrigger>
                                <TabsTrigger
                                    value="onedrive"
                                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                                >
                                    <IconBrandOnedrive size={18} /> OneDrive
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 bg-background flex flex-col">
                            <TabsContent value="upload" className="mt-0 flex flex-col gap-8 flex-1 outline-none">
                                <div
                                    {...getRootProps()}
                                    className={cn(
                                        "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer min-h-[250px] py-8",
                                        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
                                    )}
                                >
                                    <input {...getInputProps()} />
                                    <div className="p-4 rounded-full bg-muted/50 text-muted-foreground">
                                        <IconCloudUpload size={48} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="text-lg font-medium">Click or drag image to upload</p>
                                        <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                    </div>
                                </div>

                                {/* Recent Uploads Section */}
                                <div className="space-y-4 shrink-0">
                                    <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                        <IconPhoto size={16} /> Recent Uploads
                                    </h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <button key={i} className="aspect-square rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-all overflow-hidden relative group">
                                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 group-hover:text-muted-foreground/50">
                                                    <IconPhoto size={24} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="link" className="mt-0 flex flex-col justify-center max-w-md mx-auto py-8 flex-1 outline-none">
                                <form onSubmit={handleUrlSubmit} className="space-y-6 w-full">
                                    <div className="space-y-2 text-center">
                                        <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                                            <IconLink size={24} />
                                        </div>
                                        <h3 className="text-lg font-semibold">Import from URL</h3>
                                        <p className="text-sm text-muted-foreground">Paste a direct link to an image file</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="url">Image URL</Label>
                                            <Input
                                                id="url"
                                                placeholder="https://example.com/image.png"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={!url}>
                                            Import Image
                                        </Button>
                                    </div>
                                </form>
                            </TabsContent>

                            {['drive', 'dropbox', 'onedrive'].map((service) => (
                                <TabsContent key={service} value={service} className="mt-0 flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto py-12 flex-1 outline-none h-full">
                                    <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center">
                                        {service === 'drive' && <IconBrandGoogleDrive size={40} className="text-muted-foreground" />}
                                        {service === 'dropbox' && <IconBrandDropbox size={40} className="text-muted-foreground" />}
                                        {service === 'onedrive' && <IconBrandOnedrive size={40} className="text-muted-foreground" />}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold capitalize">Connect to {service === 'drive' ? 'Google Drive' : service}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Browse and select files directly from your cloud storage.
                                        </p>
                                    </div>
                                    <Button variant="outline">Connect Account</Button>
                                </TabsContent>
                            ))}
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};
