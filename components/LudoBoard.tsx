import React from 'react';
import { PlayerColor } from '../types';

interface LudoBoardProps {
  players: { color: PlayerColor; active: boolean }[];
  onCellClick?: (index: number) => void;
}

const LudoBoard: React.FC<LudoBoardProps> = ({ players }) => {
  // Helper to determine cell styling based on Ludo grid logic
  const getCellClass = (row: number, col: number) => {
    // 0-indexed: 0-14
    
    // RED BASE (Top Left)
    if (row < 6 && col < 6) return 'bg-red-600 border-red-800';
    // GREEN BASE (Top Right)
    if (row < 6 && col > 8) return 'bg-green-600 border-green-800';
    // BLUE BASE (Bottom Left)
    if (row > 8 && col < 6) return 'bg-blue-600 border-blue-800';
    // YELLOW BASE (Bottom Right)
    if (row > 8 && col > 8) return 'bg-yellow-400 border-yellow-600';

    // CENTER
    if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
      // Triangle areas
      return 'bg-slate-100'; // Simplified center for CSS grid, normally triangles
    }

    // PATHS
    // Red Home Run (Horizontal left)
    if (row === 7 && col > 0 && col < 6) return 'bg-red-200';
    // Green Home Run (Vertical top)
    if (col === 7 && row > 0 && row < 6) return 'bg-green-200';
    // Yellow Home Run (Vertical bottom)
    if (col === 7 && row > 8 && row < 14) return 'bg-yellow-200';
    // Blue Home Run (Horizontal right)
    // Actually standard Ludo: Blue is usually bottom-left or bottom-right depending on region.
    // Let's stick to standard: TL=Red, TR=Green, BR=Yellow, BL=Blue.
    // Wait, standard is usually: Red(TL), Green(TR), Yellow(BR), Blue(BL).
    // Home runs:
    // Red (Left to Center): row 7, col 1-5
    // Green (Top to Center): col 7, row 1-5
    // Yellow (Right to Center): row 7, col 9-13
    // Blue (Bottom to Center): col 7, row 9-13

    // Let's fix the Base Logic to match standard clockwise: Red -> Green -> Yellow -> Blue
    // Actually usually Red(TL), Green(TR), Yellow(BR), Blue(BL) is common layout.
    
    // Correct Path Logic for Visuals
    if (row === 7 && col > 0 && col < 6) return 'bg-red-500'; // Red Home Path
    if (col === 7 && row > 0 && row < 6) return 'bg-green-500'; // Green Home Path
    if (row === 7 && col > 8 && col < 14) return 'bg-yellow-400'; // Yellow Home Path (Corrected side)
    if (col === 7 && row > 8 && row < 14) return 'bg-blue-500'; // Blue Home Path

    // Star/Safe Zones
    if ((row === 6 && col === 1) || (row === 2 && col === 6) || (row === 12 && col === 8) || (row === 8 && col === 13)) {
      return 'bg-gray-300 relative'; // Safe spots
    }
    
    return 'bg-white';
  };

  const renderCells = () => {
    const cells = [];
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        const key = `${r}-${c}`;
        let content = null;
        
        // Base Circles
        if (r === 2 && c === 2) content = <div className="w-8 h-8 rounded-full bg-white opacity-80" />;
        if (r === 2 && c === 12) content = <div className="w-8 h-8 rounded-full bg-white opacity-80" />;
        if (r === 12 && c === 2) content = <div className="w-8 h-8 rounded-full bg-white opacity-80" />;
        if (r === 12 && c === 12) content = <div className="w-8 h-8 rounded-full bg-white opacity-80" />;

        // Center Triangle Logic (Simplified)
        let specialClass = '';
        if (r >= 6 && r <= 8 && c >= 6 && c <= 8) {
           if (r===6 && c>=6 && c<=8) specialClass = "bg-green-200";
           else if (r===8 && c>=6 && c<=8) specialClass = "bg-blue-200";
           else if (c===6 && r>=6 && r<=8) specialClass = "bg-red-200";
           else if (c===8 && r>=6 && r<=8) specialClass = "bg-yellow-200";
           else specialClass = "bg-gray-100"; // Dead center
        }

        cells.push(
          <div 
            key={key} 
            className={`cell ${specialClass || getCellClass(r, c)} text-[8px]`}
          >
            {content}
            {/* Star Icon for Safe Zones */}
            {((r === 6 && c === 1) || (r === 2 && c === 6) || (r === 12 && c === 8) || (r === 8 && c === 13)) && (
               <span className="absolute text-slate-500 text-lg">★</span>
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-2xl rounded-lg overflow-hidden bg-gray-900 p-1">
      <div className="ludo-grid">
        {renderCells()}
      </div>
    </div>
  );
};

export default LudoBoard;
