# /project:04_testing

## 🧪 Instructions

This command implements **comprehensive unit and integration tests** for the ConvictionFi smart contract in Move.

## 🎯 Requirements

- Use Move’s native test syntax, including `#[test]` and `#[test_only]` attributes
- Cover the full flow from `test_scenario::begin` to `test_scenario::end`
- Verify the entire workflow: deploy → mint → deposit → delegate → agent execution
- Include edge cases related to:

  - Gas limits
  - Replay protection
  - Access control

- All comments must be written in English

## 📦 Target Function Set

### 1. Test Setup Function

- `create_test_environment`

### 2. Main Workflow Test

- `test_complete_workflow`

### 3. Additional Test Suite (at minimum, include skeletons for the following)

- `test_security_edge_cases`
- `test_gas_optimization`
- `test_concurrent_access`
- `test_unauthorized_access` (`#[expected_failure]`)

## 🛠 Output Expectations for Claude

- Append all test code at the **bottom of the `conviction_fi.move` module**
- Explicitly include mint/share/transfer transaction flows for all objects
- Use `assert!` statements for validation and `tx_context::epoch_timestamp_ms` where relevant

---

Claude Code should treat this command as `/project:04_testing`, and output a **complete test suite** for the ConvictionFi Move smart contract accordingly.
