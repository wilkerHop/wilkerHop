use std::f32::consts::PI;
use std::fs::File;
use std::io::{BufWriter, Write};

const SAMPLE_RATE: u32 = 44100;
const BPM: u32 = 120;

pub fn generate_audio(filename: &str, duration_secs: u32) -> std::io::Result<()> {
    let file = File::create(filename)?;
    let mut writer = BufWriter::new(file);

    let total_samples = SAMPLE_RATE * duration_secs;
    let num_channels: u16 = 1;
    let bits_per_sample: u16 = 16;
    let byte_rate = SAMPLE_RATE * u32::from(num_channels) * u32::from(bits_per_sample) / 8;
    let block_align = num_channels * bits_per_sample / 8;

    // WAV Header
    writer.write_all(b"RIFF")?;
    writer.write_all(&(36 + total_samples * 2).to_le_bytes())?; // ChunkSize
    writer.write_all(b"WAVE")?;
    writer.write_all(b"fmt ")?;
    writer.write_all(&16_u32.to_le_bytes())?; // Subchunk1Size (16 for PCM)
    writer.write_all(&1_u16.to_le_bytes())?; // AudioFormat (1 for PCM)
    writer.write_all(&num_channels.to_le_bytes())?;
    writer.write_all(&SAMPLE_RATE.to_le_bytes())?;
    writer.write_all(&byte_rate.to_le_bytes())?;
    writer.write_all(&block_align.to_le_bytes())?;
    writer.write_all(&bits_per_sample.to_le_bytes())?;
    writer.write_all(b"data")?;
    writer.write_all(&(total_samples * 2).to_le_bytes())?; // Subchunk2Size

    // Audio Data Generation
    let beat_interval = SAMPLE_RATE * 60 / BPM;
    
    for t in 0..total_samples {
        let time = t as f32 / SAMPLE_RATE as f32;
        
        // Base kick drum (sine wave with pitch drop)
        let beat_progress = (t % beat_interval) as f32 / beat_interval as f32;
        let kick_env = (-beat_progress * 10.0).exp();
        let kick_freq = 50.0 + 100.0 * kick_env;
        let kick = (time * kick_freq * 2.0 * PI).sin() * kick_env;

        // Hi-hat (noise burst)
        let hat_interval = beat_interval / 2;
        let hat_progress = (t % hat_interval) as f32 / hat_interval as f32;
        let hat_env = (-hat_progress * 30.0).exp();
        let noise = (rand::random::<f32>() * 2.0 - 1.0) * hat_env * 0.3;

        // Bassline (sawtooth)
        let bass_freq = 55.0; // A1
        let bass = ((time * bass_freq * 2.0 * PI).sin() > 0.0) as i32 as f32 * 2.0 - 1.0;
        let bass_filtered = bass * 0.1;

        // Mix
        let sample = (kick * 0.6 + noise * 0.3 + bass_filtered * 0.3).clamp(-1.0, 1.0);
        
        // Convert to i16
        let sample_i16 = (sample * i16::MAX as f32) as i16;
        writer.write_all(&sample_i16.to_le_bytes())?;
    }

    Ok(())
}
