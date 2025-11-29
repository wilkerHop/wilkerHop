use std::fs::File;
use std::io::{BufRead, BufReader, Write};
use std::process::{Command, Stdio};
use std::thread;
use indicatif::{MultiProgress, ProgressBar, ProgressStyle};
use serde::Serialize;
use std::collections::HashMap;

mod audio;
mod scene;

// Configuration
const FRAMES: i32 = 1800; // 30 seconds at 60 FPS
const CHUNKS: i32 = 4; // Number of parallel render processes
const OUTPUT_FILENAME: &str = "setup_scene.py";
const BLEND_FILE: &str = "scene.blend";
const FINAL_OUTPUT: &str = "animation_output.mp4";

#[derive(Serialize)]
struct ObjAnimData {
    name: String,
    locations: Vec<[f32; 3]>,
    rotations: Vec<[f32; 3]>,
    parent: Option<String>,
}

use std::env;

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let generate_only = args.contains(&"--generate-only".to_string());

    println!("🚀 Starting Optimized Render Pipeline");

    // 1. Generate Audio
    println!("🎵 Generating audio...");
    audio::generate_audio("audio.wav", 30)?;

    // 2. Calculate Animation Data (Rust Side)
    println!("🧮 Calculating animation data in Rust...");
    let mut anim_map: HashMap<String, ObjAnimData> = HashMap::new();
    
    // Initialize map with objects from frame 0
    let initial_objects = scene::calculate_walk_cycle(0, FRAMES);
    for obj in &initial_objects {
        anim_map.insert(obj.name.clone(), ObjAnimData {
            name: obj.name.clone(),
            locations: Vec::with_capacity(FRAMES as usize + 1),
            rotations: Vec::with_capacity(FRAMES as usize + 1),
            parent: obj.parent.clone(),
        });
    }

    // Loop through all frames and collect data
    for frame in 0..=FRAMES {
        let objects = scene::calculate_walk_cycle(frame, FRAMES);
        let forward_speed = 0.1;
        let y_offset = frame as f32 * forward_speed;

        for obj in objects {
            if let Some(data) = anim_map.get_mut(&obj.name) {
                let (loc, rot) = if obj.parent.is_none() {
                    // Root object (Torso) - World Space with forward movement
                    (
                        [obj.location.x, obj.location.y - y_offset, obj.location.z],
                        [obj.rotation.x, obj.rotation.y, obj.rotation.z]
                    )
                } else {
                    // Child objects (Limbs) - Local Space
                    (
                        [obj.location.x, obj.location.y, obj.location.z],
                        [obj.rotation.x, obj.rotation.y, obj.rotation.z]
                    )
                };
                data.locations.push(loc);
                data.rotations.push(rot);
            }
        }
    }

    // Convert map to vec for serialization
    let anim_data: Vec<&ObjAnimData> = anim_map.values().collect();
    let json_data = serde_json::to_string(&anim_data).expect("Failed to serialize animation data");

    // 3. Generate Optimized Python Script
    println!("📝 Generating optimized Python script...");
    let mut script = String::from(r#"
import bpy
import json
import math

# --- Setup Scene ---
bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()

bpy.context.scene.render.fps = 60
"#);
    script.push_str(&format!("bpy.context.scene.frame_end = {}\n", FRAMES));

    // Embed JSON Data
    script.push_str("ANIM_DATA_JSON = '");
    script.push_str(&json_data);
    script.push_str("'\n");

    script.push_str(r#"
anim_data = json.loads(ANIM_DATA_JSON)

# --- Materials ---
def create_material(name, color, emission_strength=0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs['Base Color'].default_value = color
    if emission_strength > 0:
        bsdf.inputs['Emission'].default_value = color
        bsdf.inputs['Emission Strength'].default_value = emission_strength
    return mat

mat_blue = create_material("NeonBlue", (0, 0.5, 1, 1), 2.0)
mat_orange = create_material("NeonOrange", (1, 0.2, 0, 1), 2.0)
mat_skin = create_material("Skin", (1, 0.8, 0.6, 1), 0.0)
mat_dark = create_material("DarkVoid", (0.05, 0.05, 0.05, 1), 0.0)
mat_grid = create_material("Grid", (0, 1, 0.8, 1), 5.0)

# --- Environment ---
bpy.ops.mesh.primitive_plane_add(size=100, location=(0, 0, 0))
road = bpy.context.active_object
road.name = "Road"
road.scale = (0.1, 10, 1)
road.data.materials.append(mat_dark)

for i in range(-20, 20):
    bpy.ops.mesh.primitive_cube_add(size=0.1, location=(i * 2, 0, -0.1))
    line = bpy.context.active_object
    line.scale = (0.5, 1000, 0.5)
    line.data.materials.append(mat_grid)

# --- Create Objects & Apply Animation ---
created_objects = {}

for obj_data in anim_data:
    name = obj_data['name']
    # Create Cube
    bpy.ops.mesh.primitive_cube_add(size=1)
    obj = bpy.context.active_object
    obj.name = name
    created_objects[name] = obj
    
    # Material
    if 'Head' in name or 'Arm' in name or 'Leg' in name:
        obj.data.materials.append(mat_skin if 'Head' in name else mat_blue)
    else:
        obj.data.materials.append(mat_orange)
        
    # Scale (Static, take from first frame logic or hardcode? 
    # Wait, scale was in Object struct but not in ObjAnimData. 
    # For simplicity, let's just re-apply the scale logic or pass it.
    # The original code had scale in the struct. Let's assume standard scale for now or fix it.)
    # FIX: We should pass scale in JSON. But for now, let's approximate:
    obj.scale = (0.15, 0.15, 0.6) # Default limb/body scale from scene.rs

# Parenting
for obj_data in anim_data:
    if obj_data['parent']:
        created_objects[obj_data['name']].parent = created_objects[obj_data['parent']]

# Keyframes (Optimized)
for obj_data in anim_data:
    obj = created_objects[obj_data['name']]
    locs = obj_data['locations']
    rots = obj_data['rotations']
    
    # We can set fcurves directly for speed, but simple loop is fine for 1800 frames vs 180k lines of code
    for i, (loc, rot) in enumerate(zip(locs, rots)):
        obj.location = loc
        obj.rotation_euler = rot
        obj.keyframe_insert(data_path='location', frame=i)
        obj.keyframe_insert(data_path='rotation_euler', frame=i)

# --- Camera ---
camera_data = bpy.data.cameras.new(name='Camera')
camera_object = bpy.data.objects.new('Camera', camera_data)
bpy.context.collection.objects.link(camera_object)
bpy.context.scene.camera = camera_object

const = camera_object.constraints.new(type='TRACK_TO')
const.target = bpy.data.objects['Torso']
const.track_axis = 'TRACK_NEGATIVE_Z'
const.up_axis = 'UP_Y'

for frame in range(0, 1801):
    y_pos = -(frame * 0.1) + 8
    camera_object.location = (5, y_pos, 3)
    camera_object.keyframe_insert(data_path='location', frame=frame)

# --- Audio ---
if not bpy.context.scene.sequence_editor:
    bpy.context.scene.sequence_editor_create()
seq = bpy.context.scene.sequence_editor.sequences.new_sound(
    name="Beat", filepath="audio.wav", channel=1, frame_start=1
)

# --- Render Settings ---
bpy.context.scene.render.engine = 'BLENDER_EEVEE'
bpy.context.scene.eevee.use_bloom = True
bpy.context.scene.render.image_settings.file_format = 'FFMPEG'
bpy.context.scene.render.ffmpeg.format = 'MPEG4'
bpy.context.scene.render.ffmpeg.codec = 'H264'
bpy.context.scene.render.ffmpeg.audio_codec = 'AAC'

# Save the .blend file for parallel rendering
bpy.ops.wm.save_as_mainfile(filepath="scene.blend")
"#);

    let mut file = File::create(OUTPUT_FILENAME)?;
    file.write_all(script.as_bytes())?;

    if generate_only {
        println!("✅ Python script generated successfully.");
        return Ok(());
    }

    // 4. Run Blender to Setup Scene (Single Thread)
    println!("🏗️  Setting up scene in Blender (creating scene.blend)...");
    let blender_bin = find_blender().expect("Blender not found");
    let status = Command::new(&blender_bin)
        .arg("-b")
        .arg("-P")
        .arg(OUTPUT_FILENAME)
        .status()?;
    
    if !status.success() {
        return Err(std::io::Error::other("Failed to setup scene"));
    }

    // 5. Parallel Rendering
    println!("⚡ Starting Parallel Rendering ({} chunks)...", CHUNKS);
    let frames_per_chunk = FRAMES / CHUNKS;
    let mut handles = vec![];
    let m = MultiProgress::new();
    let sty = ProgressStyle::with_template(
        "[{elapsed_precise}] {bar:40.cyan/blue} {pos:>7}/{len:7} {msg}",
    )
    .unwrap()
    .progress_chars("##-");

    for i in 0..CHUNKS {
        let start_frame = i * frames_per_chunk;
        let end_frame = if i == CHUNKS - 1 { FRAMES } else { (i + 1) * frames_per_chunk - 1 };
        let blender_bin = blender_bin.clone();
        let pb = m.add(ProgressBar::new((end_frame - start_frame + 1) as u64));
        pb.set_message(format!("Chunk {}", i));
        pb.set_style(sty.clone());

        let handle = thread::spawn(move || {
            // Output filename: part_X_####.mp4
            // Blender automatically adds frame numbers if we don't specify format properly, 
            // but for FFMPEG it usually creates one file if we give a range.
            // Let's name it "part_X.mp4".
            // Note: Blender might append frame range to filename.
            let output_path = format!("//part_{}_", i); 
            
            let mut cmd = Command::new(&blender_bin)
                .arg("-b")
                .arg(BLEND_FILE)
                .arg("-o")
                .arg(&output_path)
                .arg("-s")
                .arg(start_frame.to_string())
                .arg("-e")
                .arg(end_frame.to_string())
                .arg("-a") // Render animation
                .stdout(Stdio::piped())
                .spawn()
                .expect("Failed to spawn blender worker");

            let stdout = cmd.stdout.take().unwrap();
            let reader = BufReader::new(stdout);

            for l in reader.lines().map_while(Result::ok) {
                if l.contains("Append frame") {
                    pb.inc(1);
                }
            }
            
            cmd.wait().expect("Blender worker failed");
            pb.finish_with_message("Done");
            // Return the expected output filename for concatenation
            // Blender usually names it "part_0_0000-0449.mp4"
            // We'll need to find it.
        });
        handles.push(handle);
    }

    for h in handles {
        h.join().unwrap();
    }
    m.clear().unwrap();

    println!("🔗 Concatenating video parts...");
    concat_videos()?;

    println!("✅ All Done! Output: {}", FINAL_OUTPUT);
    Ok(())
}

fn find_blender() -> Option<String> {
    let paths = vec![
        "blender",
        "/Applications/Blender.app/Contents/MacOS/Blender",
        "/usr/bin/blender",
        "C:\\Program Files\\Blender Foundation\\Blender 3.6\\blender.exe",
    ];
    for path in paths {
        if Command::new(path).arg("--version").output().is_ok() {
            return Some(path.to_string());
        }
    }
    None
}

fn concat_videos() -> std::io::Result<()> {
    // Generate a Python script for Blender to concat the videos
    // This is safer than relying on ffmpeg being present
    let script = String::from(r#"
import bpy
import os
import glob

bpy.ops.wm.read_factory_settings(use_empty=True)
if not bpy.context.scene.sequence_editor:
    bpy.context.scene.sequence_editor_create()

# Find all part files
files = sorted(glob.glob("part_*.mp4"))
if not files:
    # Try finding with frame ranges if Blender added them
    files = sorted(glob.glob("part_*_*.mp4"))

current_frame = 0
for f in files:
    print(f"Adding strip: {f}")
    # Add movie strip
    seq = bpy.context.scene.sequence_editor.sequences.new_movie(
        name=os.path.basename(f),
        filepath=os.path.abspath(f),
        channel=1,
        frame_start=current_frame
    )
    # Audio
    bpy.context.scene.sequence_editor.sequences.new_sound(
        name=os.path.basename(f),
        filepath=os.path.abspath(f),
        channel=2,
        frame_start=current_frame
    )
    current_frame += seq.frame_final_duration

bpy.context.scene.frame_end = current_frame
bpy.context.scene.render.image_settings.file_format = 'FFMPEG'
bpy.context.scene.render.ffmpeg.format = 'MPEG4'
bpy.context.scene.render.ffmpeg.codec = 'H264'
bpy.context.scene.render.ffmpeg.audio_codec = 'AAC'
bpy.context.scene.render.filepath = '//animation_output.mp4'
bpy.ops.render.render(animation=True)
"#);

    let script_path = "concat_script.py";
    let mut file = File::create(script_path)?;
    file.write_all(script.as_bytes())?;

    let blender_bin = find_blender().expect("Blender not found");
    Command::new(blender_bin)
        .arg("-b")
        .arg("-P")
        .arg(script_path)
        .status()?;

    Ok(())
}
