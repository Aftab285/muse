import React from 'react';
import { Button, Input, Badge, Card, RatingStars } from '../components/UIComponents';
import { Search, Heart, UserCircle } from 'lucide-react';

export const StyleGuide: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Style Guide</h1>
        <p className="text-slate-500">Component library and design system tokens for MuseMatch.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-slate-200">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
                <div className="h-16 rounded-lg bg-slate-900 shadow-sm"></div>
                <div className="flex justify-between text-xs"><span>Primary</span> <span className="text-slate-400">Slate 900</span></div>
            </div>
            <div className="space-y-2">
                <div className="h-16 rounded-lg bg-indigo-600 shadow-sm"></div>
                <div className="flex justify-between text-xs"><span>Accent</span> <span className="text-slate-400">Indigo 600</span></div>
            </div>
            <div className="space-y-2">
                <div className="h-16 rounded-lg bg-slate-50 border border-slate-200 shadow-sm"></div>
                <div className="flex justify-between text-xs"><span>Background</span> <span className="text-slate-400">Slate 50</span></div>
            </div>
            <div className="space-y-2">
                <div className="h-16 rounded-lg bg-emerald-500 shadow-sm"></div>
                <div className="flex justify-between text-xs"><span>Success</span> <span className="text-slate-400">Emerald 500</span></div>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-slate-200">Typography</h2>
        <div className="space-y-4 border border-slate-100 rounded-xl p-8 bg-white">
            <div>
                <h1 className="text-5xl font-bold text-slate-900">Heading 1</h1>
                <p className="text-xs text-slate-400 font-mono mt-1">text-5xl font-bold</p>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Heading 2</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">text-3xl font-bold</p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-900">Heading 3</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">text-xl font-bold</p>
            </div>
            <div>
                <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Body text. The quick brown fox jumps over the lazy dog. Used for main content areas.
                    Generous line height improves readability.
                </p>
                <p className="text-xs text-slate-400 font-mono mt-1">text-base text-slate-600</p>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-slate-200">Buttons</h2>
        <div className="flex flex-wrap gap-4 p-8 bg-white border border-slate-100 rounded-xl">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button icon={Search}>With Icon</Button>
            <Button size="sm">Small</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-slate-200">Interactive Elements</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
                <Input label="Text Input" placeholder="Type something..." />
                <div className="flex gap-2">
                    <Badge>Default Badge</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating Component</label>
                    <RatingStars rating={4.5} />
                </div>
            </Card>
        </div>
      </section>
    </div>
  );
};