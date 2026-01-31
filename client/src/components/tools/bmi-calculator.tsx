import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, RefreshCcw } from "lucide-react";

export function BMICalculator() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>("");

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        const h = parseFloat(height) / 100; // convert cm to m
        const w = parseFloat(weight);

        if (h > 0 && w > 0) {
            const bmiValue = w / (h * h);
            setBmi(Math.round(bmiValue * 10) / 10);

            if (bmiValue < 18.5) setCategory("Underweight");
            else if (bmiValue < 25) setCategory("Normal weight");
            else if (bmiValue < 30) setCategory("Overweight");
            else setCategory("Obese");
        }
    };

    const reset = () => {
        setHeight("");
        setWeight("");
        setBmi(null);
        setCategory("");
    };

    const getCategoryColor = () => {
        switch (category) {
            case "Underweight": return "text-blue-500";
            case "Normal weight": return "text-green-500";
            case "Overweight": return "text-orange-500";
            case "Obese": return "text-red-500";
            default: return "text-gray-900";
        }
    };

    return (
        <Card className="shadow-lg border-medical-blue/20 bg-white">
            <CardHeader>
                <CardTitle className="flex items-center text-medical-blue">
                    <Calculator className="mr-2 h-6 w-6" />
                    BMI Calculator
                </CardTitle>
                <CardDescription>
                    Check your Body Mass Index to assess your health weight.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={calculateBMI} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                            id="height"
                            type="number"
                            placeholder="e.g. 175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                            min="50"
                            max="300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                            min="20"
                            max="500"
                        />
                    </div>

                    {!bmi ? (
                        <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-dark">
                            Calculate BMI
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg text-center animate-fade-in border border-gray-100">
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Your BMI</p>
                                <p className="text-4xl font-bold text-gray-900 my-2">{bmi}</p>
                                <p className={`font-semibold text-lg ${getCategoryColor()}`}>
                                    {category}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={reset}
                            >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Calculate Again
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
