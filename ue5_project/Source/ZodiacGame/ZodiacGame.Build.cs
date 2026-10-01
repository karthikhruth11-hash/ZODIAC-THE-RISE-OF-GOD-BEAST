// Copyright (c) 2026 ZODIAC: Rise of the God Beast. All Rights Reserved.

using UnrealBuildTool;

public class ZodiacGame : ModuleRules
{
	public ZodiacGame(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] { 
			"Core", 
			"CoreUObject", 
			"Engine", 
			"InputCore", 
			"HeadMountedDisplay", 
			"EnhancedInput",
			"Niagara",
			"HairStrandsCore"
		});

		PrivateDependencyModuleNames.AddRange(new string[] {  });
	}
}
