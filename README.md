# Agrigistics Payroll System

An Angular 18+ application for managing employee payroll data built using Tailwind CSS and Angular Material.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20+)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd agrigistics-payroll
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200` to view the application.

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── payroll-table/          # Main data table component
│   │   ├── employee-panel/          # Employee details panel
│   │   ├── navigation-panel/       # Left sidebar navigation
│   │   └── actions-panel/           # Right actions panel
│   ├── models/
│   │   └── employee.model.ts       # TypeScript interfaces
│   ├── services/
│   │   └── payroll.service.ts      # Data service with signals
│   ├── shared/
│   │   └── utils/
│   │       └── currency.util.ts    # Utility functions
│   ├── assets/
│   │   └── mock-data.json          # Sample employee data
│   └── app.*                       # Main app files
├── styles.css                      # Global Tailwind styles
└── index.html                      # Main HTML file
```

## Design & Technology Stack

- **Frontend Framework**: Angular 18+ with standalone components
- **Styling**: Tailwind CSS with custom component classes
- **UI Components**: Angular Material Design
- **State Management**: Angular Signals for reactive data
- **Data**: Mock JSON file with comprehensive employee data
- **Icons**: Material Design Icons

---

## Time Breakdown

| Task                                                                       | Time Spent  |
| -------------------------------------------------------------------------- | ----------- |
| Research on latest Angular, some best practices, plan for general approach |             |
| Project Setup & Configuration                                              | 30 minutes  |
| Data Models & Service Creation                                             | 10 minutes  |
| Payroll Table Implementation                                               | 60 minutes  |
| Employee Panel Development                                                 | 30 minutes  |
| Navigation Panel                                                           | 20 minutes  |
| Actions Panel                                                              | 30 minutes  |
| Table Row Actions                                                          | 10 minutes  |
| Styling & Responsiveness                                                   | 60 minutes  |
| Testing & Bug Fixes                                                        | 30 minutes  |
| Documentation                                                              | 20 minutes  |
| **Total**                                                                  | **5 hours** |

---

## Challenges Faced

### 1. Angular Signals Integration

**Challenge**: A few learning curves coming from React to figure out some best practices. Some reading of documentation was needed.

### 2. Tailwind CSS + Angular Material Integration

**Challenge**: - Not too familiar with the way Angular handles Material components so getting the borders rounded within the table was the next step. Main detail inconsistency with the Figma design. There seem to be quite a few difficult to override styles from Material so I don't think I'd try to integrate Tailwind and Material simultaneously. Stick to Material and it's theming rather.

### 3. Responsive Layout Complexity

**Challenge**: Creating a three-panel layout (navigation, main content, actions) that works well on all screen sizes, particularly handling table display on mobile devices with multiple columns. Implemented a flexible grid system with Tailwind's responsive utilities, though future improvements would benefit from designer collaboration to define optimal mobile behavior for complex data tables and side panel behaviour requirements.

### 4. Data Service Architecture

**Challenge**: Designing a service that efficiently handles filtering, sorting, and data management with signals in comparison to what I'm familiar with in the React + GraphQL way.

### Clarity

- Not quite sure what the desired behaviour is for the hover on table row action with the "Primary Action". If that's supposed to show on click or if there's any relation to that and the visibility of the Primary and Secondary buttons or the Action 1 and 2 side panel.
- Not sure what the exclamation mark icon on the table row would indicate, if that would require additional behaviour, a tooltip for example or different actions.
- No design for the initial employees table so I just mimicing the design patterns as closely as possible on the Employees table as with the Selected Employee view

## Improvements & Future Enhancements

Given more time:

- Responsive views. The table could do with some optimisation on mobile screens. Things that I could have implemented are hiding the action bar or toggle visibility via an arrow icon, reducing font sizes on mobile breakpoints, etc
- Enhacned theming via more comprehensive typography, button, table defaults, etc. as well as some extra custom classes to reduce inline tailwind classes and reduce repetition.
- Double checking all the gray variants and implementing into theme in a cleaner way.
- Table pagination or virtualised scrolling

### Future Implementation

**Backend Integration**

- REST API endpoints for CRUD operations
- Authentication and authorisation
- Data persistence and validation

**Advanced Filtering**

- Date range filters for payroll periods
- Department and position filters

**Data Export Functionality**

- PDF/Excel/CSV report generation

**Performance Optimizations**

- Virtual scrolling
- Lazy loading of components
- Caching strategies

**Enhanced UX**

- Loading states and skeletons
- Keyboard shortcuts

  **Accessibility Improvements**

  - Screen reader support
  - Keyboard navigation

**Advanced Analytics**

- Useful graphed data such as trend charts, department comparisons, etc

## AI Tool Usage Reflection

### Tools Used

- **GitHub Copilot**: Code completion and suggestions during development (GPT-4o for easy boilerplate/ code completion, Claude Sonnet 4 for more complex questions or solutions needed)

### Where & Why Used

#### Code Generation (Claude)

- **Component Templates**: Generated HTML templates for all components with proper Tailwind classes
- **Mock data**: Quick dummy data to generate a close-to-real-world example of how things might look fully populated.
- **TypeScript Interfaces**: Generated comprehensive type definitions for employee data
- **Styling**: Created custom CSS classes and Tailwind configurations

#### Code Completion (GitHub Copilot)

- **Method Signatures**: Suggested proper TypeScript method signatures
- **CSS Properties**: Completed Tailwind utility classes

### Effectiveness Critique

#### Where AI Excelled

1. **Boilerplate Generation**: AI was excellent at creating component structure and basic functionality
2. **Styling Assistance**: Tailwind CSS integration was seamless with AI-generated code
3. **Type Safety**: Generated TypeScript interfaces were comprehensive and well-structured
4. **Angular Patterns**: Modern Angular patterns (signals, standalone components) were correctly implemented

#### Where AI Fell Short

1. **Complex State Management**: Required manual refinement of signal-based reactive patterns
2. **Material Design Integration**: Needed significant manual adjustment for proper styling integration
3. **Responsive Design**: AI-generated layouts required manual optimization for different screen sizes
4. **Performance Considerations**: Had to manually implement computed signals for optimal performance

#### Manual Corrections Required

1. **Service Architecture**: Refactored the service to use computed signals properly
2. **CSS Overrides**: Manually adjusted Material Design styles to work with Tailwind. Quite a lot of conflicting styles here.
3. **A lot of inline styling**: needed to clean up a fair amount to get styling minimal and reusable globally.
4. **Component Communication**: Implemented proper data flow between components. With loss of context, AI doesn't usually know how components interact with each other. Better for small standalone tasks in my experience.
5. **Error Handling**: Added proper error handling and loading states

### Overall Assessment

AI tools accelerated development, particularly for boilerplate code, initial structure and a few unfamiliar Angular methodologies. More complex architectural decisions and fine-tuning requires human intervention.

## Testing

The application has been tested for:

- Responsiveness
- Data loading and display accuracy
- Search and filtering functionality
- Sorting capabilities
- Accessibility basics
- ✅ An example test for filtering and searching on the table to display testing approach.

---

**Development Time**: ~5 hours  
**Framework**: Angular 18+  
**Styling**: Tailwind CSS + Angular Material  
**State Management**: Angular Signals  
**Data Source**: Mock JSON
