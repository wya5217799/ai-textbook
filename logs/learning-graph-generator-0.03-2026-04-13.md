# Learning Graph Generator Session Log

- **Skill Version:** 0.03
- **Date:** 2026-04-13
- **Course:** H63AIS - Artificial Intelligence System
- **Institution:** University of Nottingham Ningbo China

## Python Program Versions Used

- analyze-graph.py: (bundled with skill v0.03)
- csv-to-json.py: v0.04
- taxonomy-distribution.py: (bundled with skill v0.03)

## Steps Completed

### Step 0: Setup

- Verified docs directory and mkdocs.yml exist
- Created docs/learning-graph directory (already existed from prior session)

### Step 1: Course Description Quality Assessment

- Previously completed in prior session
- Quality score: 57/100 (below 70 threshold)
- Decision: Proceed with learning graph generation using rich lecture materials as supplementary source

### Step 2: Generate Concept Labels

- Generated 200 concept labels from lecture materials, exam papers, and seminar code
- Saved to concept-list.md
- Concepts span all 5 module areas: Data & Exploration, ML Fundamentals, Supervised Learning, Unsupervised Learning, Reinforcement Learning
- Additional concepts derived from: backpropagation worked examples, CNN architecture calculations, evaluation metrics, gradient descent variants

### Step 3: Generate Dependency Graph

- Created learning-graph.csv with 200 concepts and prerequisite dependencies
- 6 foundational concepts with no prerequisites
- 194 concepts with 1+ dependencies
- Average dependencies per concept: 1.52

### Step 3b: Generate Relations CSV

- Created relations.csv with 41 typed relationships
- Types: contrasts_with (19), related_to (16), is_part_of (6)

### Step 4: Learning Graph Quality Validation

- Ran analyze-graph.py with --relations flag
- Results:
  - Valid DAG: Yes (no cycles)
  - No self-dependencies
  - No orphaned nodes
  - Single connected component
  - Maximum chain length: 14
  - Terminal nodes: 82 (41.0%)
  - Foundational concepts: 6

### Step 5: Create Concept Taxonomy

- Created 12 taxonomy categories:
  - FOUND: Foundation Concepts (13 concepts, 6.5%)
  - TOOL: Programming Tools (7 concepts, 3.5%)
  - DACQ: Data Acquisition (12 concepts, 6.0%)
  - DPRE: Data Preprocessing (19 concepts, 9.5%)
  - MATH: Linear Algebra and Math (9 concepts, 4.5%)
  - LREG: Linear Regression (13 concepts, 6.5%)
  - OPTM: Optimization (19 concepts, 9.5%)
  - EVAL: Model Evaluation (29 concepts, 14.5%)
  - CLSF: Classification (17 concepts, 8.5%)
  - CLST: Clustering (15 concepts, 7.5%)
  - NEUR: Neural Networks (24 concepts, 12.0%)
  - DEEP: Deep Learning Architectures (23 concepts, 11.5%)

### Step 5b: Create Taxonomy Names JSON

- Created taxonomy-names.json mapping TaxonomyIDs to human-readable names

### Step 6: Add Taxonomy to CSV

- Updated learning-graph.csv with TaxonomyID column
- All 200 concepts assigned to categories (no MISC needed)

### Step 7: Create Metadata JSON

- Created metadata.json with Dublin Core-inspired fields
- Title, description, creator, date, version, format, schema, license

### Step 8: Groups (handled by csv-to-json.py)

- Groups auto-generated with distinct pastel colors

### Step 9: Generate Complete Learning Graph JSON

- Ran csv-to-json.py v0.04 with metadata.json, taxonomy-names.json, and relations.csv
- Output: learning-graph.json with 200 nodes, 329 edges, 12 groups
- All 12 taxonomy groups have human-readable classifierName values

### Step 10: Taxonomy Distribution Report

- Ran taxonomy-distribution.py
- All categories within balance thresholds
- No category exceeds 30%
- Spread: 11.0% (excellent balance)

### Step 11: Create Index Page

- Created index.md customized for H63AIS course

### Step 12: Session Log

- This file

## Files Created

| File | Description |
|------|-------------|
| docs/learning-graph/concept-list.md | 200 numbered concepts |
| docs/learning-graph/learning-graph.csv | Dependency graph with taxonomy |
| docs/learning-graph/relations.csv | 41 typed relationships |
| docs/learning-graph/quality-metrics.md | Graph quality validation report |
| docs/learning-graph/concept-taxonomy.md | 12-category taxonomy definitions |
| docs/learning-graph/taxonomy-names.json | TaxonomyID to name mapping |
| docs/learning-graph/metadata.json | Learning graph metadata |
| docs/learning-graph/learning-graph.json | Complete vis-network JSON (200 nodes, 329 edges) |
| docs/learning-graph/taxonomy-distribution-report.md | Category distribution analysis |
| docs/learning-graph/index.md | Learning graph section introduction |
| logs/learning-graph-generator-0.03-2026-04-13.md | This session log |
