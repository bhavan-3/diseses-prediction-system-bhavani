import { useState } from 'react';
import { Stethoscope, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SymptomSelector } from '@/components/SymptomSelector';
import { PredictionResults } from '@/components/PredictionResults';
import { predictDisease, type PredictionResult } from '@/lib/predictionEngine';

const Index = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
    // Clear results when symptoms change
    setResults([]);
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    // Simulate ML processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    const predictions = predictDisease(selectedSymptoms);
    setResults(predictions);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setResults([]);
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">HealthPredict AI</h1>
              <p className="text-xs text-muted-foreground">Symptom Analysis System</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-primary text-sm font-medium border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Powered by Machine Learning
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            Disease Prediction
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your symptoms below and our AI-powered system will analyze them 
            to suggest possible conditions with recommended medications and precautions.
          </p>
        </div>

        {/* Symptom Selection Card */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Select Your Symptoms
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Choose all symptoms you are currently experiencing
              </p>
            </div>
            {selectedSymptoms.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {selectedSymptoms.length} selected
              </span>
            )}
          </div>

          <SymptomSelector
            selectedSymptoms={selectedSymptoms}
            onToggle={handleToggleSymptom}
          />

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handlePredict}
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              className="min-w-[200px] h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-glow border-0"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-foreground mb-6">
            Prediction Results
          </h3>
          <PredictionResults results={results} />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border/50 mt-12">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with Naïve Bayes classification algorithm • For educational purposes only
          </p>
          <p className="mt-2 text-xs">
            Always consult a healthcare professional for medical advice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;