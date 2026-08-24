# TowerFlow Phase 3B CHS Compression Review Handoff

## 1. Purpose

`P3B-COMP-REVIEW-001` is the narrow independent-review package for the
verification-only cold-formed CHS compression slice. It binds the controlled
rule data, production implementation, deterministic cases, independent
arithmetic oracle and verification note by canonical SHA-256.

The public repository contains only a blank template. A completed record,
reviewer identity, controlled-source reference and external benchmark evidence
must be held in the approved private review system.

## 2. Gate Boundary

The package supports decisions for:

| Gate | Required conclusion |
| --- | --- |
| `CM3-07` | The bounded compression rule extraction, applicability controls, implementation trace and deterministic rejection tests agree with the authorised controlled source. |
| `CM3-08` | A genuinely independent hand calculation or trusted-software model reproduces all required benchmark cases within the accepted tolerance. |

Completion of this package does not approve project member data, effective
lengths, load combinations, connections, foundations or the web utilisation
mode. `releaseAuthority` remains `false` even for a structurally complete
review record.

## 3. Required Benchmark

The independent benchmark must cover `COMPRESSION-CHS-B01` to `B04`, including
short, intermediate, slender and unequal-local-axis effective-length cases.
For each case it must record:

- confirmation that section, material, effective lengths and manufacturing
  assumptions match TowerFlow;
- traceable intermediate results;
- TowerFlow and independent design compression capacities;
- absolute and relative differences; and
- the resulting tolerance decision.

The predeclared capacity tolerance is:

```text
absolute difference <= max(0.5 kN, 0.5% of the larger compared capacity)
```

The reviewer must explicitly accept the suitability of this tolerance and the
benchmark method. The existing Decimal oracle and Austube 2013 table regression
are implementation evidence only; they do not themselves satisfy `CM3-08`.

## 4. Benchmark Exchange

`P3B-COMP-BENCH-EXCHANGE-001` is the neutral B01-B04 transfer package. Its
request section fixes the source fixture hash, each case input hash, TowerFlow
result hash and overall request payload hash. Its public response section is
blank.

The external party works on a copy, observes the request hash, records its
method and signed evidence references, and supplies all four independent
capacities. The validator recomputes the differences and tolerance decisions.
After validation, the importer produces an `evidence_supplied` handoff fragment:

```powershell
py -3 analysis\validate_phase3b_compression_benchmark_exchange.py completed-exchange.json --require-response
py -3 analysis\import_phase3b_compression_benchmark_response.py completed-exchange.json --output evidence-fragment.json
```

Importing evidence is not acceptance. The independent reviewer must still
complete the six review decisions and sign the private handoff.

## 5. Fail-Closed Rules

The validator rejects:

- changed or missing local artifacts;
- paths outside the repository;
- a substituted publication or amendment identity;
- anonymous, unsigned or non-independent decisions;
- benchmark evidence without method/version identity and payload hash;
- missing B01-B04 comparisons or mismatched inputs;
- arithmetic differences incorrectly marked within tolerance;
- accepted gates while any review item or benchmark remains pending; and
- any claim of Phase 3B release authority.

## 6. Commands

```powershell
py -3 analysis\build_phase3b_compression_review_handoff.py --check
py -3 analysis\validate_phase3b_compression_review_handoff.py review\phase3b-compression-review-handoff.blank.json --require-blank
py -3 analysis\verify_phase3b_compression_review_handoff.py
py -3 analysis\build_phase3b_compression_benchmark_exchange.py --check
py -3 analysis\validate_phase3b_compression_benchmark_exchange.py review\phase3b-compression-benchmark-exchange.blank.json --require-blank
py -3 analysis\verify_phase3b_compression_benchmark_exchange.py
```

The blank public intake improves change control and reviewer efficiency. It is
not evidence that independent engineering review has occurred.
