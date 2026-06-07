'use client';

import { useState, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Ingredient {
  _key: string;
  name: string;
  percentage: number;
}

export default function SourdoughCalculator() {
  const [numberOfLoaves, setNumberOfLoaves] = useState<number>(1);
  const [loafSizeGrams, setLoafSizeGrams] = useState<number>(750);
  
  // Standard baker's percentages (relative to flour = 100%)
  const baseIngredients: Ingredient[] = [
    { _key: 'flour', name: 'Flour', percentage: 100 },
    { _key: 'water', name: 'Water', percentage: 70 },
    { _key: 'starter', name: 'Starter', percentage: 20 },
    { _key: 'salt', name: 'Salt', percentage: 2 },
  ];
  
  const [ingredients, setIngredients] = useState<Ingredient[]>(baseIngredients);

  // Calculate total dough weight needed based on loaf size and count
  const totalDoughWeight = numberOfLoaves * loafSizeGrams;
  
  // Calculate flour amount based on desired output and baker's percentages
  // Total % = 100 (flour) + 70 (water) + 20 (starter) + 2 (salt) = 192%
  // Flour = totalDoughWeight / (totalPercentage / 100)
  const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);
  const flourGrams = Math.round(totalDoughWeight / (totalPercentage / 100));

  const handleLoafSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLoafSizeGrams(isNaN(value) || value < 0 ? 0 : Math.round(value));
  };

  const handleNumberOfLoavesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setNumberOfLoaves(isNaN(value) || value < 1 ? 1 : Math.max(1, Math.round(value)));
  };

  const handlePercentageChange = (key: string, percentage: number) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing._key === key
          ? { ...ing, percentage: Math.max(0, Math.min(percentage, 500)) }
          : ing
      )
    );
  };

  const addIngredient = () => {
    const newKey = `ingredient-${Date.now()}`;
    setIngredients(prev => [
      ...prev,
      { _key: newKey, name: 'Custom Ingredient', percentage: 10 },
    ]);
  };

  const removeIngredient = (key: string) => {
    if (ingredients.length <= 4) return; // Keep at least base ingredients (including flour)
    setIngredients(prev => prev.filter(ing => ing._key !== key));
  };

  const updateIngredientName = (key: string, name: string) => {
    setIngredients(prev =>
      prev.map(ing => ing._key === key ? { ...ing, name } : ing)
    );
  };

  return (
    <div className="space-y-6">
      {/* Loaf Configuration */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-4">Loaf Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loaf-size" className="text-base">
                Loaf Size (per loaf)
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="loaf-size"
                  type="number"
                  value={loafSizeGrams}
                  onChange={handleLoafSizeChange}
                  min="100"
                  step="50"
                  className="w-32 font-semibold"
                />
                <span className="text-muted-foreground">grams</span>
              </div>
            </div>
            <div>
              <Label htmlFor="num-loaves" className="text-base">
                Number of Loaves
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="num-loaves"
                  type="number"
                  value={numberOfLoaves}
                  onChange={handleNumberOfLoavesChange}
                  min="1"
                  step="1"
                  className="w-32 font-semibold"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t text-sm">
            <p>Total dough needed: <span className="font-semibold">{totalDoughWeight}g</span></p>
            <p>Flour required: <span className="font-semibold">{flourGrams}g</span></p>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients Table */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-4">Ingredients (Baker's Percentages)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium">Ingredient</th>
                  <th className="text-center py-2 px-2 font-medium w-24">%</th>
                  <th className="text-right py-2 px-2 font-medium w-32">Weight (g)</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient) => (
                  <tr key={ingredient._key} className="border-b last:border-0">
                    <td className="py-2 px-2">
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateIngredientName(ingredient._key, e.target.value)}
                        placeholder="Name"
                        className="border-none focus-visible:ring-0 p-0 h-auto font-medium text-base"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <Input
                          type="number"
                          value={ingredient.percentage}
                          onChange={(e) =>
                            handlePercentageChange(
                              ingredient._key,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          min="0"
                          max="500"
                          step="1"
                          className="w-20 text-center font-semibold border-none focus-visible:ring-0 p-0 h-auto"
                        />
                        <span>%</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <p className="text-right font-mono font-medium">
                        {((ingredient.percentage / 100) * flourGrams).toFixed(1)}
                      </p>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIngredient(ingredient._key)}
                        disabled={ingredients.length <= 4}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        title="Remove ingredient"
                      >
                        ×
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Percentage */}
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-medium">Total Percentage:</span>
            <span className={`font-semibold ${totalPercentage > 200 ? 'text-destructive' : totalPercentage < 150 ? 'text-primary' : ''}`}>
              {totalPercentage.toFixed(1)}%
            </span>
          </div>

          {/* Add Ingredient Button */}
          <Button onClick={addIngredient} variant="outline" className="mt-4 w-full">
            + Add Custom Ingredient
          </Button>
        </CardContent>
      </Card>

      {/* Recipe Summary Card */}
      {flourGrams > 0 && (
        <Card className="bg-muted/50 border-primary/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              Recipe Summary
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                For {numberOfLoaves} loaf{numberOfLoaves > 1 ? 's' : ''} ({totalDoughWeight}g total)
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ingredients.map((ingredient) => (
                <div key={ingredient._key} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="font-mono text-right">
                    {((ingredient.percentage / 100) * flourGrams).toFixed(1)}g{' '}
                    <span className="text-sm text-muted-foreground">({ingredient.percentage}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          <h4 className="font-semibold mb-2">Baker's Percentages Explained</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>All percentages are calculated relative to flour = 100%</li>
            <li>Total should ideally be between 150-200% for most breads</li>
            <li>Water percentage determines dough hydration (65-75% is common)</li>
            <li>Salt typically ranges from 1.8-2.5%</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
