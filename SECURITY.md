# Security Policy

## Overview

The Notes App is an actively developed web application built with React, TypeScript, and modern web technologies. Security is treated as an important part of the project's development, deployment, and maintenance process.

This document describes the security practices of the project, the versions currently receiving security updates, and the process for responsibly reporting security vulnerabilities.

---

## Supported Versions

Security fixes are provided for the latest stable release of the project.

| Version                           |      Supported     |
| --------------------------------- | :----------------: |
| Latest stable release             | :white_check_mark: |
| Development / unreleased versions |      :warning:     |
| Older releases                    |         :x:        |

### Development Versions

Development branches and unreleased commits may contain incomplete features, known issues, or breaking changes. They are not guaranteed to receive individual security patches.

Security issues discovered in development versions should still be reported, particularly when they may affect the latest stable release.

---

## Reporting a Vulnerability

### Please Do Not Create a Public Issue

If you believe you have discovered a security vulnerability, **please do not disclose it through a public GitHub issue, discussion, pull request, or other public channel.**

Public disclosure before a vulnerability has been investigated and addressed may put users and deployments at unnecessary risk.

Instead, report the vulnerability privately using:

**GitHub Private Vulnerability Reporting**

Use the repository's:

> **Security → Advisories → Report a vulnerability**

This is the preferred reporting method because it allows sensitive security information to be shared privately with the project maintainers.

If private vulnerability reporting is unavailable for the repository, contact the project maintainer through the contact information provided in the repository's GitHub profile.

---

## What to Include in a Report

A useful security report should contain as much of the following information as possible:

### 1. Vulnerability Description

Clearly describe:

* What the vulnerability is.
* Where it exists.
* What security property is affected.
* Whether the issue is reproducible.

### 2. Steps to Reproduce

Provide clear, minimal steps that allow the vulnerability to be reproduced.

Where applicable, include:

* Affected route, component, API endpoint, or functionality.
* Required application state.
* Request/response examples.
* Relevant configuration.
* Browser or runtime information.
* A minimal proof of concept.

### 3. Impact Assessment

Explain what an attacker could potentially accomplish.

For example:

* Unauthorized access to another user's notes.
* Unauthorized modification or deletion of data.
* Authentication or authorization bypass.
* Exposure of private application data.
* Cross-site scripting (XSS).
* Injection vulnerabilities.
* Sensitive information disclosure.
* Privilege escalation.
* Security-sensitive dependency vulnerabilities.

### 4. Affected Versions

Specify the version, release, branch, or commit where the vulnerability was observed.

### 5. Suggested Remediation

If you have a proposed fix or mitigation, include it. A suggested fix is welcome but is not required for a report to be considered.

---

## Vulnerability Handling Process

Security reports will be handled through the following general process:

1. **Receipt**
   The report is privately received and reviewed.

2. **Acknowledgement**
   The reporter will receive an acknowledgement once the report has been reviewed.

3. **Reproduction**
   The reported issue will be investigated and, where possible, reproduced.

4. **Assessment**
   The vulnerability will be evaluated based on factors such as exploitability, affected functionality, potential impact, and scope.

5. **Remediation**
   A fix or mitigation will be developed and tested where the issue is confirmed.

6. **Release**
   Where appropriate, a security fix will be included in a new release or deployment.

7. **Disclosure**
   Once the vulnerability has been sufficiently addressed, details may be disclosed through a GitHub Security Advisory or other appropriate project documentation.

The exact timeline may vary depending on the severity, complexity, and impact of the vulnerability.

---

## Severity

Vulnerabilities may be assessed using commonly accepted security principles, including:

| Severity     | General Description                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Critical** | Vulnerabilities that could result in severe compromise of user data, authentication, application integrity, or the underlying system.   |
| **High**     | Vulnerabilities with significant security impact that could enable unauthorized access, data manipulation, or other serious compromise. |
| **Medium**   | Vulnerabilities with a meaningful but more limited security impact or requiring additional conditions to exploit.                       |
| **Low**      | Issues with limited security impact, difficult exploitation requirements, or security hardening opportunities.                          |

Severity is determined on a case-by-case basis. The classification may consider exploitability, affected users, required privileges, attack complexity, and potential impact.

---

## Responsible Disclosure

Security researchers and users are asked to provide a reasonable opportunity for the vulnerability to be investigated and addressed before making it public.

Please:

* Report vulnerabilities privately.
* Provide sufficient information to reproduce the issue.
* Avoid accessing, modifying, deleting, or exposing data that does not belong to you.
* Avoid actions that could degrade the availability or performance of the application.
* Avoid social engineering, phishing, or attacks against project contributors.
* Stop testing if you encounter sensitive user information.
* Do not publicly disclose the vulnerability until an appropriate remediation or disclosure decision has been made.

Good-faith security research is appreciated.

---

## Scope

Security reports are generally considered in scope when they involve vulnerabilities in the Notes App's own:

* Frontend application.
* Application logic.
* Authentication and authorization flows.
* Data-access mechanisms.
* API interactions.
* Note and user data handling.
* Client-side state management where it creates a security boundary.
* Application configuration.
* Build and deployment configuration.
* Dependencies when their use creates a demonstrable vulnerability in the application.

As the project evolves, its backend and infrastructure may include services such as Supabase and deployment infrastructure such as Vercel. Vulnerabilities specific to third-party infrastructure should be reported to the respective service provider when appropriate, while application-level security issues involving those services remain relevant to this project.

---

## Out of Scope

The following generally do not constitute security vulnerabilities in the project unless they demonstrate a meaningful security impact:

* General bugs without a security consequence.
* UI/UX issues.
* Feature requests.
* Performance issues without a security impact.
* Theoretical vulnerabilities without a practical attack path.
* Vulnerabilities requiring physical access to a user's device.
* Social engineering or phishing attacks against users or maintainers.
* Denial-of-service testing that could affect shared infrastructure.
* Automated scanning that generates excessive traffic.
* Vulnerabilities in third-party services that cannot be controlled or mitigated by this project.

Reports may still be reviewed when an out-of-scope issue has a credible security implication.

---

## Dependency and Supply-Chain Security

The project relies on third-party packages and services as part of its technology stack.

Dependencies should be kept reasonably up to date, and known security vulnerabilities should be evaluated when they affect the application.

Where appropriate, security issues involving dependencies may be addressed by:

* Updating the affected dependency.
* Applying a compatible security patch.
* Removing an unnecessary dependency.
* Replacing an affected package.
* Implementing an application-level mitigation when an immediate upgrade is not possible.

Dependency security does not automatically imply that every vulnerability reported against a third-party package affects this project. The actual impact and exploitability within the Notes App will be evaluated.

---

## Secrets and Sensitive Configuration

Secrets and credentials must not be committed to the repository.

This includes, but is not limited to:

* API keys.
* Authentication secrets.
* Database credentials.
* Private access tokens.
* Service-role credentials.
* Deployment credentials.
* Private signing keys.
* Local environment files containing secrets.

Environment-specific configuration should be supplied through appropriate environment variables or deployment-platform secret management.

If a secret is accidentally committed, it should be considered compromised and rotated as soon as possible.

> **Important:** Client-side environment variables should never be treated as secret merely because they are stored in an environment file. Anything intentionally exposed to the browser must be considered publicly accessible.

---

## Authentication and Authorization

Where authentication and user-specific data are implemented, security boundaries must be enforced on the server/backend rather than relying solely on client-side checks.

Client-side state, route guards, hidden UI elements, or disabled controls must not be considered sufficient authorization mechanisms.

For data belonging to individual users, access controls should ensure that users can only access or modify resources for which they are authorized.

Where Supabase is used for persistence and authentication, database-level security mechanisms such as Row Level Security (RLS) should be used where appropriate to enforce data-access boundaries.

---

## Security Fixes

Confirmed vulnerabilities may be addressed through:

* A direct code fix.
* A dependency update.
* A configuration change.
* A database or authorization policy change.
* A deployment change.
* A combination of the above.

Security fixes may be released independently of normal feature releases when the severity of the issue warrants it.

---

## Security Advisories

When appropriate, confirmed vulnerabilities may be documented through a GitHub Security Advisory.

A security advisory may include:

* Affected versions.
* Fixed versions.
* Vulnerability description.
* Severity.
* Impact.
* Mitigation information.
* Credits for the reporter.

Sensitive information that could unnecessarily increase exploitation risk will not be disclosed.

---

## Researcher Recognition

Security researchers who responsibly report valid vulnerabilities may be credited in the corresponding security advisory or project documentation, subject to their preference.

Researchers may request to remain anonymous.

No public attribution will be made against the researcher's wishes.

---

## Changes to This Policy

This security policy may be updated as the Notes App's architecture, deployment model, supported versions, and security practices evolve.

Changes to this document will be tracked through the project's Git history.

---

## Contact

For security vulnerabilities, please use **GitHub Private Vulnerability Reporting** whenever available.

For non-security issues, feature requests, and general bugs, please use the project's normal GitHub issue tracker.
