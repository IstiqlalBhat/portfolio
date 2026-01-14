# Three.js WebGL Background

This document describes the interactive Three.js background used in the Portfolio application.

## Overview

The `NetflixWebGLBackground` component creates an immersive, Netflix-inspired particle system with a rotating wireframe icosahedron. Built with Three.js, it features:

- **Floating red particles** that drift toward the viewer
- **Wireframe icosahedron** that slowly rotates in the background
- **Mouse-tracking camera** that responds to pointer movement
- **Adaptive performance** based on device capabilities

## Key Features

### 🎨 Visual Effects
- **1100+ particles** (adjustable based on device tier)
- **Additive blending** for a glowing effect
- **Exponential fog** for depth perception
- **Netflix signature red** color scheme (`#E50914`)

### ⚡ Performance Optimization
The component automatically adapts to device capabilities:

| Device Tier | Particle Count | Frame Rate | Antialiasing |
|-------------|---------------|------------|--------------|
| Very Low    | 380           | 24 FPS     | Off          |
| Low         | 650           | 30 FPS     | Off          |
| High        | 1100          | 60 FPS     | On           |

### 🖱️ Interactivity
- Camera smoothly follows mouse movement
- Parallax effect creates depth
- Respects `prefers-reduced-motion` for accessibility

## Technical Implementation

### Three.js Components Used
- `WebGLRenderer` - Hardware-accelerated rendering
- `PerspectiveCamera` - 45° FOV for natural perspective
- `BufferGeometry` - Efficient particle positioning
- `PointsMaterial` - GPU-accelerated particle rendering
- `IcosahedronGeometry` - 20-faced polyhedron for wireframe

### Performance Features
- **Deferred initialization** on slow networks/devices
- **Visibility API integration** - pauses when tab is hidden
- **Proper cleanup** - disposes all GPU resources on unmount
- **RequestAnimationFrame throttling** for consistent frame rates

## File Location

```
src/components/
├── NetflixWebGLBackground.jsx  # Main component
└── NetflixWebGLBackground.css  # Styling
```

## Usage

```jsx
import NetflixWebGLBackground from './components/NetflixWebGLBackground';

function App() {
  return (
    <div>
      <NetflixWebGLBackground />
      {/* Your content here */}
    </div>
  );
}
```

---

*Last updated: January 2026*
