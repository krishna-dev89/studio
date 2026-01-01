"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { getUrlSafety, UrlSafetyResult } from "@/app/tools/url-scanner/actions";
import { Loader2, Wand2, Shield, ShieldAlert, ShieldX, Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (e.g., https://example.com)"),
});

type FormSchema = z.infer<typeof formSchema>;

const resultConfig = {
  SAFE: {
    icon: Shield,
    title: "Safe to Open",
    className: "bg-green-100 border-green-300 text-green-800",
    iconClassName: "text-green-600"
  },
  WARNING: {
    icon: ShieldAlert,
    title: "Warning",
    className: "bg-yellow-100 border-yellow-300 text-yellow-800",
    iconClassName: "text-yellow-600"
  },
  DO_NOT_OPEN: {
    icon: ShieldX,
    title: "Do Not Open",
    className: "bg-red-100 border-red-300 text-red-800",
    iconClassName: "text-red-600"
  },
}

export function UrlScannerClient() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<UrlSafetyResult['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const apiResult = await getUrlSafety(values);
      if (apiResult.success) {
        setResult(apiResult.data);
      } else {
        setError(apiResult.error);
      }
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-accent" />
          AI URL Analyzer
        </CardTitle>
        <CardDescription>
          Enter a full URL to check its safety.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/some-path"
                      {...field}
                      disabled={isPending}
                      type="url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Scan URL"
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

        {result && (
          <div className={cn("mt-6 rounded-lg border p-6", resultConfig[result.riskLevel].className)}>
            <div className="flex items-center gap-4">
              <result.icon className={cn("h-8 w-8", resultConfig[result.riskLevel].iconClassName)} />
              <h3 className="font-headline text-2xl">{resultConfig[result.riskLevel].title}</h3>
            </div>
            <div className="mt-4 space-y-4 leading-relaxed">
              <div>
                <h4 className="font-semibold">AI Analysis:</h4>
                <p>{result.explanation}</p>
              </div>
              {result.checks && result.checks.length > 0 && (
                 <div>
                    <h4 className="font-semibold mb-2">Simulated Checks:</h4>
                    <ul className="space-y-2 text-sm">
                        {result.checks.map((check, index) => (
                            <li key={index} className="flex items-center gap-2">
                                {check.passed ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
                                <span>{check.name}</span>
                            </li>
                        ))}
                    </ul>
                 </div> 
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
