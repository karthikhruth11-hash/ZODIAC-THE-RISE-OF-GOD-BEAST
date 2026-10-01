// Copyright (c) 2026 ZODIAC: Rise of the God Beast. C++ Save Game State

#include "ZodiacSaveGame.h"

UZodiacSaveGame::UZodiacSaveGame()
{
	SaveSlotName = TEXT("ZodiacSlot0");
	UserIndex = 0;
	SavedLevel = 10;
	SavedExperience = 2500;
	SavedSelectedPath = TEXT("PhysicalTitan");
	SavedPlayerLocation = FVector(0.0f, 0.0f, 0.0f);
}
