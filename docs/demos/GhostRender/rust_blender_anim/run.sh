#!/bin/bash
set -e

echo "🦀 Building Rust application..."
cargo build --release

echo ""
echo "🎬 Running video generation pipeline..."
cargo run --release

echo ""
echo "✅ Pipeline complete!"
echo ""

# Check if video was generated (with Blender installed)
if [ -f "render_output.mp4" ] || [ -f "render_output0001-0060.mp4" ]; then
    echo "🎥 Video output found!"
    ls -lh render_output*.mp4 2>/dev/null || true
else
    echo "⚠️  Video not rendered (Blender may not be installed)"
    echo "📝 Python script generated: generated_script.py"
fi
