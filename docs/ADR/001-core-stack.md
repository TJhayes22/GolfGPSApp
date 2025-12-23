# Architecture Decision Record (ADR)

## Core Technology Stack for Golf GPS Mobile Application

Status: Accepted

## Context

The goal of this project is to build a mobile Golf GPS application that provides accurate yardages, satellite hole visualization, and round score tracking. The application must support real-time GPS-based distance calculations, display satellite imagery of golf holes, and function reliably during on-course use, including in areas with limited network connectivity. Early architectural decisions prioritize reliability, cost control, and clean separation of concerns to allow future extensibility.

## Decisions

### 1. Golf Course Data Provider

Decision: Use GolfCourseAPI as the primary source for golf course and hole data.

Reasoning:

GolfCourseAPI provides golf-specific data structures, including hole-by-hole layouts and green coordinates (pin/green locations).

The API supplies latitude and longitude data required for precise yardage calculations.

Course data is static during a round and can be cached locally, reducing network dependency.

Using a domain-specific API avoids inferring golf geometry from general mapping services, simplifying application logic.

### 2. Map and Satellite Imagery Provider

Decision: Use Apple Maps via MapKit to render satellite imagery and map visuals.

Reasoning:

Apple Maps provides high-quality satellite imagery suitable for golf course visualization.

MapKit offers native performance and better battery efficiency for extended on-course usage.

Apple Maps does not impose usage-based billing, reducing cost and vendor risk during development and early usage.

MapKit supports essential map interactions (pins, polylines, tap-to-measure) without requiring routing or distance APIs.

Map rendering is treated as a visual layer only; all distance calculations remain application-owned.

### 3. Application Framework

Decision: Build the application using React Native as the primary framework.

Reasoning:

React Native enables rapid development while maintaining access to native platform features such as GPS and MapKit.

Application logic, state management, and data persistence are cleanly handled in JavaScript/TypeScript, improving iteration speed.

Native map rendering via MapKit integrates well with React Native through established libraries.

This approach preserves flexibility for future platform expansion while allowing an iOS-first MVP.

## Consequences

The application will initially target iOS devices due to the use of Apple Maps.

Map rendering is abstracted from business logic, enabling future replacement or addition of map providers.

Distance calculations are implemented internally, ensuring offline capability and consistent behavior.

The architecture supports future enhancements such as shot tracking, analytics, and additional visualization layers without major refactoring.

## Summary

These decisions prioritize architectural clarity, cost predictability, performance, and developer productivity. The selected stack supports a reliable MVP while preserving long-term flexibility and scalability.