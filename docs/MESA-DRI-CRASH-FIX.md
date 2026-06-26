# Mesa/DRI Crash on Startup — Root Cause & Fix

## The Problem

The snap crashes immediately on launch with `segmentation fault (core dumped)` after printing repeated errors like:

```
MESA-LOADER: failed to open nouveau (search paths .../gnome-platform/usr/lib/x86_64-linux-gnu/dri)
MESA-LOADER: failed to open swrast
```

The app never shows a window — it exits before Electron finishes initialising.

## Root Cause

### Incompatibility between Electron 40+ ANGLE and the gnome-3-28-1804 DRI drivers

The snap uses `gnome-3-28-1804` as its content snap (providing the GNOME/Mesa runtime). This content snap ships DRI drivers built in **2018** (Ubuntu 18.04 era).

Electron bundles its own `libEGL.so` / `libGLESv2.so` (ANGLE — the OpenGL ES translation layer). Starting with **Electron 40**, ANGLE probes the native GL stack during initialisation. When it tries to load the 2018-era DRI drivers from `gnome-3-28-1804`, the mismatch between the modern ANGLE code and the ancient DRI drivers causes a **segfault in Mesa's loader**.

This happens *before* Electron processes any command-line flags like `--disable-gpu`, so those flags have no effect.

### Why it happens on some systems and not others

- **Newer distributions (Ubuntu 26+)** ship Mesa 26+. The DRI drivers in `gnome-3-28-1804` are from 2018 (Mesa 18.x). The binary interface between ANGLE and DRI drivers changed in later Mesa versions, making them incompatible.
- **Older distributions (Ubuntu 22.04, 24.04)** ship Mesa 22–24. The DRI driver interface is closer to what `gnome-3-28-1804` provides, so the crash doesn't occur.

## The Fix

### Solution: Use Electron 33 (which works with the old DRI drivers)

The `whatsapp-desktop-linux` project (same developer, same snap structure) was not affected because it uses **Electron 33**. Electron 33's ANGLE handles the DRI driver loading gracefully and falls back to software rendering when the hardware drivers are incompatible.

**Changes made:**

1. **`package.json`** — Downgraded Electron from `^40.2.1` to `^33.2.0` and electron-builder from `^26.7.0` to `^25.1.8`:

   ```json
   "devDependencies": {
     "electron": "^33.2.0",
     "electron-builder": "^25.1.8"
   }
   ```

2. **`snapcraft.yaml`** — Restored the `extensions: [gnome-3-38]` declaration (which pulls in the correct GNOME runtime environment), set the snap name to `chatgpt-desktop-linux`, and points the `command` directly at the Electron binary. Added `libdrm2` to stage-packages for Direct Rendering Manager support:

   ```yaml
   apps:
     chatgpt-desktop-linux:
       command: chatgpt-desktop-linux
       extensions: [gnome-3-38]
       plugs:
         - opengl
         - desktop
         - wayland
         - x11
         # ...

   parts:
     chatgpt-desktop-linux:
       stage-packages:
         - libdrm2
         - libnss3
         - libxss1
         - libgtk-3-0
   ```

### Why this works

The `gnome-3-38` extension automatically:
1. Mounts the `gnome-3-28-1804` content snap at `$SNAP/gnome-platform`
2. Injects `/var/lib/snapd/lib/gl:/var/lib/snapd/lib/gl32` at the **front** of `LD_LIBRARY_PATH` (via the `opengl` plug)
3. This gives the host system's Mesa libraries **priority** over the bundled ANGLE or the content snap's Mesa
4. Electron 33's ANGLE handles the case where native GL can't initialise (it falls back to SwiftShader gracefully)
5. The Mesa loader errors are still printed to stderr but are **non-fatal** — the app starts normally

## How to Build

```bash
# Install dependencies
npm install

# Build the snap
npm run dist:snap

# The built snap will be in dist/
ls dist/*.snap

# Install locally
sudo snap install dist/chatgpt-desktop-linux_*.snap --dangerous
```

## How to Verify the Fix

1. Build and install the snap
2. Run `chatgpt-desktop-linux`
3. The Mesa loader errors may still appear on stderr — they are **harmless**
4. The app window should appear and function normally

## Alternative Approaches Considered

| Approach | Result |
|---|---|
| `--disable-gpu` flag | Still crashed — the segfault happens before Electron processes CLI flags |
| `--use-gl=swiftshader` | Wrong flag syntax for modern Electron — caused a different GL init error |
| `--enable-features=Vulkan --use-vulkan=swiftshader` | Didn't help — ANGLE still probes native GL first |
| Removing bundled `libEGL.so`/`libGLESv2.so` | Other Mesa libs from `core20` base snap still tried to load old DRI drivers |
| Copying host Mesa 26 DRI drivers into the snap | Requires bundling `libdril_dri.so` + `libgbm.so.1` + `libdrm.so.2` dependencies |
| Building the snap with `base: core24` + `core24`'s Mesa | Would break backward compatibility with systems that don't have core24 |
| **Downgrading Electron to v33** | **Cleanest fix — no runtime hacks, no wrapper scripts, no library removal** |
