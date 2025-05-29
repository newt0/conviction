You are an expert in Sui Move (2024 edition).  
Please fix the following `conviction_fi.move` file based on the actual compiler errors.

---

### 🛠 Objective:

Make the entire module compile cleanly under Move 2024 edition using `sui move build`.

---

### 📄 Source file:

Apply all necessary changes to `sources/conviction_fi.move`.

---

### 🔴 Compilation Errors and Warnings:

```
[note] Dependencies on Bridge, MoveStdlib, Sui, and SuiSystem are automatically added, but this feature is disabled for your package because you have explicitly included dependencies on Sui. Consider removing these dependencies from Move.toml.
UPDATING GIT DEPENDENCY https://github.com/MystenLabs/sui.git
INCLUDING DEPENDENCY Sui
INCLUDING DEPENDENCY MoveStdlib
BUILDING ConvictionFi
warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:3:19
│
3 │ use std::option::{Self, Option};
│ ^^^^ Unnecessary alias 'option' for module 'std::option'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:3:25
│
3 │ use std::option::{Self, Option};
│ ^^^^^^ Unnecessary alias 'Option' for module member 'std::option::Option'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W09001]: unused alias
┌─ ./sources/conviction_fi.move:4:19
│
4 │ use std::string::{Self, String};
│ ^^^^ Unused 'use' of alias 'string'. Consider removing it
│
= This warning can be suppressed with '#[allow(unused_use)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:5:10
│
5 │ use std::vector;
│ ^^^^^^ Unnecessary alias 'vector' for module 'std::vector'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:9:19
│
9 │ use sui::object::{UID, ID, uid_from_inner};
│ ^^^ Unnecessary alias 'UID' for module member 'sui::object::UID'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:9:24
│
9 │ use sui::object::{UID, ID, uid_from_inner};
│ ^^ Unnecessary alias 'ID' for module member 'sui::object::ID'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

error[E03003]: unbound module member
┌─ ./sources/conviction_fi.move:9:28
│
9 │ use sui::object::{UID, ID, uid_from_inner};
│ ^^^^^^^^^^^^^^ Invalid 'use'. Unbound member 'uid_from_inner' in module 'sui::object'
│
┌─ /Users/air/.move/https**\_github_com_MystenLabs_sui_git_framework**mainnet/crates/sui-framework/packages/sui-framework/sources/object.move:5:13
│
5 │ module sui::object;
│ ------ Module 'sui::object' declared here

warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:12:10
│
12 │ use sui::transfer;
│ ^^^^^^^^ Unnecessary alias 'transfer' for module 'sui::transfer'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W02021]: duplicate alias
┌─ ./sources/conviction_fi.move:13:23
│
13 │ use sui::tx_context::{TxContext, sender, epoch_timestamp_ms};
│ ^^^^^^^^^ Unnecessary alias 'TxContext' for module member 'sui::tx_context::TxContext'. This alias is provided by default
│
= This warning can be suppressed with '#[allow(duplicate_alias)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W09011]: unused constant
┌─ ./sources/conviction_fi.move:16:7
│
16 │ const E_INVALID_STRATEGY: u64 = 0x001;
│ ^^^^^^^^^^^^^^^^^^ The constant 'E_INVALID_STRATEGY' is never used. Consider removing it.
│
= This warning can be suppressed with '#[allow(unused_const)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

warning[W09011]: unused constant
┌─ ./sources/conviction_fi.move:26:7
│
26 │ const E_DELEGATION_NOT_FOUND: u64 = 0x00B;
│ ^^^^^^^^^^^^^^^^^^^^^^ The constant 'E_DELEGATION_NOT_FOUND' is never used. Consider removing it.
│
= This warning can be suppressed with '#[allow(unused_const)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:51:1
│
51 │ struct ConvictionNFT has key, store {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:63:1
│
63 │ struct ManagedWallet has key {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:78:1
│
78 │ struct AgentDelegation has key, store {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:93:1
│
93 │ struct Strategy has copy, store {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:110:1
│
110 │ struct StrategyRegistry has key {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:121:1
│
121 │ struct AdminCap has key, store {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:130:1
│
130 │ struct GlobalConfig has key {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

warning[W09002]: unused variable
┌─ ./sources/conviction_fi.move:429:5
│
429 │ ctx: &mut TxContext,
│ ^^^ Unused parameter 'ctx'. Consider removing or prefixing with an underscore: '\_ctx'
│
= This warning can be suppressed with '#[allow(unused_variable)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:510:1
│
510 │ struct NFTMinted has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:520:1
│
520 │ struct DepositMade has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:531:1
│
531 │ struct WithdrawalMade has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:542:1
│
542 │ struct EmergencyWithdrawal has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:553:1
│
553 │ struct AgentDelegated has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:567:1
│
567 │ struct AgentActionExecuted has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:578:1
│
578 │ struct DelegationRevoked has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:588:1
│
588 │ struct StrategyAdded has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

error[E01003]: invalid modifier
┌─ ./sources/conviction_fi.move:599:1
│
599 │ struct SystemPauseToggled has copy, drop {
│ ^^^^^^ Invalid struct declaration. Internal struct declarations are not yet supported
│
= Visibility annotations are required on struct declarations from the Move 2024 edition onwards.

warning[W09002]: unused variable
┌─ ./sources/conviction_fi.move:878:5
│
878 │ ctx: &TxContext,
│ ^^^ Unused parameter 'ctx'. Consider removing or prefixing with an underscore: '\_ctx'
│
= This warning can be suppressed with '#[allow(unused_variable)]' applied to the 'module' or module member ('const', 'fun', or 'struct')

Failed to build Move modules: Compilation error.
```

---

Please regenerate the entire corrected `conviction_fi.move` module.
