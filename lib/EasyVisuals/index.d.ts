// roblox-ts typings for ezVisualz (EasyVisuals) by Arxk, https://github.com/arxkdev/ezvisualz.
// The Luau source next to this file is the original library, unchanged; these declarations only
// describe it. Methods declared with method syntax are called with `:`, functions declared as
// properties (the `new` constructors) with `.`, as the Luau code expects.

/** The built-in presets (lib/EasyVisuals/Presets). A custom preset name works too, see SetCustomFolders. */
type EzVisualzPresetName =
	| "Bubblegum"
	| "ChromeStroke"
	| "DeathStroke"
	| "ElectricStroke"
	| "FireStroke"
	| "GalaxyStroke"
	| "Ghost"
	| "GhostStroke"
	| "Gold"
	| "GoldStroke"
	| "GreenOutline"
	| "IceStroke"
	| "Lava"
	| "LavaStroke"
	| "Matrix"
	| "NeonStroke"
	| "OceanicStroke"
	| "Rainbow"
	| "RainbowOutline"
	| "RainbowStroke"
	| "Shine"
	| "ShineOutline"
	| "Silver"
	| "SilverStroke"
	| "SunsetStroke"
	| "WaveStroke"
	| "Zebra";

/** The built-in gradient templates (lib/EasyVisuals/GradientTemplates). */
type EzVisualzTemplateName =
	| "Bubblegum"
	| "Chrome"
	| "Death"
	| "Electric"
	| "Fire"
	| "Galaxy"
	| "Ghost"
	| "Gold"
	| "Green"
	| "Ice"
	| "Lava"
	| "Matrix"
	| "Neon"
	| "Oceanic"
	| "Rainbow"
	| "Silver"
	| "Sunset"
	| "Zebra";

/** An animated UIGradient on a GuiObject or a UIStroke. `acceleration`: 0 to 1, 1 = at once. */
interface EzVisualzGradient {
	readonly UIInstance: GuiObject | UIStroke;
	readonly Instance: UIGradient;
	readonly IsPaused: boolean;
	readonly ColorSequence: ColorSequence;
	readonly Offset: number;
	readonly OffsetSpeed: number;
	readonly Rotation: number;
	readonly RotationSpeed: number;

	/** Blends to a new colour sequence; returns the sequence it blends to. */
	SetColorSequence(sequence: ColorSequence, blendRate?: number): ColorSequence;
	/** Moves the gradient to an offset (0 to 1 across the element). */
	SetOffset(offset: number, acceleration?: number): void;
	/** Keeps the gradient moving: offset per second (negative = the other way). */
	SetOffsetSpeed(speed: number, acceleration: number): void;
	/** Turns the gradient to an angle, in degrees. */
	SetRotation(rotation: number, acceleration: number): void;
	/** Keeps the gradient turning: degrees per second. */
	SetRotationSpeed(speed: number, acceleration: number): void;
	SetTransparencyOffset(offset: number, acceleration: number): void;
	SetTransparencyOffsetSpeed(speed: number, acceleration: number): void;
	SetTransparencySequence(transparency: number | NumberSequence, acceleration?: number): void;
	Pause(): void;
	Resume(): void;
	Destroy(): void;
}

/** An animated UIStroke on a GuiObject (or a UIStroke). */
interface EzVisualzStroke {
	readonly UIInstance: GuiObject | UIStroke;
	readonly Instance: UIStroke;
	readonly IsPaused: boolean;
	readonly UseScaledSize: boolean;
	readonly Color: Color3;
	readonly Transparency: number;
	readonly Size: number;

	SetSize(size: number, acceleration: number): void;
	SetTransparency(transparency: number, acceleration: number): void;
	SetColor(color: Color3, acceleration: number): void;
	/** True: the thickness follows the element's size (UIStroke.StrokeSizingMode ScaledSize). */
	SetScaledSize(useScaledSize: boolean): void;
	Pause(): void;
	Resume(): void;
	Destroy(): void;
}

/** A copy of the element drawn behind it as a shadow. */
interface EzVisualzDropshadow {
	readonly UIInstance: GuiObject | UIStroke;
	readonly Instance: GuiObject;
	readonly IsPaused: boolean;
	readonly Color: Color3;
	readonly Transparency: number;
	readonly Offset: Vector2;

	SetOffset(offset: Vector2, acceleration: number): void;
	SetTransparency(transparency: number, acceleration: number): void;
	SetColor(color: Color3, acceleration: number): void;
	Pause(): void;
	Resume(): void;
	Destroy(): void;
}

/** A running preset made by EasyVisuals.new. It pauses while its element is hidden. */
interface EzVisualzEffect {
	readonly UIInstance: GuiObject;
	readonly EffectObjects: ReadonlyArray<EzVisualzGradient | EzVisualzStroke | EzVisualzDropshadow>;
	readonly SavedObjects: ReadonlyArray<Instance>;
	readonly Speed: number;
	readonly Size: number;
	readonly IsPaused: boolean;

	Pause(): void;
	Resume(): void;
	/** Removes the effect's objects and gives back the UIStrokes and UIGradients it saved. */
	Destroy(): void;
}

interface EzVisualzStatic {
	/**
	 * Starts a preset on a GuiObject.
	 * @param uiInstance the element to dress
	 * @param effectType a preset name
	 * @param speed animation speed (default 0.007; gradients usually 0.1 to 1)
	 * @param size stroke thickness for the stroke presets (default 1)
	 * @param saveInstanceObjects true: the element's own UIStrokes and UIGradients are taken off and put back on Destroy
	 * @param customColor a colour for the presets that take one
	 * @param customTransparency a transparency for the presets that take one
	 * @param resumesOnVisible true (default): the effect starts again when its element is shown
	 * @param useScaledSize stroke thickness that follows the element's size
	 */
	readonly new: (
		uiInstance: GuiObject,
		effectType: EzVisualzPresetName | (string & {}),
		speed?: number,
		size?: number,
		saveInstanceObjects?: boolean,
		customColor?: ColorSequence | Color3,
		customTransparency?: NumberSequence | number,
		resumesOnVisible?: boolean,
		useScaledSize?: boolean,
	) => EzVisualzEffect;

	/** Folders of your own preset and template ModuleScripts; they override built-ins of the same name. */
	readonly SetCustomFolders: (customPresets?: Folder, customTemplates?: Folder) => void;

	/** The gradient templates, by name: read their Color and Transparency. */
	readonly Templates: Readonly<Record<EzVisualzTemplateName, UIGradient>> &
		Readonly<Record<string, UIGradient | undefined>>;

	readonly Gradient: {
		readonly new: (
			uiInstance: GuiObject | UIStroke,
			colorSequence: ColorSequence,
			transparencySequence: number | NumberSequence,
		) => EzVisualzGradient;
	};
	readonly Stroke: {
		readonly new: (
			uiInstance: GuiObject | UIStroke,
			size: number,
			color?: Color3,
			transparency?: number,
			useScaledSize?: boolean,
		) => EzVisualzStroke;
	};
	readonly Dropshadow: {
		readonly new: (
			uiInstance: GuiObject | UIStroke,
			color?: Color3,
			transparency?: number,
			offset?: Vector2,
		) => EzVisualzDropshadow;
	};
}

declare const EasyVisuals: EzVisualzStatic;

declare namespace EasyVisuals {
	export type PresetName = EzVisualzPresetName;
	export type TemplateName = EzVisualzTemplateName;
	export type Effect = EzVisualzEffect;
	export type Gradient = EzVisualzGradient;
	export type Stroke = EzVisualzStroke;
	export type Dropshadow = EzVisualzDropshadow;
}

export = EasyVisuals;
