import React from 'react';
import SortingButton from 'shared-components/SortingButton/SortingButton';
import styles from './StandardHeaderDropdown.module.css';
import type { InterfaceStandardHeaderDropdownProps } from 'types/components/StandardHeader/interface';

/**
 * StandardHeaderDropdown
 *
 * A standardized wrapper around {@link SortingButton} that enforces consistent
 * dropdown button appearance (hover, focus, active states, spacing, icon
 * alignment, and accessibility attributes) across all screen headers.
 *
 * `SortingButton` already owns the dropdown logic and icon selection.  This
 * component does **not** rewrite any of that — it supplies pre-wired CSS-module
 * classes (`containerClassName` / `toggleClassName`) so every header gets the
 * same look without repetitive per-screen overrides.
 *
 * @example Sort dropdown
 * ```tsx
 * <StandardHeaderDropdown
 *   type="sort"
 *   dataTestIdPrefix="members-sort"
 *   sortingOptions={[
 *     { label: 'Latest', value: 'latest' },
 *     { label: 'Oldest', value: 'oldest' },
 *   ]}
 *   selectedOption={sortOrder}
 *   onSortChange={setSortOrder}
 *   buttonLabel="Sort by"
 *   ariaLabel="Sort members"
 * />
 * ```
 *
 * @example Filter dropdown
 * ```tsx
 * <StandardHeaderDropdown
 *   type="filter"
 *   dataTestIdPrefix="members-filter"
 *   sortingOptions={statusOptions}
 *   selectedOption={statusFilter}
 *   onSortChange={setStatusFilter}
 *   buttonLabel="Filter"
 *   ariaLabel="Filter members by status"
 * />
 * ```
 */
const StandardHeaderDropdown: React.FC<
  InterfaceStandardHeaderDropdownProps
> = ({
  wrapperClassName,
  containerClassName,
  toggleClassName,
  ...sortingButtonProps
}) => {
  const wrapperCls = wrapperClassName
    ? `${styles.wrapper} ${wrapperClassName}`
    : styles.wrapper;

  const containerCls = containerClassName
    ? `${styles.dropdownContainer} ${containerClassName}`
    : styles.dropdownContainer;

  const toggleCls = toggleClassName
    ? `${styles.toggleButton} ${toggleClassName}`
    : styles.toggleButton;

  return (
    <div className={wrapperCls} data-testid="standard-header-dropdown-wrapper">
      <SortingButton
        {...sortingButtonProps}
        containerClassName={containerCls}
        toggleClassName={toggleCls}
      />
    </div>
  );
};

export default StandardHeaderDropdown;
