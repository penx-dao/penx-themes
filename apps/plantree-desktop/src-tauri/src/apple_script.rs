use serde::Deserialize;
use std::error::Error;
use std::process::Command;

#[derive(Debug, Deserialize)]
pub struct Options {
    pub human_readable_output: Option<bool>,
}

#[tauri::command]
pub async fn run_applescript(
    script: &str,
    args: Option<Vec<String>>,
    options: Option<Options>,
) -> Result<String, String> {
    let human_readable_output =
        options.map_or(false, |opts| opts.human_readable_output.unwrap_or(false));

    match run_applescript_sync(script, args.as_deref(), human_readable_output) {
        Ok(output) => Ok(output),
        Err(err) => Err(err.to_string()),
    }
}

pub fn run_applescript_sync(
    script: &str,
    args: Option<&[String]>,
    human_readable_output: bool,
) -> Result<String, Box<dyn Error>> {
    if cfg!(not(target_os = "macos")) {
        return Err("macOS only".into());
    }

    let output_arguments = if human_readable_output {
        Vec::new()
    } else {
        vec!["-ss"]
    };

    let mut command = Command::new("osascript");
    command.args(["-e", script]);
    command.args(&output_arguments);

    // Add the arguments to the command
    if let Some(arguments) = args {
        for arg in arguments {
            command.arg(arg);
        }
    }

    let output = command.output()?;

    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}
