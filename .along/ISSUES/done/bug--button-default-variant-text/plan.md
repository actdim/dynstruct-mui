# Living Plan: button-default-variant-text

Title: Fix Button default variant to text and support onKeyDown in TextField

Execution Mode: Direct

Closeout only: the code landed earlier in e68b09f; no source changes in this session.

## Steps
- [x] Step 1: verify `src/Button.tsx` default `variant: 'text'`
- [x] Step 2: verify `src/TextField.tsx` `onKeyDown` prop, default and pass-through to `MuiTextField`
- [x] Step 3: add Requirements and Acceptance Criteria to the issue
- [x] Step 4: typecheck and `along test` green; wrap
