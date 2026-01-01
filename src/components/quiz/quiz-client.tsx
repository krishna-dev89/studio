"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCw } from "lucide-react";
import { Progress } from "../ui/progress";

const quizQuestions = [
    {
        question: "What is 'phishing'?",
        options: [
            "A type of online fishing game.",
            "When a hacker steals your computer.",
            "A scam to steal your personal information like passwords or bank details.",
            "A software that protects your computer from viruses."
        ],
        answer: "A scam to steal your personal information like passwords or bank details.",
        explanation: "Phishing scams use fake emails, messages, or websites to trick you into giving away sensitive information."
    },
    {
        question: "Which of the following is the strongest password?",
        options: [
            "12345678",
            "password123",
            "MyDogIsNamedBuddy",
            "Tr0ub4dor&3"
        ],
        answer: "Tr0ub4dor&3",
        explanation: "A strong password is long (12+ characters) and includes a mix of uppercase letters, lowercase letters, numbers, and symbols."
    },
    {
        question: "You receive a UPI request from an unknown person to 'receive' money. What should you do?",
        options: [
            "Enter your PIN to accept the money.",
            "Decline the request and block the sender.",
            "Call the person to ask why they sent it.",
            "Share the request with your friends."
        ],
        answer: "Decline the request and block the sender.",
        explanation: "UPI PIN is only used for sending money, not receiving it. This is a common scam to trick you into sending money."
    },
    {
        question: "Is it safe to use public Wi-Fi for online banking?",
        options: [
            "Yes, it's always safe and encrypted.",
            "No, public Wi-Fi can be insecure and hackers might steal your information.",
            "Only if the Wi-Fi network has a strong name.",
            "It's safe if you have an antivirus installed."
        ],
        answer: "No, public Wi-Fi can be insecure and hackers might steal your information.",
        explanation: "Avoid using public Wi-Fi for sensitive activities like banking. If you must, use a VPN (Virtual Private Network) to encrypt your connection."
    }
];

export function QuizClient() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleNext = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) return;
        if (selectedAnswer === currentQuestion.answer) {
            setScore(score + 1);
        }
        setIsAnswered(true);
    };
    
    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setIsAnswered(false);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-2xl">Quiz Completed!</CardTitle>
                    <CardDescription>You scored {score} out of {quizQuestions.length}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className={cn("text-5xl font-bold", score / quizQuestions.length > 0.5 ? "text-green-500" : "text-destructive")}>
                        {Math.round((score / quizQuestions.length) * 100)}%
                    </div>
                    <p className="text-muted-foreground text-center">
                        {score / quizQuestions.length > 0.75 ? "Excellent work! You're a cybersecurity expert." : "Good job! Keep learning to improve your digital safety skills."}
                    </p>
                    <Button onClick={restartQuiz}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} className="mb-4" />
                <CardTitle className="font-headline text-2xl">Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    value={selectedAnswer ?? undefined}
                    onValueChange={setSelectedAnswer}
                    disabled={isAnswered}
                    className="space-y-4"
                >
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.answer;
                        const isSelected = option === selectedAnswer;
                        return (
                            <Label
                                key={index}
                                className={cn(
                                    "flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-muted/50",
                                    isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                                    isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10"
                                )}
                            >
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <span>{option}</span>
                                {isAnswered && isCorrect && <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="ml-auto h-5 w-5 text-destructive" />}
                            </Label>
                        );
                    })}
                </RadioGroup>

                {isAnswered && (
                    <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                        <p className="font-semibold">{selectedAnswer === currentQuestion.answer ? "Correct!" : "Not quite."}</p>
                        <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                )}

                <div className="mt-6">
                    {isAnswered ? (
                        <Button onClick={handleNext} className="w-full">
                            {currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                        </Button>
                    ) : (
                        <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full">
                            Submit Answer
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
