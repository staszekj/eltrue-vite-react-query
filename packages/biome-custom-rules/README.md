# Biome Custom Rules

This package was created as an attempt to implement a custom rule for enforcing `useCallback` in React components. However, we discovered that custom rules are not yet supported in the current version of Biome (1.9.4).

## Future: Biome 2.0 Custom Rules

According to [Biome's 2025 Roadmap](https://biomejs.dev/blog/roadmap-2025/), custom rules support is coming in Biome 2.0:

> **Plugins**. A long-requested feature, we started the development of Biome plugins after an RFC process that started in January 2024. Biome 2.0 will feature the first fruits of this labor: Users will be able to create their own lint rules using GritQL.

### GritQL

GritQL is Biome's upcoming query language for creating custom lint rules. While full documentation is not yet available, it will be the official way to create custom rules in Biome 2.0.

Key points about the plugin system:
- Custom lint rules will be implemented using GritQL
- The feature is currently in development
- It will be part of the Biome 2.0 release
- More plugin types are planned after the initial release

### Our Use Case: useCallback Rule

Our intended rule would:
- Check for function props in React components (props starting with "on")
- Verify that these function props are wrapped in `useCallback`
- Report an error if `useCallback` is not used

Once Biome 2.0 is released with GritQL support, we can implement this rule properly.

### Current Alternatives

Until Biome 2.0 is released, you have several options:

1. **Use Biome's Built-in Rules**:
   - Use existing rules to partially address the performance concerns
   - Configure strict mode for React-related rules

2. **Switch to ESLint Temporarily**:
   - ESLint has established plugins for this use case
   - Can be used alongside Biome for formatting

3. **Wait for Biome 2.0**:
   - Continue using Biome without the custom rule
   - Update when GritQL becomes available

### Useful Links

- [Biome 2025 Roadmap](https://biomejs.dev/blog/roadmap-2025/)
- [Biome Official Documentation](https://biomejs.dev/)
- [Biome GitHub Repository](https://github.com/biomejs/biome)

### Future Updates

We will update this README when:
- Biome 2.0 is released
- GritQL documentation becomes available
- Examples of custom rules using GritQL are published

This package will serve as a placeholder for implementing our custom `useCallback` rule once Biome 2.0 is released. 