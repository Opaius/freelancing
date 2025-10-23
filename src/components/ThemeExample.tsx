import React from "react";

const ThemeExample: React.FC = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-primary-500">Theme Variables Demo</h2>

      {/* Color palette demonstration */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-secondary-500">Color Palette</h3>
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-primary-50 text-primary-900 p-2 rounded text-center text-sm">50</div>
          <div className="bg-primary-100 text-primary-900 p-2 rounded text-center text-sm">100</div>
          <div className="bg-primary-200 text-primary-900 p-2 rounded text-center text-sm">200</div>
          <div className="bg-primary-300 text-primary-900 p-2 rounded text-center text-sm">300</div>
          <div className="bg-primary-400 text-primary-900 p-2 rounded text-center text-sm">400</div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-primary-500 text-primary-50 p-2 rounded text-center text-sm">500</div>
          <div className="bg-primary-600 text-primary-50 p-2 rounded text-center text-sm">600</div>
          <div className="bg-primary-700 text-primary-50 p-2 rounded text-center text-sm">700</div>
          <div className="bg-primary-800 text-primary-50 p-2 rounded text-center text-sm">800</div>
          <div className="bg-primary-900 text-primary-50 p-2 rounded text-center text-sm">900</div>
        </div>
      </div>

      {/* Text colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-secondary-500">Text Colors</h3>
        <p className="text-primary-500">This text uses text-primary-500</p>
        <p className="text-accent-500">This text uses text-accent-500</p>
        <p className="text-secondary-500">This text uses text-secondary-500</p>
        <p className="text-background-500">This text uses text-background-500</p>
      </div>

      {/* Background colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-secondary-500">Background Colors</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-primary-500 text-primary-50 p-3 rounded">bg-primary-500</div>
          <div className="bg-accent-500 text-accent-50 p-3 rounded">bg-accent-500</div>
          <div className="bg-secondary-500 text-secondary-50 p-3 rounded">bg-secondary-500</div>
        </div>
      </div>

      {/* Border colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-secondary-500">Border Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-primary-500 p-3 rounded">border-primary-500</div>
          <div className="border-2 border-accent-500 p-3 rounded">border-accent-500</div>
        </div>
      </div>

      {/* Mixed utilities */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-secondary-500">Mixed Utilities</h3>
        <button className="bg-primary-500 hover:bg-primary-600 text-primary-50 px-4 py-2 rounded transition-colors">
          Primary Button
        </button>
        <button className="bg-accent-500 hover:bg-accent-600 text-accent-50 px-4 py-2 rounded transition-colors ml-2">
          Accent Button
        </button>
      </div>
    </div>
  );
};

export default ThemeExample;
