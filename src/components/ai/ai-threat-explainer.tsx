"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { getThreatExplanation } from "@/app/actions";
import { Loader2, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

const threats = [
  { value: "AI-based attacks", label: "AI-Based Attacks" },
  { value: "deepfakes", label: "Deepfakes" },
  { value: "large-scale data breaches", label: "Large-Scale Data Breaches" },
];

const formSchema = z.object({
  threat: z.string().min(1, "Please select a threat to explain."),
});

type FormSchema = z.infer<typeof formSchema>;

export function AiThreatExplainer() {
  const [isPending, startTransition] = useTransition();
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threat: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    setError(null);
    setExplanation(null);
    startTransition(async () => {
      const result = await getThreatExplanation(values);
      if (result.success) {
        setExplanation(result.data.explanation);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-accent" />
          AI Threat Explainer
        </CardTitle>
        <CardDescription>
          Choose a topic and let our AI explain it in simple terms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="threat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Future Threat Topic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a threat..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {threats.map((threat) => (
                        <SelectItem key={threat.value} value={threat.value}>
                          {threat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Explain Threat"
              )}
            </Button>
          </form>
        </Form>
        {isPending && (
            <div className="mt-6 space-y-4">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            </div>
        )}
        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {explanation && (
          <div className="mt-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="font-headline text-xl mb-4 text-primary">Explanation</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {explanation.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
