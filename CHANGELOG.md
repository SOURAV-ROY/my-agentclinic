# Changelog

## 2026-09-27

- Update mission, roadmap, and tech stack specifications to reflect the new constitution structure. Add delivery scope details, clarify implementation phases, and outline ORM and migration strategies. Introduce validation and requirements documents for the constitution refresh, ensuring alignment with stakeholder feedback and project goals. (b42d17b)
- Merge pull request #4 from SOURAV-ROY/mvp (8281768)
- Implement SQLite persistence for agents, ailments, therapies, and appointments, enhancing data management and retrieval. Update models and application logic to support database operations, including insertion and persistence functions. Modify .gitignore to exclude the database file and ensure proper directory structure for data storage. (3e3cfe1)
- Seed sample data for agents, ailments, therapies, and appointments to enhance initial dashboard view. Update dashboard tests to verify seeded data display. Refactor index to call seedStore on application startup. (ceb7c71)
- Implement MVP features including dashboard shell, CRUD operations for agents, ailments, therapies, and appointments with booking, canceling, and rescheduling capabilities. Add comprehensive MVP specifications and validation criteria. Enhance layout rendering for better maintainability and update README for demo instructions. (8062efa)
- Persist MVP store in SQLite via Node node:sqlite (data/agentclinic.db, AGENTCLINIC_DB override, :memory: under Vitest); lock booking rules into specs; fix stale ES2023/phase refs (uncommitted: src/models.ts, src/app.ts, specs/)
- Seed sample agents, ailments, therapies, and appointments so every section shows data on first view (uncommitted: src/models.ts, src/index.ts)
- Add MVP specs (specs/mvp/requirements.md, plan.md, validation.md) + Vitest suites per resource + README demo flow (uncommitted)
- Refactor layout rendering by extracting LayoutProps type for improved clarity and flexibility. Update renderLayout function to accept props, enhancing code maintainability. (ee00816)
- Enhance CSS styles for improved branding and responsiveness. Update header, footer, and navigation styles to incorporate an orange and black color scheme. Revise specifications and tests to reflect these branding changes and ensure mobile-first design compliance. (018e239)
- Merge pull request #3 from SOURAV-ROY/replainning (dc8d2ca)
- Revise roadmap phases to consolidate and renumber tasks under Phase 2, incorporating Ailments, Therapies, and Appointments. Each task is now independently demoable and reflects a more streamlined implementation order. (02b77cd)
- Merge pull request #2 from SOURAV-ROY/replainning (f69f79f)
- Add CHANGELOG.md to document project updates and establish a versioning framework. Include initial entries for recent enhancements, TypeScript updates, testing improvements, and server implementation details. (b94a1cf)
- Enhance responsive design in CSS and update specifications for mobile compatibility. Improve home page requirements to ensure usability across devices, and add tests for responsive layout and content verification. (91fa48b)
- Update TypeScript target version from ES2016 to ES2023 in tsconfig.json for improved language features and compatibility. (f800901)
- Enhance testing capabilities by adding Supertest and Vitest dependencies. Implement initial tests for health check and home page rendering in src/app.test.ts and layout validation in src/views/layout.test.ts. Update specifications to reflect testing requirements and exclude test files from TypeScript build. (0b18ddb)
- Update package.json and package-lock.json to include Vitest for testing. Add test script to package.json and enhance tech stack documentation to reflect the use of Vitest for unit and integration tests. (15dd1ca)
- Split layout into header/main/footer files and mark roadmap 0.1 complete (4865390)
- Refactor layout structure by splitting header, main, and footer into separate files for clarity and reusability. Update specifications to reflect new layout organization and validation criteria for home page rendering. (779bc13)
- Refactor server to use layout rendering for home page and add CSS styling. Remove old index.js file and update .gitignore to include dist directory. Enhance specifications for layout implementation and static file serving. (0bf2ba0)
- Implement Express server with health check and home page endpoints. Update package.json and package-lock.json to include Express and TypeScript type definitions. Add initial server logic in src/index.ts and dist/index.js for handling requests and responses. (f83f04e)
- Enhance Phase 0.1 specifications by adding a minimal home page to the server skeleton. Update plan, requirements, and validation documents to reflect the new `/` endpoint returning HTML with the AgentClinic title and tagline, alongside the existing health check functionality. (3124f41)
- Add foundational server skeleton specifications including plan, requirements, and validation documents for Phase 0.1. Outline setup, routing, and build processes for an Express + TypeScript server with a health check endpoint. (b5f3d4e)
- Initialize AgentClinic project with essential files including package.json, package-lock.json, TypeScript configuration, and project specifications. Add .gitignore to exclude unnecessary files and create initial README and prompts for project direction. (2bf513b)

## 2026-09-26

- Extract LayoutProps type for renderLayout props instead of inline title param (uncommitted: src/views/layout.ts)
