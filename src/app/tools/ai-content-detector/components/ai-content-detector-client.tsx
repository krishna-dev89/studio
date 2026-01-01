"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileImage, UploadCloud, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AiContentDetectorClient() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-accent" />
          AI Content Analyzer
        </CardTitle>
        <CardDescription>
          Upload an image or video file to check for signs of AI generation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
            <UploadCloud className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">Drag & drop your file here, or click to browse.</p>
            <Button disabled>
                Select File
            </Button>
            <p className="text-xs text-muted-foreground/80 mt-2">Max file size: 10MB. Supported formats: JPG, PNG, MP4.</p>
        </div>

        <Alert>
          <FileImage className="h-4 w-4" />
          <AlertTitle>Feature Coming Soon!</AlertTitle>
          <AlertDescription>
            The AI content detection analysis is currently under development. Please check back later to use this feature.
          </AlertDescription>
        </Alert>

        <div className="mt-6 rounded-lg border p-6 bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
              <h3 className="font-headline text-2xl text-muted-foreground/50">Analysis Pending</h3>
            </div>
            <div className="mt-4 space-y-3 leading-relaxed">
              <p className="text-muted-foreground/50">Your analysis results will appear here once the feature is live and you submit a file.</p>
            </div>
          </div>
      </CardContent>
    </Card>
  );
}
