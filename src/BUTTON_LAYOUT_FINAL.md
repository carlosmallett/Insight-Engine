# Button Layout - Insight Engine 2.0

## ✅ Final Configuration

### Bottom-Left Corner
**Position (Left to Right):**

1. **Saved Research** (`left-6`, z-30)
   - Purple gradient button with bookmark icon
   - Shows saved papers count
   - Larger, prominent design

2. **AI Assistant** (`left-40`, z-40)  
   - Circular frosted glass button
   - MessageCircle icon
   - Chat interface for research queries

3. **Help Center** (`left-[280px]`, z-40)
   - Circular frosted glass button
   - HelpCircle icon
   - Documentation and shortcuts

---

### Bottom-Right Corner
**Position (Right to Left):**

1. **Map** (`right-6`, z-50) ← **Rightmost**
   - Circular frosted glass button
   - Map icon
   - Toggles world map view

2. **Music Player** (`right-20`, z-50) ← **Middle**
   - Circular frosted glass button
   - Music note icon
   - Focus music controls

---

## 🎯 Z-Index Hierarchy

- **z-50**: Map, Music Player buttons (top layer - always visible)
- **z-40**: AI Assistant, Help buttons, Music Player panel
- **z-30**: Saved Research button

This ensures:
- Music and Map buttons stay visible above all panels
- Music panel doesn't block the buttons
- Proper layering for overlays

---

## 📐 Spacing Details

### Bottom-Left
- Saved Research to AI Assistant: 136px (`left-6` to `left-40`)
- AI Assistant to Help: 240px (`left-40` to `left-[280px]`)

### Bottom-Right  
- Map to Music: 56px (`right-6` to `right-20`)

---

## 🎨 Visual Style

### Circular Buttons (AI, Help, Music, Map)
- Size: 56px × 56px (`w-14 h-14`)
- Background: `bg-black/60 backdrop-blur-xl`
- Border: `border border-white/30`
- Icons: 24px (`w-6 h-6`)
- Active state: `bg-white/10`

### Saved Research Button
- Unique purple gradient design
- Larger rectangular shape with text
- Animated badge showing count

---

## 🔄 Panel Behavior

### Music Player Panel
- Opens: `bottom-24 right-6` (above buttons)
- Width: 480px
- z-index: 40 (below buttons)

### AI Assistant Panel
- Opens: `bottom-20 left-0` (above AI button)
- Width: 384px
- z-index: Inherits from parent (40)

### Help Panel
- Opens: `bottom-20 left-0` (above Help button)
- Width: 384px
- z-index: Inherits from parent (40)

---

## ✨ Features

### Bottom-Left Group
- **Saved Research**: Paper management with folders
- **AI Assistant**: Conversational research help
- **Help Center**: Keyboard shortcuts and guides

### Bottom-Right Group
- **Music Player**: 5 albums, 43 tracks, full controls
- **Map**: World map navigation of research zones

---

## 🎵 Music Player Icon Variants

Current: `MusicPlayerButton.tsx` (Music note)

**Available alternatives:**
- `MusicPlayerButton_Alt1.tsx` - Large musical note
- `MusicPlayerButton_Alt2.tsx` - Musical staff with note
- `MusicPlayerButton_Alt3.tsx` - Animated waveform
- `MusicPlayerButton_Alt4.tsx` - Spinning vinyl record

All positioned at `right-20` with z-50

---

## 🚀 Summary

The interface now has a clean, balanced layout:
- **Left side**: Research management and help features
- **Right side**: Navigation and ambient features
- All buttons have proper z-index layering
- Panels open without blocking interactive elements
