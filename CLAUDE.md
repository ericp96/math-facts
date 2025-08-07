# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `yarn start` - Starts the Expo development server
- **Run on iOS**: `yarn ios` - Build and run on iOS simulator/device  
- **Run on Android**: `yarn android` - Build and run on Android emulator/device
- **Run on web**: `yarn web` - Start web development server
- **Run tests**: `yarn test` - Run Jest tests in watch mode
- **Reset iOS simulators**: `yarn reset` - Reset all iOS simulators (uses Fastlane)

## Architecture Overview

This is a React Native math facts app built with Expo Router and Realm database for local storage.

### Key Technologies
- **Expo Router**: File-based routing system (app/ directory structure)
- **Realm Database**: Local data persistence for user configs, operator settings, and preferences
- **React Native Paper**: Material Design components
- **Lottie**: Animations for correct/incorrect answers and backgrounds
- **TypeScript**: Full type safety throughout the codebase

### Data Models
The app uses three main Realm models:
- `UserConfig`: User profile (name, exam time, timer preferences)
- `OperatorConfig`: Settings for each math operator (addition, subtraction, etc.)
- `PreferenceConfig`: Current user selection and app preferences

### App Structure
- **Root Layout** (`app/_layout.tsx`): Initializes Realm provider, sets up navigation stack, handles app setup
- **Main Screens**: 
  - Home (`app/index.tsx`): Main menu with practice/exam/settings options
  - Practice (`app/practice.tsx`): Free practice mode
  - Exam (`app/exam.tsx`): Timed test mode
  - Settings (`app/settings/`): Nested router for operator-specific configurations

### Problem Generation
Math problems are generated using utilities in `utils/problemUtils.ts` with configurable difficulty settings per operator. The system supports:
- Addition/subtraction with optional regrouping/borrowing
- Multiplication and division with configurable ranges
- Randomized problem selection based on user settings

### Component Organization
- `components/library/`: Reusable UI components (buttons, styled text, themes)
- `components/exam/`: Exam-specific components (question display, results, etc.)
- `components/settings/`: Settings UI components (range selectors, toggles)

### Constants and Configuration
- `constants/`: Enums, types, default configurations, and color schemes
- `models/`: Realm schema definitions
- `hooks/`: Custom React hooks for data fetching and user management

The app automatically initializes with default settings on first run and maintains user state across sessions through Realm persistence.