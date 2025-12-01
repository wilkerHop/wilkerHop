# Scripts

This directory contains utility scripts for running and testing the application.

## Scripts Overview

### `run.sh`

Builds and runs the complete video generation pipeline.

**Usage**:
```bash
./run.sh
```

**What it does**:
- Builds the Rust application in release mode
- Runs the video generation
- Checks for video output
- Reports status

### `health_check.sh`

Runs comprehensive health checks on the project.

**Usage**:
```bash
./health_check.sh
```

**What it checks**:
1. ✓ Rust installation (`cargo --version`)
2. ✓ Project structure (`Cargo.toml`, `src/main.rs`)
3. ✓ Build status (`cargo check`)
4. ✓ Blender installation (optional)
5. ✓ Script generation functionality

**Exit codes**:
- `0` - All checks passed
- `1` - One or more checks failed

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that automates testing and video rendering.

### Workflow Jobs

#### 1. Health Checks

Runs on every push and PR:
- Installs Rust toolchain
- Caches dependencies
- Runs `health_check.sh`
- Runs `cargo clippy` with warnings as errors
- Runs `cargo test`

#### 2. Build and Render Video

Runs after health checks pass:
- Installs Blender 3.6 LTS on Ubuntu
- Builds the Rust application
- Generates the Python script
- Renders the video
- Uploads artifacts:
  - **rendered-video**: Final MP4 animation (30-day retention)
  - **generated-script**: Python script (7-day retention)

### Triggering the Pipeline

The workflow runs automatically on:
- Push to `main` or `master` branches
- Pull requests to `main` or `master`
- Manual trigger via GitHub Actions UI

### Accessing Artifacts

1. Go to the Actions tab in your GitHub repository
2. Click on a workflow run
3. Scroll to the "Artifacts" section at the bottom
4. Download `rendered-video` to get the MP4 file

### Auto-Issue on Failure Workflow

This project includes an automated issue creation system (`.github/workflows/auto-issue-on-failure.yml`) that:

**Triggers when**: The CI Pipeline workflow fails

**Actions taken**:
1. Extracts failure information (workflow name, run number, branch, commit)
2. Checks for existing open issues with the same workflow and branch
3. Either:
   - Creates a new issue with the `ci-failure`, `bug`, and `automated` labels
   - Or adds a comment to an existing issue if one already exists

**Issue includes**:
- 🚨 Descriptive title: `🔴 CI Failure: [Workflow] #[Run] on [Branch]`
- 📊 Details table with workflow info, run number, commit SHA, and actor
- 🔗 Direct link to the failed workflow run
- 🔍 Investigation steps and common failure points
- 📋 Checklist for fixing and closing the issue

**Benefits**:
- ✅ Automatic tracking of CI failures
- ✅ No duplicate issues for the same workflow/branch
- ✅ Clear, actionable investigation steps
- ✅ Links to relevant runs and commits

### Local Simulation

To simulate the CI pipeline locally:

```bash
# Run health checks (like CI does)
./health_check.sh

# Build in release mode (like CI does)
cargo build --release

# Run the application
cargo run --release

# If you have Blender installed, render manually
blender -b -P generated_script.py -a
```

## Development Workflow

### Before Committing

```bash
# 1. Run health checks
./health_check.sh

# 2. Run Clippy
cargo clippy -- -D warnings

# 3. Run tests
cargo test

# 4. Test the application
./run.sh
```

### Making Changes

1. Edit `src/main.rs` or configuration constants
2. Run health checks: `./health_check.sh`
3. Test locally: `./run.sh`
4. Commit and push
5. CI will automatically validate and generate video

## Troubleshooting Scripts

### Permission Denied

If you get "Permission denied":
```bash
chmod +x run.sh health_check.sh
```

### Health Check Fails

Check the specific step that failed:
- **Rust not found**: Install via `rustup`
- **Build failed**: Run `cargo check` to see errors
- **Blender not found**: This is optional for script generation

### CI Pipeline Fails

Check the GitHub Actions logs:
1. Go to Actions tab
2. Click the failed run
3. Expand the failed step to see error details

Common issues:
- **Blender download fails**: Check internet connectivity in CI
- **Rendering timeout**: Video might be too complex (increase frames/cubes)
- **Artifact upload fails**: Check artifact size limits
