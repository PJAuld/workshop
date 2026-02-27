# Experiments

This directory contains **throwaway experiments, spikes, and learning exercises**.

## Purpose

Experiments are for:
- **Learning**: Try new patterns, libraries, or approaches
- **Prototyping**: Quick proof-of-concepts before committing to implementation
- **Exploration**: Test ideas without the pressure of production quality
- **Validation**: Verify assumptions or test hypotheses

## ⚠️ Important

**Experiments are not production code!**

- No quality standards required
- No tests needed
- Can be messy, hacky, or incomplete
- Should be documented with learnings, not polished
- Can be deleted at any time

## Structure

Each experiment is its own folder with minimal structure:

```
experiments/
├── 2026-02-spike-graphql/
│   ├── README.md        # What you learned
│   └── index.js         # Throwaway code
├── test-hexagonal/
│   ├── notes.md
│   └── example.js
└── my-experiment/
    └── ...
```

## Naming Conventions

Use descriptive names that indicate:
- **Date**: When was this created? (optional)
- **Topic**: What are you experimenting with?
- **Type**: Is it a spike, test, or exploration?

**Examples**:
- `2026-02-spike-graphql`
- `test-event-sourcing`
- `explore-bun-performance`
- `prototype-realtime-sync`

## Creating an Experiment

### Quick Start

```bash
# Create folder
mkdir experiments/my-experiment

# Add a README to capture learnings
cat > experiments/my-experiment/README.md << 'EOF'
# My Experiment

## Goal
What am I trying to learn or validate?

## Approach
How am I going about it?

## Learnings
What did I discover?

## Conclusion
Should we adopt this? What's next?
EOF

# Start experimenting!
touch experiments/my-experiment/index.js
```

### With Dependencies

If your experiment needs workspace packages:

```bash
# Create package.json
cat > experiments/my-experiment/package.json << 'EOF'
{
  "name": "experiment-my-experiment",
  "private": true,
  "type": "module",
  "dependencies": {
    "@workshop/core": "workspace:*",
    "@workshop/adapters": "workspace:*"
  }
}
EOF

# Install dependencies
pnpm install
```

## Best Practices

1. **Document learnings**: Add a README with what you discovered
2. **Date your experiments**: Helps identify stale/old experiments
3. **Keep it isolated**: Don't affect other packages or apps
4. **Clean up eventually**: Delete experiments once learnings are extracted
5. **Share insights**: If you learned something valuable, share it with the team

## Example Experiments

### Exploring a New Library

```
experiments/2026-02-test-zod/
├── README.md           # What is Zod? Should we use it?
├── package.json        # Local dependencies
└── validation.js       # Test code
```

### Prototyping a Feature

```
experiments/prototype-caching/
├── README.md           # Design thoughts
├── cache-adapter.js    # Prototype adapter
└── test.js             # Quick tests
```

### Learning a Pattern

```
experiments/explore-railway-pattern/
├── notes.md            # Pattern explanation
└── examples.js         # Code examples
```

## Graduation Path

If an experiment proves valuable:

1. **Extract the pattern**: Identify what worked
2. **Implement properly**: Move to core/adapters/apps with tests
3. **Delete the experiment**: Or keep it as historical reference
4. **Update docs**: Share the learning in READMEs

## When to Use Experiments vs Apps

| Use Experiments | Use Apps |
|----------------|----------|
| Learning new patterns | Production code |
| Quick prototypes | Fully featured applications |
| Testing hypotheses | Maintained over time |
| Throwaway code | Tested and documented |
| No quality standards | Follows best practices |

## Tips

- **Time-box experiments**: Set a limit (1 hour, 1 day) and evaluate
- **Capture learnings early**: Write notes as you go, not at the end
- **Don't over-engineer**: It's okay to be messy
- **Ask for feedback**: Share your experiment README for input
- **Delete liberally**: Don't let old experiments clutter the repo

## License

MIT
