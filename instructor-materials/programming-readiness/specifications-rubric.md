# Programming Readiness Specifications Rubric

Evaluate each specification independently and record only **Satisfactory** or **Not Yet**. There are no points, percentages, partial-credit totals, or averages. Bank each Satisfactory specification. The required **Programming Readiness Bundle** is complete only when all six specifications, R1–R6, are Satisfactory.

## Essential checklist

A response can be Satisfactory only when all essential criteria for that specification are present:

- it answers the stated problem rather than a different or narrower problem;
- the logic works for the required representative and boundary cases;
- variables and collection operations have valid, consistent meanings;
- the response communicates executable Java or an unambiguous trace when Java is not requested; and
- the student can explain the result when a brief observed follow-up is needed.

Minor syntax slips may be tolerated only as described below. A missing essential idea is Not Yet.

## R1 — Trace code accurately

**Satisfactory:** The student follows assignment, control flow, and collection state; records the required intermediate/final values in order; and correctly identifies the output or return value.

**Essential criteria**

- Executes branches and loop iterations in the actual order.
- Updates each relevant variable or collection after every change.
- Uses the given inputs and loop bounds, including skipped or final iterations.
- Reports the requested final value/output.

**Satisfactory example description:** A trace table shows all four iterations, correctly skips the false branch on iteration three, and ends with the right accumulator and output.

**Not Yet example description:** The final number happens to be right, but the table applies the branch on every iteration and does not represent the program's execution.

## R2 — Construct conditionals and loops

**Satisfactory:** The student writes a terminating conditional/loop solution whose conditions, updates, and boundaries implement the requested behavior for normal and boundary inputs.

**Essential criteria**

- Boolean conditions match the stated categories or stopping rule.
- Branches are mutually appropriate and cover required cases.
- Loop initialization, condition, and update are coherent and terminating.
- Boundary values are handled correctly; no systematic off-by-one error.

**Satisfactory example description:** An `if/else if/else` classifies both endpoints correctly, and a loop includes the requested upper bound exactly once.

**Not Yet example description:** The loop never changes its control variable, or the branch order makes a required category unreachable.

## R3 — Traverse and process a list

**Satisfactory:** The student traverses the required elements of a `List`, applies the requested selection/transformation, and returns or prints the correct result without invalid indexing or unintended mutation.

**Essential criteria**

- Visits every required element exactly as the task requires.
- Uses values versus indices correctly.
- Initializes and updates the accumulator/result correctly.
- Handles an empty list and relevant one-element cases when they are within scope.

**Satisfactory example description:** An enhanced `for` loop counts every matching value and returns zero for an empty list.

**Not Yet example description:** The loop starts at index one and therefore silently omits the first element, or returns inside the first iteration.

## R4 — Use a map or set for a simple algorithm

**Satisfactory:** The student selects and uses a `Map` or `Set` to track membership, uniqueness, counts, or key/value relationships and produces the requested result.

**Essential criteria**

- Chooses a collection whose semantics fit the problem.
- Initializes the collection and updates it for each relevant input.
- Uses `contains`, `containsKey`, `get`, `getOrDefault`, `add`, or `put` coherently.
- Handles repeated and absent values as required.

**Satisfactory example description:** A map count is updated with `getOrDefault`, then queried for the requested count; duplicates increase the count.

**Not Yet example description:** A set is used where frequencies are required, so duplicate information is discarded, or map updates overwrite every count with `1`.

## R5 — Test and debug from evidence

**Satisfactory:** The student predicts or states expected behavior, chooses tests that exercise meaningful cases, identifies a concrete defect from code/test evidence, and gives a correction that addresses the defect without breaking required behavior.

**Essential criteria**

- Gives expected outputs, not only inputs.
- Includes at least one representative case and one relevant boundary/edge case.
- Identifies the faulty statement, condition, or assumption.
- Proposes a correction tied to a failing case and explains why it works.

**Satisfactory example description:** The student notices that `i <= list.size()` indexes one past the list, changes it to `<`, and supplies empty and one-element tests with expected results.

**Not Yet example description:** “The loop is wrong” is offered without locating the defect, expected outputs, or a correction.

## R6 — Implement, run, and explain in the supplied harness

**Satisfactory:** The student independently translates one collected paper solution into the supplied Java harness, compiles and runs the tests, records corrections honestly, and explains one evidence-based revision.

**Essential criteria**

- The final code compiles in the supplied harness.
- Required provided tests pass, with no test deletion or weakening.
- The correction log distinguishes transcription/syntax fixes from logic revisions.
- The explanation names the observed failure, the revision, and why the revision resolves it.
- Authorship is supported by the student's observed paper work and explanation.

**Satisfactory example description:** The student records a failing empty-input test, revises an initialization, reruns the complete suite successfully, and explains the state change.

**Not Yet example description:** Passing output is submitted without a run record or explanation, tests were removed, or the student cannot explain a material revision.

## Minor syntax slips versus logical errors

A paper response may still be Satisfactory with a **minor syntax slip** when all of the following are true:

- the intended Java construct and logic are unambiguous;
- the slip is local and mechanical (for example, one missing semicolon, a capitalization slip in an otherwise consistent type name, or one omitted parenthesis);
- correcting it requires no choice among algorithms, conditions, variables, or collection operations; and
- no essential criterion depends on treating the code as something other than what was written.

Mark **Not Yet** when a correction requires a logical decision or changes behavior: wrong comparison/operator, incorrect loop bound, missing update, unreachable/missing branch, return in the wrong place, wrong accumulator initialization, misuse of key/value or set semantics, failure on a required edge case, or multiple syntax problems that make intent ambiguous.

When uncertain, ask the student one neutral observed question such as “Trace this on the empty case” or “What value does this condition permit?” Do not coach. Score the demonstrated understanding against the essential criteria.

## Bundle and reassessment rule

- A Satisfactory result remains banked.
- A student reassesses only Not Yet specifications.
- A reassessment must provide fresh, equivalent evidence for each attempted specification.
- Do not average attempts or replace a required specification with stronger work elsewhere.
- Mark the Programming Readiness Bundle complete only when R1, R2, R3, R4, R5, and R6 are all Satisfactory.
