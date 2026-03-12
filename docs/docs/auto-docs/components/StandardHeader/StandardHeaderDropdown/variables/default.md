[Admin Docs](/)

***

# Variable: default

> `const` **default**: `React.FC`\<[`InterfaceStandardHeaderDropdownProps`](../../../../types/components/StandardHeader/interface/interfaces/InterfaceStandardHeaderDropdownProps.md)\>

Defined in: [src/components/StandardHeader/StandardHeaderDropdown.tsx:47](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/components/StandardHeader/StandardHeaderDropdown.tsx#L47)

StandardHeaderDropdown

A standardized wrapper around [SortingButton](../../../../shared-components/SortingButton/SortingButton/variables/default.md) that enforces consistent
dropdown button appearance (hover, focus, active states, spacing, icon
alignment, and accessibility attributes) across all screen headers.

`SortingButton` already owns the dropdown logic and icon selection.  This
component does **not** rewrite any of that — it supplies pre-wired CSS-module
classes (`containerClassName` / `toggleClassName`) so every header gets the
same look without repetitive per-screen overrides.

## Examples

```tsx
<StandardHeaderDropdown
  type="sort"
  dataTestIdPrefix="members-sort"
  sortingOptions={[
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
  ]}
  selectedOption={sortOrder}
  onSortChange={setSortOrder}
  buttonLabel="Sort by"
  ariaLabel="Sort members"
/>
```

```tsx
<StandardHeaderDropdown
  type="filter"
  dataTestIdPrefix="members-filter"
  sortingOptions={statusOptions}
  selectedOption={statusFilter}
  onSortChange={setStatusFilter}
  buttonLabel="Filter"
  ariaLabel="Filter members by status"
/>
```
