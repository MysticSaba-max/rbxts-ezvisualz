# @rbxts/ezvisualz

[roblox-ts](https://roblox-ts.com) typings for **ezVisualz** (EasyVisuals), the Luau library by
[Arxk](https://github.com/arxkdev) that animates Roblox UI with `UIGradient`, `UIStroke` and drop
shadow presets: Rainbow, Gold, Chrome, Galaxy, Ghost, Shine and more.

The Luau code in `lib/EasyVisuals` is the original library, unchanged (this repository is a clone
of [arxkdev/ezvisualz](https://github.com/arxkdev/ezvisualz) with its history). This package only
adds `lib/EasyVisuals/index.d.ts` and a `package.json`, so the library installs with npm and is
typed in roblox-ts. All credit for the effects goes to Arxk.

## Install

```sh
npm install github:MysticSaba-max/rbxts-ezvisualz
```

It lands in `node_modules/@rbxts/ezvisualz`, which the usual roblox-ts Rojo project already syncs.

## Use

```ts
import EasyVisuals from "@rbxts/ezvisualz";

// A preset on any GuiObject: name, speed, size (stroke thickness for the *Stroke presets).
const effect = EasyVisuals.new(label, "RainbowStroke", 0.3, 6);
effect.Pause();
effect.Resume();
effect.Destroy();

// Keep your own UIStroke and UIGradient: they are taken off, then put back on Destroy.
EasyVisuals.new(label, "Gold", 0.5, 1, true);

// The building blocks.
const gradient = EasyVisuals.Gradient.new(label, EasyVisuals.Templates.Rainbow.Color, 0);
gradient.SetOffsetSpeed(0.5, 1);
const stroke = EasyVisuals.Stroke.new(label, 3, Color3.fromRGB(0, 0, 0));
stroke.SetSize(5, 0.1);
```

Effects pause on their own while their element (or an ancestor ScreenGui, BillboardGui or
SurfaceGui) is hidden, and destroy themselves when the element leaves the game.

Presets: `Bubblegum`, `ChromeStroke`, `DeathStroke`, `ElectricStroke`, `FireStroke`,
`GalaxyStroke`, `Ghost`, `GhostStroke`, `Gold`, `GoldStroke`, `GreenOutline`, `IceStroke`, `Lava`,
`LavaStroke`, `Matrix`, `NeonStroke`, `OceanicStroke`, `Rainbow`, `RainbowOutline`,
`RainbowStroke`, `Shine`, `ShineOutline`, `Silver`, `SilverStroke`, `SunsetStroke`, `WaveStroke`,
`Zebra`. Your own presets and templates: `EasyVisuals.SetCustomFolders(presets, templates)`, see
[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md).

The original Luau documentation is in [README.luau.md](README.luau.md). Upstream's Rojo test
project is kept as `dev.project.json`, so it does not take over the package when Rojo syncs
`node_modules`.

## Updating from upstream

```sh
git remote add upstream https://github.com/arxkdev/ezvisualz.git
git pull upstream main
```

Then check `index.d.ts` against the new presets and signatures, and bump `version` to match
upstream's `lib/EasyVisuals/wally.toml`.

## License

MIT, as the original library: see [LICENSE.md](LICENSE.md).
