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
import { getPhoneRisk, PhoneRiskResult } from "@/app/tools/phone-checker/actions";
import { Loader2, Wand2, Shield, ShieldAlert, ShieldX, ListChecks } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits.").max(15, "Phone number cannot exceed 15 characters."),
});

type FormSchema = z.infer<typeof formSchema>;

const resultConfig = {
  LOW: {
    icon: Shield,
    title: "Low Risk",
    className: "bg-green-100 border-green-300 text-green-800",
    iconClassName: "text-green-600"
  },
  MEDIUM: {
    icon: ShieldAlert,
    title: "Medium Risk",
    className: "bg-yellow-100 border-yellow-300 text-yellow-800",
    iconClassName: "text-yellow-600"
  },
  HIGH: {
    icon: ShieldX,
    title: "High Risk",
    className: "bg-red-100 border-red-300 text-red-800",
    iconClassName: "text-red-600"
  },
}

export function PhoneCheckerClient() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PhoneRiskResult['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const apiResult = await getPhoneRisk(values);
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
          AI Phone Number Analyzer
        </CardTitle>
        <CardDescription>
          Enter a phone number, including country code (e.g., +91).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+919876543210"
                      {...field}
                      disabled={isPending}
                      type="tel"
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
                  Analyzing...
                </>
              ) : (
                "Check Number"
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

              {result.reportedActivity && result.reportedActivity.length > 0 && (
                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><ListChecks className="h-5 w-5" /> Simulated Reported Activity:</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.reportedActivity.map((activity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{activity}</Badge>
                        ))}
                    </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
