#!/bin/bash
set -e

echo "🔍 Running health checks..."
echo ""

# Check 1: Rust installation
echo "✓ Checking Rust installation..."
if command -v cargo &> /dev/null; then
    RUST_VERSION=$(cargo --version)
    echo "  ✅ Rust found: $RUST_VERSION"
else
    echo "  ❌ Rust not found"
    exit 1
fi

# Check 2: Project structure
echo "✓ Checking project structure..."
if [ -f "Cargo.toml" ] && [ -f "src/main.rs" ]; then
    echo "  ✅ Project files present"
else
    echo "  ❌ Missing project files"
    exit 1
fi

# Check 3: Build check
echo "✓ Checking if project builds..."
if cargo check --quiet 2>&1; then
    echo "  ✅ Project compiles successfully"
else
    echo "  ❌ Build failed"
    exit 1
fi

# Check 4: Blender installation (optional)
echo "✓ Checking Blender installation..."
if command -v blender &> /dev/null; then
    BLENDER_VERSION=$(blender --version 2>&1 | head -n 1)
    echo "  ✅ Blender found: $BLENDER_VERSION"
elif [ -f "/Applications/Blender.app/Contents/MacOS/Blender" ]; then
    BLENDER_VERSION=$(/Applications/Blender.app/Contents/MacOS/Blender --version 2>&1 | head -n 1)
    echo "  ✅ Blender found (macOS): $BLENDER_VERSION"
else
    echo "  ⚠️  Blender not found (video rendering will be skipped)"
fi

# Check 5: Test run (dry run - just generate script)
echo "✓ Testing script generation..."
if cargo run --quiet -- --generate-only 2>&1 | grep -q "Python script generated successfully"; then
    echo "  ✅ Script generation works"
    if [ -f "setup_scene.py" ]; then
        SCRIPT_SIZE=$(wc -c < setup_scene.py)
        echo "  ✅ Generated script: $SCRIPT_SIZE bytes"
    fi
else
    echo "  ❌ Script generation failed"
    exit 1
fi

# Check 6: Audio validation
echo "✓ Validating generated audio file..."
if [ ! -f "audio.wav" ]; then
    echo "  ❌ audio.wav not found"
    exit 1
fi

# Check file size (should be ~2.6MB for 30s audio at 44.1kHz, 16-bit, mono)
AUDIO_SIZE=$(wc -c <audio.wav)
MIN_SIZE=$((2000000))  # 2MB minimum
MAX_SIZE=$((3000000))  # 3MB maximum

if [ "$AUDIO_SIZE" -lt "$MIN_SIZE" ] || [ "$AUDIO_SIZE" -gt "$MAX_SIZE" ]; then
    echo "  ❌ Audio file size unexpected: $AUDIO_SIZE bytes (expected ~2.6MB)"
    exit 1
fi
echo "  ✅ Audio file size: $AUDIO_SIZE bytes"

# Validate WAV header (RIFF/WAVE magic bytes)
HEADER=$(hexdump -n 12 -e '12/1 "%c"' audio.wav 2>/dev/null)
if [[ "$HEADER" != RIFF*WAVE ]]; then
    echo "  ❌ Invalid WAV header (missing RIFF/WAVE magic bytes)"
    exit 1
fi
echo "  ✅ Valid WAV header detected"

# Check if file command recognizes it as audio
if command -v file &> /dev/null; then
    FILE_TYPE=$(file audio.wav)
    if [[ "$FILE_TYPE" == *"WAVE audio"* ]] || [[ "$FILE_TYPE" == *"RIFF"* ]]; then
        echo "  ✅ File recognized as WAV audio"
    else
        echo "  ⚠️  File type check inconclusive: $FILE_TYPE"
    fi
fi


echo ""
echo "✅ All health checks passed!"
