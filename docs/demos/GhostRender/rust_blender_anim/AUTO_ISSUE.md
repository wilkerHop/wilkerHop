# Auto-Issue on Failure Workflow

## Overview

This workflow automatically creates GitHub issues when the CI Pipeline fails, making it easy to track and fix problems.

## How It Works

### Trigger
```yaml
on:
  workflow_run:
    workflows: ["CI Pipeline"]
    types: [completed]
```

The workflow triggers when the "CI Pipeline" workflow completes. It only runs if the conclusion is 'failure'.

### Process

1. **Failure Detection**
   - Checks if `workflow_run.conclusion == 'failure'`
   - Extracts failure metadata (workflow name, run number, branch, commit, actor)

2. **Duplicate Prevention**
   - Searches for existing open issues with the `ci-failure` label
   - Checks if an issue already exists for the same workflow and branch
   - If found, adds a comment instead of creating a new issue

3. **Issue Creation**
   - **Title Format**: `🔴 CI Failure: [Workflow Name] #[Run Number] on [Branch]`
   - **Labels**: `ci-failure`, `bug`, `automated`
   - **Body Includes**:
     - Failure details table
     - Direct link to failed run
     - Investigation steps
     - Common failure points checklist
     - Reproduction instructions
     - Action items checklist

## Example Issue

### Title
```
🔴 CI Failure: CI Pipeline #42 on main
```

### Content Includes

- **Details Table**: Workflow name, run number, branch, commit SHA, actor
- **Investigation Steps**: 
  - Review logs
  - Check recent changes
  - Reproduce locally
  - Common failure points

- **Next Steps Checklist**:
  - [ ] Identify root cause
  - [ ] Fix the issue
  - [ ] Run health checks locally
  - [ ] Push fix and verify CI passes
  - [ ] Close this issue

## Benefits

✅ **Automatic Tracking**: No manual issue creation needed  
✅ **No Duplicates**: Smart detection of existing issues  
✅ **Rich Context**: All relevant information in one place  
✅ **Actionable**: Clear steps to investigate and resolve  
✅ **Linked**: Direct links to failed runs and commits  

## Permissions Required

The workflow requires:
- `issues: write` - To create and comment on issues
- `actions: read` - To read workflow run information
- `contents: read` - To checkout code

## Labels Used

- **ci-failure**: Identifies CI-related issues
- **bug**: Marks it as a bug
- **automated**: Indicates auto-generated content

## Customization

### Change Workflow Trigger
Edit line 4 to monitor different workflows:
```yaml
workflows: ["Your Workflow Name"]
```

### Modify Issue Content
Edit the `issue_body.md` section in the "Extract failure information" step.

### Add More Labels
Edit the labels array in the "Create or update issue" step:
```javascript
labels: ['ci-failure', 'bug', 'automated', 'your-label']
```

## Testing

To test this workflow:

1. Push code that will cause CI to fail
2. Wait for CI Pipeline to complete with failure
3. Check the Issues tab for a new issue
4. Push another failure to the same branch
5. Verify a comment is added instead of creating a new issue

## Workflow Dependencies

This workflow depends on:
- **CI Pipeline** workflow being named exactly "CI Pipeline"
- GitHub Actions being enabled
- Issue creation permissions in the repository

## Troubleshooting

### Issue Not Created

**Check**:
- Workflow run conclusion is "failure" (not "cancelled" or "skipped")
- Repository has issues enabled
- Workflow has proper permissions

### Duplicate Issues Created

**Check**:
- Label `ci-failure` is applied correctly
- Issue title matching logic in `check_existing` step

### Missing Information

**Check**:
- Workflow run event data is available
- All environment variables are properly set
