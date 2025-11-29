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

echo ""
echo "✅ All health checks passed!"
