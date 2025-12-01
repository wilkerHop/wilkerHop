# Rust + Blender Video Generation PoC 

A proof-of-concept application demonstrating how to use Rust for high-performance calculations and Blender for video rendering.

## Architecture

This project uses a **Pipeline Approach**:

1. **Rust**: Performs complex mathematical calculations (sine wave animations) and generates a Python script
2. **Blender (Headless)**: Executes the generated script in the background to render the final video

This architecture offloads computational tasks to Rust while leveraging Blender's powerful rendering capabilities.

## Features

- ✅ **10 animated cubes** with sine wave motion patterns
- ✅ **60 frames** of smooth animation
- ✅ **Pre-calculated keyframes** - all math done in Rust for performance
- ✅ **Automatic Blender detection** - supports macOS, Linux, and Windows
- ✅ **Headless rendering** - runs without GUI
- ✅ **MPEG4/H264 output** - ready-to-share video format

## Prerequisites

1. **Rust & Cargo**: Install via [rustup](https://rustup.rs/)
2. **Blender**: Download from [blender.org](https://www.blender.org/download/)

### Blender PATH Setup

The application will automatically search for Blender at common locations:

- **macOS**: `/Applications/Blender.app/Contents/MacOS/Blender`
- **Linux**: `/usr/bin/blender`
- **Windows**: `C:\Program Files\Blender Foundation\Blender 3.x\blender.exe`

If Blender is not found, the Python script will still be generated and you can run it manually.

## Usage

### Using Run Scripts

```bash
# Run health checks
./health_check.sh

# Build and run the application
./run.sh
```

### Manual Execution

```bash
# Build the project
cargo build --release

# Run the application
cargo run
```

### CI/CD Pipeline

This project includes a GitHub Actions workflow that:

1. **Health Checks Job**
   - Validates Rust installation
   - Checks project structure
   - Runs `cargo check`, `clippy`, and tests
   - Executes health check script

2. **Build and Render Job**
   - Installs Blender 3.6 LTS
   - Builds the Rust application
   - Generates the Python script
   - Renders the video with Blender
   - Uploads video and script as artifacts

**Artifacts produced**:
- `rendered-video` - The final MP4 animation (30 day retention)
- `generated-script` - The Python script for Blender (7 day retention)

**Automated Issue Creation**:
- If the CI fails, a GitHub issue is automatically created
- Issues include failure details, investigation steps, and direct links to logs
- Prevents duplicate issues for the same workflow and branch

To enable the CI pipeline, push the code to GitHub and the workflow will run automatically on push/PR to main/master branches.

## What Happens

1. 🦀 **Rust calculates** animation data (sine wave positions for each cube at each frame)
2. 📝 **Generates** `generated_script.py` with all keyframes pre-calculated
3. 🎥 **Launches Blender** in headless mode to render the animation
4. ✅ **Outputs** `render_output.mp4` (or similar) in the project directory

### Manual Rendering

If Blender is not in your PATH or you want to run the script manually:

```bash
blender -b -P generated_script.py -a
```

## Configuration

You can customize the animation by editing constants in `src/main.rs`:

```rust
const NUM_CUBES: i32 = 10;              // Number of cubes
const FRAMES: i32 = 60;                 // Animation duration in frames
const OUTPUT_FILENAME: &str = "generated_script.py";  // Script filename
const RENDER_OUTPUT: &str = "//render_output";        // Video output path
```

## How It Works

### The Math (Rust)

For each cube `i` and each frame `f`, the Z position is calculated as:

```rust
let time_step = frame as f32 * 0.2;
let offset = cube_index as f32 * 0.5;
let z_pos = (time_step + offset).sin() * 3.0;
```

This creates a **wave effect** where each cube is phase-shifted from the previous one.

### The Rendering (Blender)

The generated Python script:
1. Clears the default scene
2. Creates cubes at calculated positions
3. Inserts keyframes with pre-calculated values
4. Sets up camera and lighting
5. Configures render settings (Eevee engine, H264 codec)
6. Renders all frames to video

## Advanced: Binary Data Transfer

For very complex animations (millions of particles), writing text files becomes inefficient. A more professional approach:

1. Add `gltf` crate to `Cargo.toml`
2. Export mesh and animation data as `.glb` binary format in Rust
3. Import the GLTF file in Blender Python script: `bpy.ops.import_scene.gltf(filepath="animation.glb")`

## Troubleshooting

### "Failed to find Blender"

- Verify Blender is installed
- Check it's in your system PATH
- Or use the manual rendering command shown in the output

### Slow rendering

The script uses Eevee engine for speed. If it's still slow:
- Reduce `FRAMES` constant
- Reduce `NUM_CUBES` constant
- Check that Cycles engine isn't being used

## Example Output

The generated `generated_script.py` contains ~1270 lines with pre-calculated keyframes like:

```python
cube.location.z = 2.5244
cube.keyframe_insert(data_path='location', frame=5)
cube.location.z = 2.7961
cube.keyframe_insert(data_path='location', frame=6)
```

All these values were computed in Rust, not Python!

## License

This is a proof-of-concept project for educational purposes.
