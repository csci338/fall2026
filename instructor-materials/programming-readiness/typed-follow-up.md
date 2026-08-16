# Programming Readiness Typed Follow-Up

## Instructor setup

This follow-up gathers R5/R6 evidence after an observed paper verification. It does not replace a Not Yet result on R1–R4.

1. Select one substantive method from the student's collected paper response.
2. Supply a minimal Java harness containing the exact method signature, imports, fixed instructor tests, and a place for additional student tests.
3. Give the student access to their collected response for transcription without releasing a reusable blank secure form.
4. Set an observed or otherwise controlled work period appropriate to documented accommodations.
5. Require the student to run the full provided test suite after each material revision.
6. Collect the completed code, run log, and explanation.

Devices are used only for the supplied harness and approved accessibility tools. Generative AI, chatbots, code-generation/completion tools, online search, and outside assistance are not allowed. Do not use AI detectors. Verify authorship through the relationship between the collected paper response, run evidence, and the student's explanation or brief observed follow-up.

## Student instructions

Your goal is to translate one of your collected paper solutions into the supplied harness and use test evidence to improve it. This work is evaluated **Satisfactory / Not Yet** for R5 and R6. There are no points or averaging.

1. Type your paper solution into the designated method. Preserve the paper approach initially; do not silently replace it.
2. Compile and run the instructor-provided tests.
3. Add at least two tests with expected results:
   - one representative case; and
   - one relevant boundary or edge case.
4. Log every correction, including small transcription or syntax fixes.
5. After each logic revision, rerun the complete test suite.
6. Submit the final source file and this completed record.
7. Be prepared to trace or explain your code briefly.

Do not delete, skip, weaken, or edit instructor tests. If the harness or a test appears incorrect, stop and ask the instructor.

## Submission template

**Student:** ____________________________________

**Date:** _______________________________________

**Source paper form / problem:** _________________________________

**Method signature:** ____________________________________________

### Initial transcription

Did the initial transcription compile? `Yes / No`

If no, copy the most useful compiler message:

> 

Initial provided-test result: _____________________________________

### Student-designed tests

| Test purpose | Input | Expected result | Actual result before final revision | Actual result after final revision |
| --- | --- | --- | --- | --- |
| Representative case |  |  |  |  |
| Boundary/edge case |  |  |  |  |
| Optional additional case |  |  |  |  |

### Correction log

Do not erase earlier entries. Classify each as `transcription`, `syntax`, `logic`, or `test`.

| Run | Observed evidence/message | Correction made | Classification | Full suite result |
| --- | --- | --- | --- | --- |
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |
| 4 |  |  |  |  |

### Revision explanation

Choose one meaningful revision. Name the failing test or observed behavior, state what you changed, and explain why the revised code now meets the requirement.

____________________________________________________________________

____________________________________________________________________

____________________________________________________________________

### Final check

- [ ] My final code compiles.
- [ ] I ran the complete instructor test suite after my last change.
- [ ] I did not remove or weaken tests.
- [ ] My log includes every correction I made.
- [ ] I can explain and trace my final method.

## Instructor evaluation

### R5 — Test and debug from evidence

`Satisfactory / Not Yet`

Evidence note: ____________________________________________________

R5 is Satisfactory only when test choices include expected outputs and meaningful coverage, and revisions are tied to observed evidence.

### R6 — Implement, run, and explain in the supplied harness

`Satisfactory / Not Yet`

Evidence note: ____________________________________________________

R6 is Satisfactory only when the final method compiles, all required tests pass without weakening, corrections are logged, and the student can explain a material revision. Bank each Satisfactory specification independently. Prescribe and reassess only specifications marked Not Yet.
