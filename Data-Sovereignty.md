# Data Sovereignty and Compliance Review

## Purpose

This document outlines the data sovereignty, privacy, and compliance considerations for the AI Project Management Dashboard.

## Systems Used

- GitHub
- GitHub Copilot
- Microsoft Copilot Studio
- Power BI
- Power Automate
- Power Apps
- Microsoft Teams

## Data Storage Locations

| System | Data Stored |
|----------|----------|
| GitHub | Source code, commits, pull requests |
| Copilot Studio | Agent configuration and prompts |
| Power BI | Dashboard datasets and reports |
| Power Apps | User interface components |
| Teams | Notification messages |

## South Africa POPIA Considerations

The solution was reviewed against POPIA principles.

### Findings

- No personal customer information is processed.
- Sample project data is used.
- Access is controlled through Microsoft 365 permissions.
- Repository access is role-based.
- Audit logging is available through Microsoft services.

## GDPR Considerations

The solution aligns with key GDPR principles.

### Findings

- Data minimization principles applied.
- No sensitive personal information stored.
- Access restricted to authorized users.
- Data processing limited to project management activities.

## Security Controls

- GitHub branch protection enabled.
- Pull request review process implemented.
- Secret scanning enabled.
- Dependency monitoring enabled.
- Role-based access applied.
- Multi-factor authentication recommended.

## Conclusion

The AI Project Management Dashboard prototype uses fictional project data and follows foundational governance, compliance, and security practices appropriate for a training and demonstration environment.
