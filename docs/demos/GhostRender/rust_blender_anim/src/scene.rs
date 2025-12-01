use std::f32::consts::PI;

#[derive(Clone, Copy)]
pub struct Vector3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

impl Vector3 {
    pub fn new(x: f32, y: f32, z: f32) -> Self {
        Self { x, y, z }
    }
}

#[derive(Clone, Copy)]
#[allow(dead_code)]
pub struct Color {
    pub r: f32,
    pub g: f32,
    pub b: f32,
    pub a: f32,
}

impl Color {
    pub fn new(r: f32, g: f32, b: f32, a: f32) -> Self {
        Self { r, g, b, a }
    }
}

#[allow(dead_code)]
pub struct Object {
    pub name: String,
    pub object_type: String, // "CUBE", "CYLINDER", etc.
    pub location: Vector3,
    pub rotation: Vector3,
    pub scale: Vector3,
    pub color: Color,
    pub parent: Option<String>,
    pub keyframes: Vec<Keyframe>,
}

#[allow(dead_code)]
pub struct Keyframe {
    pub frame: i32,
    pub location: Option<Vector3>,
    pub rotation: Option<Vector3>,
}

pub fn calculate_walk_cycle(frame: i32, _total_frames: i32) -> Vec<Object> {
    // 120 BPM = 2 beats/sec.
    // At 60 FPS, 1 beat = 30 frames.
    // A full walk cycle (left step + right step) = 2 beats = 60 frames.
    // So we want phase to go 0..2PI every 60 frames.
    let phase = frame as f32 * (2.0 * PI / 60.0);

    let mut objects = Vec::new();

    // Root / Torso
    let torso_y = (phase * 2.0).sin() * 0.1; // Bobbing
    let torso_rot_z = phase.cos() * 0.1; // Swaying
    
    objects.push(Object {
        name: "Torso".to_string(),
        object_type: "CUBE".to_string(),
        location: Vector3::new(0.0, 0.0, 2.0 + torso_y),
        rotation: Vector3::new(0.0, 0.0, torso_rot_z),
        scale: Vector3::new(0.5, 0.3, 0.8),
        color: Color::new(0.0, 0.5, 1.0, 1.0), // Blue
        parent: None,
        keyframes: vec![], // We'll handle keyframes by generating objects per frame or updating them
    });

    // Head
    objects.push(Object {
        name: "Head".to_string(),
        object_type: "CUBE".to_string(),
        location: Vector3::new(0.0, 0.0, 1.0), // Relative to Torso
        rotation: Vector3::new(0.0, 0.0, 0.0),
        scale: Vector3::new(0.4, 0.4, 0.4),
        color: Color::new(1.0, 0.8, 0.6, 1.0), // Skin tone-ish
        parent: Some("Torso".to_string()),
        keyframes: vec![],
    });

    // Limbs helper
    let create_limb = |name: &str, parent: &str, x: f32, z: f32, rot_x: f32, color: Color| -> Object {
        Object {
            name: name.to_string(),
            object_type: "CUBE".to_string(),
            location: Vector3::new(x, 0.0, z),
            rotation: Vector3::new(rot_x, 0.0, 0.0),
            scale: Vector3::new(0.15, 0.15, 0.6),
            color,
            parent: Some(parent.to_string()),
            keyframes: vec![],
        }
    };

    let limb_color = Color::new(0.0, 0.5, 1.0, 1.0);

    // Arms (Swing opposite to legs)
    let arm_swing = phase.cos() * 0.5;
    objects.push(create_limb("Arm.L", "Torso", 0.6, 0.3, arm_swing, limb_color));
    objects.push(create_limb("Arm.R", "Torso", -0.6, 0.3, -arm_swing, limb_color));

    // Legs (Swing)
    let leg_swing = phase.sin() * 0.6;
    objects.push(create_limb("Leg.L", "Torso", 0.3, -0.8, -leg_swing, limb_color));
    objects.push(create_limb("Leg.R", "Torso", -0.3, -0.8, leg_swing, limb_color));

    objects
}
