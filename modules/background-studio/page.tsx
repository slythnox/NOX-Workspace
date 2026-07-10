import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  RotateCcw,
  Share2,
  Plus,
  Trash2,
  ChevronDown,
  Check,
  Code,
  X
} from 'lucide-react';
import GradientBlinds from '@/components/ui/GradientBlinds';
import { useToast } from '@/app/providers/ToastProvider';
import { cn } from '@/lib/utils';

// Import official components
import LaserFlow from '@/components/LaserFlow';
import LightRays from '@/components/LightRays';
import FloatingLines from '@/components/FloatingLines';
import ColorBends from '@/components/ColorBends';
import DotField from '@/components/DotField';
import ParticleBurst from '@/components/ParticleBurst';

// Import component sources and styles as raw strings
import gradientBlindsSource from '@/components/ui/GradientBlinds.tsx?raw';
import gradientBlindsCss from '@/components/ui/GradientBlinds.css?raw';
import dotFieldSource from '@/components/DotField.tsx?raw';
import particleBurstSource from '@/components/ParticleBurst.tsx?raw';
import colorBendsSource from '@/components/ColorBends.tsx?raw';
import colorBendsCss from '@/components/ColorBends.css?raw';
import floatingLinesSource from '@/components/FloatingLines.tsx?raw';
import floatingLinesCss from '@/components/FloatingLines.css?raw';
import laserFlowSource from '@/components/LaserFlow.tsx?raw';
import laserFlowCss from '@/components/LaserFlow.css?raw';
import lightRaysSource from '@/components/LightRays.tsx?raw';
import lightRaysCss from '@/components/LightRays.css?raw';

type BackgroundType = 'blinds' | 'dot' | 'pb' | 'bends' | 'lines' | 'laser' | 'rays';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  decimals?: number;
}

const Slider: React.FC<SliderProps> = ({ label, min, max, step, value, onChange, decimals }) => {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400">
        <span>{label}</span>
        <span>{decimals !== undefined ? value.toFixed(decimals) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default function BackgroundStudio() {
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeBg, setActiveBg] = useState<BackgroundType>('blinds');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeExportTab, setActiveExportTab] = useState<'cli' | 'usage' | 'component' | 'css'>('usage');
  const [copied, setCopied] = useState(false);
  const [showHeroOverlay, setShowHeroOverlay] = useState(true);

  const [canvasBg, setCanvasBg] = useState('#120f17');
  const [colors, setColors] = useState<string[]>(['#ff9ffc', '#5227ff']);

  // Blinds
  const [angle, setAngle] = useState(0);
  const [noise, setNoise] = useState(0.30);
  const [blindCount, setBlindCount] = useState(16);
  const [blindMinWidth, setBlindMinWidth] = useState(60);
  const [mouseDampening, setMouseDampening] = useState(0.15);
  const [mirrorGradient, setMirrorGradient] = useState(false);
  const [spotlightRadius, setSpotlightRadius] = useState(0.50);
  const [spotlightSoftness, setSpotlightSoftness] = useState(1.00);
  const [spotlightOpacity, setSpotlightOpacity] = useState(1.00);
  const [distortAmount, setDistortAmount] = useState(0.00);
  const [shineDirection, setShineDirection] = useState<'left'|'right'>('left');

  // Particle Burst
  const [pbCount, setPbCount] = useState(300);
  const [pbMagnetRadius, setPbMagnetRadius] = useState(10);
  const [pbRingRadius, setPbRingRadius] = useState(10);
  const [pbWaveSpeed, setPbWaveSpeed] = useState(0.40);
  const [pbWaveAmplitude, setPbWaveAmplitude] = useState(1.00);
  const [pbParticleSize, setPbParticleSize] = useState(2.00);
  const [pbLerpSpeed, setPbLerpSpeed] = useState(0.10);
  const [pbAutoAnimate, setPbAutoAnimate] = useState(false);
  const [pbVariance, setPbVariance] = useState(1.00);
  const [pbRotationSpeed, setPbRotationSpeed] = useState(0.00);
  const [pbDepthFactor, setPbDepthFactor] = useState(1.00);
  const [pbPulseSpeed, setPbPulseSpeed] = useState(3.00);
  const [pbShape, setPbShape] = useState<'capsule'|'circle'|'square'>('capsule');
  const [pbFieldStrength, setPbFieldStrength] = useState(10);

  // Color Bends
  const [cbRotation, setCbRotation] = useState(90);
  const [cbSpeed, setCbSpeed] = useState(0.20);
  const [cbTransparent, setCbTransparent] = useState(true);
  const [cbAutoRotate, setCbAutoRotate] = useState(0.00);
  const [cbScale, setCbScale] = useState(1.00);
  const [cbFrequency, setCbFrequency] = useState(1.00);
  const [cbWarpStrength, setCbWarpStrength] = useState(1.00);
  const [cbMouseInfluence, setCbMouseInfluence] = useState(1.00);
  const [cbParallax, setCbParallax] = useState(0.50);
  const [cbNoise, setCbNoise] = useState(0.15);
  const [cbIterations, setCbIterations] = useState(1);
  const [cbIntensity, setCbIntensity] = useState(1.50);
  const [cbBandWidth, setCbBandWidth] = useState(6.00);

  // Dot Field
  const [dfDotRadius, setDfDotRadius] = useState(3.00);
  const [dfDotSpacing, setDfDotSpacing] = useState(15);
  const [dfCursorRadius, setDfCursorRadius] = useState(550);
  const [dfCursorForce, setDfCursorForce] = useState(0.26);
  const [dfBulgeOnly, setDfBulgeOnly] = useState(false);
  const [dfBulgeStrength, setDfBulgeStrength] = useState(67);
  const [dfGlowRadius, setDfGlowRadius] = useState(160);
  const [dfSparkle, setDfSparkle] = useState(false);
  const [dfWaveAmplitude, setDfWaveAmplitude] = useState(0);
  const dfGlowColor = '#5311c2';

  // Floating Lines
  const [flSpeed, setFlSpeed] = useState(1.00);
  const [flInteractive, setFlInteractive] = useState(true);
  const [flBendRadius, setFlBendRadius] = useState(5.00);
  const [flBendStrength, setFlBendStrength] = useState(-0.50);
  const [flMouseDamping, setFlMouseDamping] = useState(0.05);
  const [flParallax, setFlParallax] = useState(true);
  const [flParallaxStrength, setFlParallaxStrength] = useState(0.20);

  // Laser Flow
  const lfWispDensity = 1.00;
  const [lfFlowSpeed, setLfFlowSpeed] = useState(0.35);
  const [lfVerticalSizing, setLfVerticalSizing] = useState(2.00);
  const [lfHorizontalSizing, setLfHorizontalSizing] = useState(0.50);
  const [lfFogIntensity, setLfFogIntensity] = useState(0.45);
  const [lfFogScale, setLfFogScale] = useState(0.30);
  const [lfWispSpeed, setLfWispSpeed] = useState(15);
  const [lfWispIntensity, setLfWispIntensity] = useState(5.00);
  const lfFlowStrength = 0.25;
  const lfDecay = 1.10;
  const [lfHorizontalBeamOffset, setLfHorizontalBeamOffset] = useState(0.00);
  const [lfVerticalBeamOffset, setLfVerticalBeamOffset] = useState(-0.50);

  // Light Rays
  const [lrOrigin, setLrOrigin] = useState<'top-center'|'center'|'top-left'|'top-right'>('top-center');
  const [lrSpeed, setLrSpeed] = useState(1.00);
  const [lrSpread, setLrSpread] = useState(1.00);
  const [lrLength, setLrLength] = useState(2.00);
  const [lrPulsating, setLrPulsating] = useState(false);
  const [lrFadeDistance, setLrFadeDistance] = useState(1.00);
  const [lrSaturation, setLrSaturation] = useState(1.00);
  const [lrFollowMouse, setLrFollowMouse] = useState(true);
  const [lrMouseInfluence, setLrMouseInfluence] = useState(0.10);
  const [lrNoise, setLrNoise] = useState(0.00);
  const [lrDistortion, setLrDistortion] = useState(0.00);

  const canvasParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeBg === 'blinds') setColors(['#ff9ffc', '#5227ff']);
    else if (activeBg === 'bends') setColors(['#5227FF', '#FF9FFC', '#7cff67']);
    else if (activeBg === 'lines') setColors(['#E945F5', '#2F4BC0', '#E945F5']);
    else if (activeBg === 'dot') setColors(['#5311c2']);
    else if (activeBg === 'laser') setColors(['#FF79C6']);
    else if (activeBg === 'pb') setColors(['#ff9ffc']);
    else if (activeBg === 'rays') setColors(['#ffffff']);
  }, [activeBg]);

  useEffect(() => {
    const encoded = searchParams.get('state');
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));
        if (decoded.bg) setActiveBg(decoded.bg);
        if (decoded.canvasBg) setCanvasBg(decoded.canvasBg);
        if (decoded.colors) setColors(decoded.colors);
        if (decoded.angle !== undefined) setAngle(decoded.angle);
        if (decoded.noise !== undefined) setNoise(decoded.noise);
      } catch (e) { console.error(e); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const stateObj = { bg: activeBg, canvasBg, colors, angle, noise };
      const encoded = btoa(JSON.stringify(stateObj));
      setSearchParams({ state: encoded }, { replace: true });
    } catch (e) { console.error(e); }
  }, [activeBg, canvasBg, colors, angle, noise, setSearchParams]);

  const handleUpdateColor = (idx: number, hex: string) => { const next = [...colors]; next[idx] = hex; setColors(next); };
  const handleAddColor = () => {
    if (colors.length >= 5) { showToast('Maximum 5 colors allowed', 'error'); return; }
    setColors([...colors, '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')]);
  };
  const handleRemoveColor = (idx: number) => {
    if (colors.length <= 1) { showToast('At least 1 color is required', 'error'); return; }
    setColors(colors.filter((_,i) => i !== idx));
  };

  const handleReset = () => {
    setCanvasBg('#120f17'); setColors(['#ff9ffc','#5227ff']); setAngle(0); setNoise(0.3);
    setBlindCount(16); setBlindMinWidth(60); setMouseDampening(0.15); setMirrorGradient(false);
    setSpotlightRadius(0.5); setSpotlightSoftness(1); setSpotlightOpacity(1); setDistortAmount(0); setShineDirection('left');
    setPbCount(300); setPbRingRadius(10); setPbMagnetRadius(10); setPbShape('capsule');
    setCbRotation(90); setCbSpeed(0.2); setDfDotRadius(3); setDfDotSpacing(15);
    setLfVerticalSizing(2.0); setLfHorizontalSizing(0.5); setLfFogIntensity(0.45); setLfFogScale(0.3);
    setLfWispSpeed(15); setLfWispIntensity(5.0); setLfHorizontalBeamOffset(0.0); setLfVerticalBeamOffset(-0.5);
    setLrOrigin('top-center'); setLrSpeed(1); setLrSpread(1); setLrLength(2);
    setLrFollowMouse(true); setLrMouseInfluence(0.1); setLrNoise(0); setLrDistortion(0);
    showToast('Reset values to defaults', 'success');
  };

  const handleShare = () => { navigator.clipboard.writeText(window.location.href); showToast('Shareable link copied!', 'success'); };

  // Generate Tabbed Exporter Snippet Code
  const getExportCode = (): string => {
    const isCLI = activeExportTab === 'cli';
    const isComponent = activeExportTab === 'component';
    const isCSS = activeExportTab === 'css';

    const colorsArrStr = colors.map(c => `"${c}"`).join(', ');
    const rayColorVal = colors[0] || '#ffffff';
    const laserColorVal = colors[0] || '#FF79C6';

    const getCliCommand = () => {
      if (activeBg === 'blinds') return `npx shadcn@latest add @react-bits/GradientBlinds-TS-CSS`;
      if (activeBg === 'pb') return `npx shadcn@latest add @react-bits/ParticleBurst-TS-CSS`;
      if (activeBg === 'bends') return `npx shadcn@latest add @react-bits/ColorBends-TS-CSS`;
      if (activeBg === 'dot') return `npx shadcn@latest add @react-bits/DotField-TS-CSS`;
      if (activeBg === 'lines') return `npx shadcn@latest add @react-bits/FloatingLines-TS-CSS`;
      if (activeBg === 'laser') return `npx shadcn@latest add @react-bits/LaserFlow-TS-CSS`;
      if (activeBg === 'rays') return `npx shadcn@latest add @react-bits/LightRays-TS-CSS`;
      return '';
    };

    if (isCLI) {
      return getCliCommand();
    }

    if (isComponent) {
      if (activeBg === 'blinds') return gradientBlindsSource;
      if (activeBg === 'dot') return dotFieldSource;
      if (activeBg === 'pb') return particleBurstSource;
      if (activeBg === 'bends') return colorBendsSource;
      if (activeBg === 'lines') return floatingLinesSource;
      if (activeBg === 'laser') return laserFlowSource;
      if (activeBg === 'rays') return lightRaysSource;
      return '';
    }

    if (isCSS) {
      if (activeBg === 'blinds') return gradientBlindsCss;
      if (activeBg === 'bends') return colorBendsCss;
      if (activeBg === 'lines') return floatingLinesCss;
      if (activeBg === 'laser') return laserFlowCss;
      if (activeBg === 'rays') return lightRaysCss;
      return '/* No custom CSS style file required for this component. */';
    }

    // Default: 'usage' (exact React component usage snippet)
    if (activeBg === 'laser') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <LaserFlow
    color="${laserColorVal}"
    wispDensity={${lfWispDensity}}
    flowSpeed={${lfFlowSpeed}}
    verticalSizing={${lfVerticalSizing}}
    horizontalSizing={${lfHorizontalSizing}}
    fogIntensity={${lfFogIntensity}}
    fogScale={${lfFogScale}}
    wispSpeed={${lfWispSpeed}}
    wispIntensity={${lfWispIntensity}}
    flowStrength={${lfFlowStrength}}
    decay={${lfDecay}}
    horizontalBeamOffset={${lfHorizontalBeamOffset}}
    verticalBeamOffset={${lfVerticalBeamOffset}}
  />
</div>`;
    }

    if (activeBg === 'rays') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <LightRays
    raysOrigin="${lrOrigin}"
    raysColor="${rayColorVal}"
    raysSpeed={${lrSpeed}}
    lightSpread={${lrSpread}}
    rayLength={${lrLength}}
    pulsating={${lrPulsating}}
    fadeDistance={${lrFadeDistance}}
    saturation={${lrSaturation}}
    followMouse={${lrFollowMouse}}
    mouseInfluence={${lrMouseInfluence}}
    noiseAmount={${lrNoise}}
    distortion={${lrDistortion}}
  />
</div>`;
    }

    if (activeBg === 'lines') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <FloatingLines
    linesGradient={[${colorsArrStr}]}
    animationSpeed={${flSpeed}}
    interactive={${flInteractive}}
    bendRadius={${flBendRadius}}
    bendStrength={${flBendStrength}}
    mouseDamping={${flMouseDamping}}
    parallax={${flParallax}}
    parallaxStrength={${flParallaxStrength}}
  />
</div>`;
    }

    if (activeBg === 'bends') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <ColorBends
    rotation={${cbRotation}}
    speed={${cbSpeed}}
    colors={[${colorsArrStr}]}
    transparent={${cbTransparent}}
    autoRotate={${cbAutoRotate}}
    scale={${cbScale}}
    frequency={${cbFrequency}}
    warpStrength={${cbWarpStrength}}
    mouseInfluence={${cbMouseInfluence}}
    parallax={${cbParallax}}
    noise={${cbNoise}}
    iterations={${cbIterations}}
    intensity={${cbIntensity}}
    bandWidth={${cbBandWidth}}
  />
</div>`;
    }

    if (activeBg === 'blinds') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <GradientBlinds
    gradientColors={[${colorsArrStr}]}
    angle={${angle}}
    noise={${noise}}
    blindCount={${blindCount}}
    blindMinWidth={${blindMinWidth}}
    mouseDampening={${mouseDampening}}
    mirrorGradient={${mirrorGradient}}
    spotlightRadius={${spotlightRadius}}
    spotlightSoftness={${spotlightSoftness}}
    spotlightOpacity={${spotlightOpacity}}
    distortAmount={${distortAmount}}
    shineDirection="${shineDirection}"
  />
</div>`;
    }

    if (activeBg === 'dot') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <DotField
    canvasBg="${canvasBg}"
    dotRadius={${dfDotRadius}}
    dotSpacing={${dfDotSpacing}}
    cursorRadius={${dfCursorRadius}}
    cursorForce={${dfCursorForce}}
    bulgeOnly={${dfBulgeOnly}}
    bulgeStrength={${dfBulgeStrength}}
    glowRadius={${dfGlowRadius}}
    sparkle={${dfSparkle}}
    waveAmplitude={${dfWaveAmplitude}}
    glowColor="${dfGlowColor}"
  />
</div>`;
    }

    if (activeBg === 'pb') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <ParticleBurst
    canvasBg="${canvasBg}"
    particleCount={${pbCount}}
    magnetRadius={${pbMagnetRadius}}
    ringRadius={${pbRingRadius}}
    waveSpeed={${pbWaveSpeed}}
    waveAmplitude={${pbWaveAmplitude}}
    particleSize={${pbParticleSize}}
    lerpSpeed={${pbLerpSpeed}}
    color="${colors[0]||'#ff9ffc'}"
    autoAnimate={${pbAutoAnimate}}
    particleVariance={${pbVariance}}
    rotationSpeed={${pbRotationSpeed}}
    depthFactor={${pbDepthFactor}}
    pulseSpeed={${pbPulseSpeed}}
    particleShape="${pbShape}"
    fieldStrength={${pbFieldStrength}}
  />
</div>`;
    }

    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode()); setCopied(true);
    showToast('Code copied!', 'success'); setTimeout(() => setCopied(false), 2000);
  };

  const PRESET_LABELS: Record<BackgroundType, string> = {
    blinds: 'Gradient Blinds', dot: 'Dot Field', pb: 'Particle Burst',
    bends: 'Color Bends', lines: 'Floating Lines', laser: 'Laser Flow', rays: 'Light Rays'
  };

  const showColorList = !['dot','laser','pb','rays'].includes(activeBg);
  const showSingleColor = ['dot','laser','pb','rays'].includes(activeBg);

  const hasCssTab = activeBg !== 'dot' && activeBg !== 'pb';

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full w-full bg-[#120f17] text-zinc-150 min-h-0 min-w-0 overflow-hidden select-none">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-[320px] bg-[#09090b] border-b md:border-b-0 md:border-r border-zinc-900/60 p-4 flex flex-col justify-between shrink-0 h-[40vh] md:h-full z-10 relative">
        <div className="flex-1 overflow-y-auto scrollbar-machined pr-1.5 space-y-5">
          {/* Dropdown */}
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-left font-mono font-bold text-xs text-white cursor-pointer focus:outline-none">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" /><span>{PRESET_LABELS[activeBg]}</span></div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl flex flex-col gap-0.5 z-50">
                {(['blinds','pb','bends','dot','lines','laser','rays'] as BackgroundType[]).map(id => (
                  <button key={id} onClick={() => { setActiveBg(id); setIsDropdownOpen(false); }}
                    className={cn('px-3 py-2 text-left rounded text-xs font-mono font-semibold transition-colors cursor-pointer w-full', activeBg === id ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-white')}>
                    {PRESET_LABELS[id]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4 pt-2 border-t border-zinc-900/60">
            {/* Canvas BG */}
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">Canvas BG</label>
              <div className="flex items-center gap-2">
                <input type="color" value={canvasBg} onChange={e => setCanvasBg(e.target.value)} className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden" />
                <input type="text" value={canvasBg} onChange={e => setCanvasBg(e.target.value)} className="w-20 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-center font-mono text-[10px] text-zinc-300" />
              </div>
            </div>

            {/* Hero Overlay Toggle */}
            <div className="flex items-center justify-between py-1 border-b border-zinc-900/60 pb-2">
              <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">Hero Overlay</label>
              <input type="checkbox" checked={showHeroOverlay} onChange={e => setShowHeroOverlay(e.target.checked)} className="cursor-pointer bg-zinc-900 border-zinc-800 rounded accent-violet-600" />
            </div>

            {/* Multi-color list */}
            {showColorList && (
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">Gradient Colors</label>
                <div className="space-y-1.5">
                  {colors.map((color, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-zinc-900/40 border border-zinc-900 rounded p-1.5">
                      <div className="flex items-center gap-2">
                        <input type="color" value={color} onChange={e => handleUpdateColor(idx, e.target.value)} className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden" />
                        <input type="text" value={color} onChange={e => handleUpdateColor(idx, e.target.value)} className="w-16 bg-transparent border-0 outline-none font-mono text-[10px] text-zinc-350" />
                      </div>
                      {colors.length > 1 && <button onClick={() => handleRemoveColor(idx)} className="p-1 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 rounded cursor-pointer"><Trash2 className="w-3 h-3" /></button>}
                    </div>
                  ))}
                </div>
                {colors.length < 5 && (
                  <button onClick={handleAddColor} className="flex items-center justify-center gap-1.5 w-full py-1.5 border border-dashed border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/20 rounded font-mono text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
                    <Plus className="w-3 h-3" /><span>Add Color</span>
                  </button>
                )}
              </div>
            )}

            {/* Single color */}
            {showSingleColor && (
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">{activeBg === 'rays' ? 'Rays Color' : 'Color'}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={colors[0]||'#ffffff'} onChange={e => handleUpdateColor(0, e.target.value)} className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden" />
                  <input type="text" value={colors[0]||'#ffffff'} onChange={e => handleUpdateColor(0, e.target.value)} className="w-20 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-center font-mono text-[10px] text-zinc-300" />
                </div>
              </div>
            )}

            {/* BLINDS */}
            {activeBg === 'blinds' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <Slider label="Angle" min={0} max={360} step={1} value={angle} onChange={setAngle} />
                <Slider label="Noise" min={0} max={1} step={0.01} value={noise} onChange={setNoise} decimals={2} />
                <Slider label="Blind Count" min={4} max={32} step={1} value={blindCount} onChange={setBlindCount} />
                <Slider label="Blind Min Width" min={10} max={150} step={1} value={blindMinWidth} onChange={setBlindMinWidth} />
                <Slider label="Mouse Dampening" min={0.01} max={0.99} step={0.01} value={mouseDampening} onChange={setMouseDampening} decimals={2} />
                <Slider label="Spotlight Radius" min={0.1} max={2} step={0.05} value={spotlightRadius} onChange={setSpotlightRadius} decimals={2} />
                <Slider label="Spotlight Softness" min={0.1} max={3} step={0.05} value={spotlightSoftness} onChange={setSpotlightSoftness} decimals={2} />
                <Slider label="Spotlight Opacity" min={0} max={1} step={0.05} value={spotlightOpacity} onChange={setSpotlightOpacity} decimals={2} />
                <Slider label="Distort Amount" min={0} max={5} step={0.05} value={distortAmount} onChange={setDistortAmount} decimals={2} />
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Mirror Gradient</span><input type="checkbox" checked={mirrorGradient} onChange={e => setMirrorGradient(e.target.checked)} className="cursor-pointer" /></div>
                <div><label className="block text-[10px] font-mono text-zinc-400 mb-1.5">Shine Direction</label><select value={shineDirection} onChange={e => setShineDirection(e.target.value as 'left' | 'right')} className="select-machined w-full py-1 px-2.5 bg-zinc-900 border-zinc-800 text-xs font-mono"><option value="left">Left</option><option value="right">Right</option></select></div>
              </div>
            )}

            {/* PARTICLE BURST */}
            {activeBg === 'pb' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <Slider label="Particle Count" min={50} max={500} step={1} value={pbCount} onChange={setPbCount} />
                <Slider label="Magnet Radius" min={1} max={40} step={1} value={pbMagnetRadius} onChange={setPbMagnetRadius} />
                <Slider label="Ring Radius" min={0} max={100} step={1} value={pbRingRadius} onChange={setPbRingRadius} />
                <Slider label="Wave Speed" min={0} max={2} step={0.05} value={pbWaveSpeed} onChange={setPbWaveSpeed} decimals={2} />
                <Slider label="Wave Amplitude" min={0} max={5} step={0.1} value={pbWaveAmplitude} onChange={setPbWaveAmplitude} decimals={2} />
                <Slider label="Particle Size" min={0.5} max={10} step={0.1} value={pbParticleSize} onChange={setPbParticleSize} decimals={2} />
                <Slider label="Lerp Speed" min={0.01} max={0.5} step={0.01} value={pbLerpSpeed} onChange={setPbLerpSpeed} decimals={2} />
                <Slider label="Particle Variance" min={0} max={3} step={0.1} value={pbVariance} onChange={setPbVariance} decimals={2} />
                <Slider label="Rotation Speed" min={0} max={5} step={0.1} value={pbRotationSpeed} onChange={setPbRotationSpeed} decimals={2} />
                <Slider label="Depth Factor" min={0.1} max={4} step={0.1} value={pbDepthFactor} onChange={setPbDepthFactor} decimals={2} />
                <Slider label="Pulse Speed" min={0} max={10} step={0.1} value={pbPulseSpeed} onChange={setPbPulseSpeed} decimals={2} />
                <Slider label="Field Strength" min={1} max={30} step={1} value={pbFieldStrength} onChange={setPbFieldStrength} />
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Auto Animate</span><input type="checkbox" checked={pbAutoAnimate} onChange={e => setPbAutoAnimate(e.target.checked)} className="cursor-pointer" /></div>
                <div><label className="block text-[10px] font-mono text-zinc-400 mb-1.5">Particle Shape</label><select value={pbShape} onChange={e => setPbShape(e.target.value as 'capsule' | 'circle' | 'square')} className="select-machined w-full py-1 px-2.5 bg-zinc-900 border-zinc-800 text-xs font-mono"><option value="capsule">Capsule</option><option value="circle">Circle</option><option value="square">Square</option></select></div>
              </div>
            )}

            {/* COLOR BENDS */}
            {activeBg === 'bends' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <Slider label="Speed" min={0} max={2} step={0.05} value={cbSpeed} onChange={setCbSpeed} decimals={2} />
                <Slider label="Auto Rotate" min={0} max={5} step={0.1} value={cbAutoRotate} onChange={setCbAutoRotate} decimals={2} />
                <Slider label="Scale" min={0.1} max={3} step={0.05} value={cbScale} onChange={setCbScale} decimals={2} />
                <Slider label="Frequency" min={0.1} max={5} step={0.1} value={cbFrequency} onChange={setCbFrequency} decimals={2} />
                <Slider label="Warp Strength" min={0} max={5} step={0.1} value={cbWarpStrength} onChange={setCbWarpStrength} decimals={2} />
                <Slider label="Mouse Influence" min={0} max={2} step={0.1} value={cbMouseInfluence} onChange={setCbMouseInfluence} decimals={2} />
                <Slider label="Parallax" min={0} max={2} step={0.1} value={cbParallax} onChange={setCbParallax} decimals={2} />
                <Slider label="Noise" min={0} max={2} step={0.05} value={cbNoise} onChange={setCbNoise} decimals={2} />
                <Slider label="Iterations" min={1} max={4} step={1} value={cbIterations} onChange={setCbIterations} />
                <Slider label="Intensity" min={0.1} max={5} step={0.1} value={cbIntensity} onChange={setCbIntensity} decimals={2} />
                <Slider label="Band Width" min={2} max={20} step={0.5} value={cbBandWidth} onChange={setCbBandWidth} decimals={2} />
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Transparent BG</span><input type="checkbox" checked={cbTransparent} onChange={e => setCbTransparent(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}

            {/* DOT FIELD */}
            {activeBg === 'dot' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <Slider label="Dot Radius" min={0.5} max={12} step={0.1} value={dfDotRadius} onChange={setDfDotRadius} decimals={2} />
                <Slider label="Dot Spacing" min={8} max={60} step={1} value={dfDotSpacing} onChange={setDfDotSpacing} />
                <Slider label="Cursor Radius" min={100} max={800} step={20} value={dfCursorRadius} onChange={setDfCursorRadius} />
                <Slider label="Cursor Force" min={0} max={1} step={0.02} value={dfCursorForce} onChange={setDfCursorForce} decimals={2} />
                <Slider label="Bulge Strength" min={10} max={200} step={1} value={dfBulgeStrength} onChange={setDfBulgeStrength} />
                <Slider label="Glow Radius" min={50} max={300} step={1} value={dfGlowRadius} onChange={setDfGlowRadius} />
                <Slider label="Wave Amplitude" min={0} max={50} step={1} value={dfWaveAmplitude} onChange={setDfWaveAmplitude} />
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Bulge Only</span><input type="checkbox" checked={dfBulgeOnly} onChange={e => setDfBulgeOnly(e.target.checked)} className="cursor-pointer" /></div>
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Sparkle</span><input type="checkbox" checked={dfSparkle} onChange={e => setDfSparkle(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}

            {/* FLOATING LINES */}
            {activeBg === 'lines' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <Slider label="Animation Speed" min={0.1} max={3} step={0.1} value={flSpeed} onChange={setFlSpeed} decimals={2} />
                <Slider label="Bend Radius" min={1} max={15} step={0.5} value={flBendRadius} onChange={setFlBendRadius} decimals={2} />
                <Slider label="Bend Strength" min={-2} max={2} step={0.1} value={flBendStrength} onChange={setFlBendStrength} decimals={2} />
                <Slider label="Mouse Dampening" min={0.01} max={0.5} step={0.01} value={flMouseDamping} onChange={setFlMouseDamping} decimals={2} />
                <Slider label="Parallax Strength" min={0} max={1} step={0.05} value={flParallaxStrength} onChange={setFlParallaxStrength} decimals={2} />
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Interactive</span><input type="checkbox" checked={flInteractive} onChange={e => setFlInteractive(e.target.checked)} className="cursor-pointer" /></div>
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Parallax</span><input type="checkbox" checked={flParallax} onChange={e => setFlParallax(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}

            {/* LASER FLOW */}
            {activeBg === 'laser' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <Slider label="Flow Speed" min={0.05} max={2} step={0.05} value={lfFlowSpeed} onChange={setLfFlowSpeed} decimals={2} />
                <Slider label="Vertical Sizing" min={0.5} max={2} step={0.05} value={lfVerticalSizing} onChange={setLfVerticalSizing} decimals={2} />
                <Slider label="Horizontal Sizing" min={0.1} max={2} step={0.05} value={lfHorizontalSizing} onChange={setLfHorizontalSizing} decimals={2} />
                <Slider label="Fog Intensity" min={0} max={1} step={0.05} value={lfFogIntensity} onChange={setLfFogIntensity} decimals={2} />
                <Slider label="Fog Scale" min={0.1} max={2} step={0.05} value={lfFogScale} onChange={setLfFogScale} decimals={2} />
                <Slider label="Beam Sway" min={0} max={30} step={1} value={lfWispSpeed} onChange={setLfWispSpeed} />
                <Slider label="Glow Intensity" min={0} max={20} step={0.5} value={lfWispIntensity} onChange={setLfWispIntensity} decimals={2} />
                <Slider label="Horizontal Beam Offset" min={-1} max={1} step={0.05} value={lfHorizontalBeamOffset} onChange={setLfHorizontalBeamOffset} decimals={2} />
                <Slider label="Vertical Beam Offset" min={-0.5} max={0.5} step={0.05} value={lfVerticalBeamOffset} onChange={setLfVerticalBeamOffset} decimals={2} />
              </div>
            )}

            {/* LIGHT RAYS */}
            {activeBg === 'rays' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <div><label className="block text-[10px] font-mono text-zinc-400 mb-1.5">Rays Origin</label><select value={lrOrigin} onChange={e => setLrOrigin(e.target.value as 'top-center'|'center'|'top-left'|'top-right')} className="select-machined w-full py-1 px-2.5 bg-zinc-900 border-zinc-800 text-xs font-mono"><option value="top-center">Top Center</option><option value="center">Center</option><option value="top-left">Top Left</option><option value="top-right">Top Right</option></select></div>
                <Slider label="Rays Speed" min={0.1} max={3} step={0.1} value={lrSpeed} onChange={setLrSpeed} decimals={2} />
                <Slider label="Light Spread" min={0.2} max={2} step={0.05} value={lrSpread} onChange={setLrSpread} decimals={2} />
                <Slider label="Ray Length" min={0.5} max={4} step={0.1} value={lrLength} onChange={setLrLength} decimals={2} />
                <Slider label="Fade Distance" min={0.2} max={2.5} step={0.1} value={lrFadeDistance} onChange={setLrFadeDistance} decimals={2} />
                <Slider label="Saturation" min={0} max={1} step={0.05} value={lrSaturation} onChange={setLrSaturation} decimals={2} />
                <Slider label="Mouse Influence" min={0.01} max={0.5} step={0.01} value={lrMouseInfluence} onChange={setLrMouseInfluence} decimals={2} />
                <Slider label="Noise Amount" min={0} max={1} step={0.05} value={lrNoise} onChange={setLrNoise} decimals={2} />
                <Slider label="Distortion" min={0} max={1} step={0.05} value={lrDistortion} onChange={setLrDistortion} decimals={2} />
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Pulsating</span><input type="checkbox" checked={lrPulsating} onChange={e => setLrPulsating(e.target.checked)} className="cursor-pointer" /></div>
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Follow Mouse</span><input type="checkbox" checked={lrFollowMouse} onChange={e => setLrFollowMouse(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="space-y-2 mt-6 pt-4 border-t border-zinc-900/65 shrink-0 bg-black/80">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={handleReset} className="flex items-center justify-center gap-1.5 py-2 px-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors"><RotateCcw className="w-3.5 h-3.5 text-zinc-500" /><span>Reset</span></button>
            <button onClick={handleShare} className="flex items-center justify-center gap-1.5 py-2 px-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors"><Share2 className="w-3.5 h-3.5 text-zinc-500" /><span>Share</span></button>
          </div>
          <button onClick={() => { setActiveExportTab('usage'); setIsExportOpen(true); }} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-mono font-semibold text-xs transition-colors cursor-pointer">
            <Code className="w-4 h-4" /><span>Export Code</span>
          </button>
        </div>
      </div>

      {/* CANVAS PREVIEW */}
      <div ref={canvasParentRef} style={{ backgroundColor: canvasBg }} className="flex-1 h-auto md:h-full min-w-0 relative z-0 overflow-hidden transition-colors duration-300">
        {activeBg === 'blinds' && <GradientBlinds gradientColors={colors} angle={angle} noise={noise} blindCount={blindCount} blindMinWidth={blindMinWidth} mouseDampening={mouseDampening} mirrorGradient={mirrorGradient} spotlightRadius={spotlightRadius} spotlightSoftness={spotlightSoftness} spotlightOpacity={spotlightOpacity} distortAmount={distortAmount} shineDirection={shineDirection} />}
        {activeBg === 'pb' && <ParticleBurst canvasBg={canvasBg} particleCount={pbCount} magnetRadius={pbMagnetRadius} ringRadius={pbRingRadius} waveSpeed={pbWaveSpeed} waveAmplitude={pbWaveAmplitude} particleSize={pbParticleSize} lerpSpeed={pbLerpSpeed} color={colors[0]||'#ff9ffc'} autoAnimate={pbAutoAnimate} particleVariance={pbVariance} rotationSpeed={pbRotationSpeed} depthFactor={pbDepthFactor} pulseSpeed={pbPulseSpeed} particleShape={pbShape} fieldStrength={pbFieldStrength} />}
        {activeBg === 'bends' && <ColorBends rotation={cbRotation} speed={cbSpeed} colors={colors} transparent={cbTransparent} autoRotate={cbAutoRotate} scale={cbScale} frequency={cbFrequency} warpStrength={cbWarpStrength} mouseInfluence={cbMouseInfluence} parallax={cbParallax} noise={cbNoise} iterations={cbIterations} intensity={cbIntensity} bandWidth={cbBandWidth} />}
        {activeBg === 'dot' && <DotField canvasBg={canvasBg} dotRadius={dfDotRadius} dotSpacing={dfDotSpacing} cursorRadius={dfCursorRadius} cursorForce={dfCursorForce} bulgeOnly={dfBulgeOnly} bulgeStrength={dfBulgeStrength} glowRadius={dfGlowRadius} sparkle={dfSparkle} waveAmplitude={dfWaveAmplitude} glowColor={dfGlowColor} />}
        {activeBg === 'lines' && <div className="absolute inset-0"><FloatingLines linesGradient={colors} animationSpeed={flSpeed} interactive={flInteractive} bendRadius={flBendRadius} bendStrength={flBendStrength} mouseDamping={flMouseDamping} parallax={flParallax} parallaxStrength={flParallaxStrength} /></div>}
        {activeBg === 'laser' && <LaserFlow color={colors[0]||'#FF79C6'} wispDensity={lfWispDensity} flowSpeed={lfFlowSpeed} verticalSizing={lfVerticalSizing} horizontalSizing={lfHorizontalSizing} fogIntensity={lfFogIntensity} fogScale={lfFogScale} wispSpeed={lfWispSpeed} wispIntensity={lfWispIntensity} flowStrength={lfFlowStrength} decay={lfDecay} horizontalBeamOffset={lfHorizontalBeamOffset} verticalBeamOffset={lfVerticalBeamOffset} />}
        {activeBg === 'rays' && <LightRays raysOrigin={lrOrigin} raysColor={colors[0]||'#ffffff'} raysSpeed={lrSpeed} lightSpread={lrSpread} rayLength={lrLength} pulsating={lrPulsating} fadeDistance={lrFadeDistance} saturation={lrSaturation} followMouse={lrFollowMouse} mouseInfluence={lrMouseInfluence} noiseAmount={lrNoise} distortion={lrDistortion} />}

        {/* Mock Hero Landing Page Overlay from Image Reference */}
        {showHeroOverlay && (
          <div className="absolute inset-0 flex flex-col p-6 md:p-8 z-[2] pointer-events-none select-none text-white">
            {/* Header Navbar */}
            <div className="w-full max-w-4xl mx-auto flex items-center justify-between bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md rounded-lg h-12 px-4 pointer-events-none select-none shrink-0 mb-4">
              {/* Logo & Navigation */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-bold tracking-widest text-white uppercase">
                  ONYX
                </span>
                <div className="w-px h-4 bg-zinc-800" />
                <nav className="flex items-center gap-1.5">
                  <span className="text-xs font-mono px-2.5 py-1 rounded text-white bg-zinc-900">Home</span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded text-zinc-400">Tools</span>
                </nav>
              </div>
              
              {/* Github Link */}
              <div className="flex items-center">
                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none max-w-2xl mx-auto text-center">
              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-3xl mb-6 text-white text-center font-sans">
                Your shortcut to everything.
              </h1>
              
              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed text-center font-sans">
                A collection of powerful developer tools all within an extendable workspace.
                <br />
                Fast, local and reliable.
              </p>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button 
          onClick={() => setShowHeroOverlay(!showHeroOverlay)} 
          className="absolute bottom-4 right-4 bg-black/60 border border-zinc-800/80 hover:bg-zinc-900 hover:text-white backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-mono text-zinc-350 font-bold uppercase select-none z-10 transition-colors cursor-pointer"
        >
          {showHeroOverlay ? 'Hide Hero Overlay' : 'Show Hero Overlay'}
        </button>
      </div>

      {/* EXPORT MODAL */}
      {isExportOpen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in-0 duration-200">
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl w-full max-w-2xl h-[480px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
              <div className="flex items-center gap-2"><Code className="w-4 h-4 text-violet-500" /><span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-200">Export Background Code</span></div>
              <button onClick={() => setIsExportOpen(false)} className="p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-zinc-200 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900">
              <div className="flex gap-1">
                {(['cli','usage','component', 'css'] as const).map(tab => {
                  if (tab === 'css' && !hasCssTab) return null;
                  return (
                    <button key={tab} onClick={() => setActiveExportTab(tab)} className={cn('px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors', activeExportTab === tab ? 'bg-zinc-900 text-zinc-100 font-bold border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300')}>
                      {tab === 'cli' ? 'CLI Installation' : tab === 'usage' ? 'Component Usage' : tab === 'component' ? 'Component Source (.tsx)' : 'CSS Style (.css)'}
                    </button>
                  );
                })}
              </div>
              <button onClick={handleCopyCode} className="flex items-center gap-1.5 px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-[10px] font-mono text-white cursor-pointer transition-colors">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}<span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="flex-1 bg-black p-4 overflow-auto font-mono text-xs text-zinc-400 select-text"><pre>{getExportCode()}</pre></div>
          </div>
        </div>
      )}
    </div>
  );
}
