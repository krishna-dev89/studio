
'use client';

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getScamAnalysis, ScamAnalysisResult } from "@/app/tools/message-scanner/actions";
import { Loader2, Wand2, Shield, ShieldAlert, ShieldX, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters long.").max(2000, "Message cannot exceed 2000 characters."),
});

type FormSchema = z.infer<typeof formSchema>;

const resultConfig = {
  SAFE: {
    icon: Shield,
    title: "Looks Safe",
    className: "bg-green-100 border-green-300 text-green-800",
    iconClassName: "text-green-600"
  },
  SUSPICIOUS: {
    icon: ShieldAlert,
    title: "Suspicious",
    className: "bg-yellow-100 border-yellow-300 text-yellow-800",
    iconClassName: "text-yellow-600"
  },
  DANGEROUS: {
    icon: ShieldX,
    title: "Dangerous",
    className: "bg-red-100 border-red-300 text-red-800",
    iconClassName: "text-red-600"
  },
}

export function ScamDetectorClient() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ScamAnalysisResult['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const apiResult = await getScamAnalysis(values);
      if (apiResult.success) {
        setResult(apiResult.data);
      } else {
        setError(apiResult.error);
      }
    });
  };

  const ResultIcon = result ? resultConfig[result.riskLevel].icon : null;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="h-7 w-7 text-accent" />
          AI Message Analyzer
        </CardTitle>
        <CardDescription>
          Paste the full message content below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Dear customer, your account has been locked. Click here to verify..."
                      className="min-h-[150px] resize-y"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto" size="lg">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Message"
              )}
            </Button>
          </form>
        </Form>

        {isPending && (
            <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
                    <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
                </div>
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            </div>
        )}

        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {result && ResultIcon && (
          <div className={cn("mt-6 rounded-lg border p-6", resultConfig[result.riskLevel].className)}>
            <div className="flex items-center gap-4">
              <ResultIcon className={cn("h-8 w-8", resultConfig[result.riskLevel].iconClassName)} />
              <h3 className="font-headline text-2xl">{resultConfig[result.riskLevel].title}</h3>
            </div>
            <div className="mt-4 space-y-4 leading-relaxed">
              <div>
                <h4 className="font-semibold">AI Analysis:</h4>
                <p>{result.explanation}</p>
              </div>
              {result.location && (
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2"><MapPin className="h-5 w-5" /> Inferred Location:</h4>
                  <p className="text-sm font-medium">{result.location}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
