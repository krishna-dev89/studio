import { QuizClient } from "@/components/quiz/quiz-client";

export default function QuizPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Test Your Knowledge</h1>
                <p className="text-lg text-muted-foreground mt-4">
                    How cyber-savvy are you? Take our quick quiz to find out and learn important safety tips along the way.
                </p>
            </div>
            <QuizClient />
        </div>
    );
}
